using System.Linq.Expressions;

namespace Web.Infrastructure.EfCore.Repositories.Abstract;

public interface IRepository<TEntity> where TEntity : IEntity
{
    Task AddRangeAsync(IEnumerable<TEntity> entities);

    Task<TEntity> AddAsync(TEntity entity);

    TEntity Add(TEntity entity);

    void Update(TEntity entity);

    Task<TEntity> GetByIdAsync(int? id, params string[] includeParams);

    Task<TEntity> GetAsync(params string[] includeParams);

    Task<TEntity> GetAsync(
        Expression<Func<TEntity, bool>> expression,
        params string[] includeParams);

    IQueryable<TEntity> FindBy(params string[] includeParams);
    IQueryable<TEntity> Query();
    IQueryable<TEntity> FindBy(
        Expression<Func<TEntity, bool>> expression,
        params string[] includeParams);

    bool Delete(TEntity entity);

    bool HardDelete(TEntity entity);
}