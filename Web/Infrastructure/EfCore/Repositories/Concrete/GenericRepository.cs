using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Web.Infrastructure.EfCore.Repositories.Abstract;
using Web.Utils.Extensions;
using IEntity = Web.Infrastructure.EfCore.Repositories.Abstract.IEntity;

namespace Web.Infrastructure.EfCore.Repositories.Concrete;

public class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : class,IEntity
{
        protected readonly DbContext _context;
        private readonly DbSet<TEntity> _entitySet;

        public GenericRepository(DbContext context)
        {
            _context = context;

            _entitySet = _context.Set<TEntity>();
        }

        public async Task AddRangeAsync(IEnumerable<TEntity> entities)
        {
            await _entitySet.AddRangeAsync(entities);
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            await _entitySet.AddAsync(entity);
            return entity;
        }

        public TEntity Add(TEntity entity)
        {
            _entitySet.Add(entity);
            return entity;
        }

        public void Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }

        public async Task<TEntity> GetByIdAsync(int? id, params string[] includeParams)
        {
            return await _baseQuery(includeParams).FirstOrDefaultAsync(q => q.Id == id) ?? throw new InvalidOperationException();
        }

        public async Task<TEntity> GetAsync(params string[] includeParams)
        {
            return await _baseQuery(includeParams).FirstOrDefaultAsync() ?? throw new InvalidOperationException();
        }

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> expression, params string[] includeParams)
        {
            return await _baseQuery(includeParams).FirstOrDefaultAsync(expression) ?? throw new InvalidOperationException();
        }

        public IQueryable<TEntity> FindBy(params string[] includeParams)
        {
            return _baseQuery(includeParams);
        }

        public IQueryable<TEntity> Query()
        {
            return _entitySet;
        }

        public IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> expression, params string[] includeParams)
        {
            return _baseQuery(includeParams).Where(expression);
        }

        private IQueryable<TEntity> _baseQuery(params string[] includeParams)
        {
            return _entitySet.IncludeAll(includeParams);
        }

        public bool Delete(TEntity entity)
        {
            if (entity is null)
                return false;
            entity.IsDeleted = true;
            Update(entity);
            return true;
        }
    public bool HardDelete(TEntity entity)
    {
        if (entity is null)
            return false;
        _context.Entry(entity).State = EntityState.Deleted;
        return true;
    }
}