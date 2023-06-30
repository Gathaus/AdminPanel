using Web.Infrastructure.EfCore.Repositories.Abstract;
using Web.Models;

namespace Web.Infrastructure.EfCore.Repositories.Concrete;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private readonly Dictionary<Type, object> _repositories;
    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
        _repositories = new Dictionary<Type, object>();

    }

    public IRepository<TEntity> Repository<TEntity>() where TEntity : class, IEntity
    {
        if (_repositories.ContainsKey(typeof(TEntity)))
            return (IRepository<TEntity>)_repositories[typeof(TEntity)];

        var repository = new GenericRepository<TEntity>(_context);
        _repositories[typeof(TEntity)] = repository;
        return repository;
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
    public int SaveChanges()
    {
        return _context.SaveChanges();
    }

    public async ValueTask DisposeAsync()
    {
        await _context.DisposeAsync();
    }
}