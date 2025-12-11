namespace LocalBrandFinder.Application.Interfaces;

public interface IUnitOfWork : IDisposable
{
    ICustomerRepository Customers { get; }
    IBrandRepository Brands { get; }
    ICategoryRepository Categories { get; }
    IProductRepository Products { get; }

    Task<bool> SaveChangesAsync();
    Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default);
}