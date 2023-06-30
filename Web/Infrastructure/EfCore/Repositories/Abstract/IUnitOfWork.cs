namespace Web.Infrastructure.EfCore.Repositories.Abstract;

public interface IUnitOfWork : IAsyncDisposable
{
    IRepository<TEntity> Repository<TEntity>() where TEntity : class, IEntity;
    Task<int> SaveChangesAsync();
    int SaveChanges();
}