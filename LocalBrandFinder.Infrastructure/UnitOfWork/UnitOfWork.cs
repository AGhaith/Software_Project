using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Infrastructure.Persistence;
using LocalBrandFinder.Infrastructure.Repositories;

namespace LocalBrandFinder.Infrastructure.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private ICustomerRepository? _customerRepository;
    private IBrandRepository? _brandRepository;
    private bool _disposed;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public ICustomerRepository Customers =>
        _customerRepository ??= new CustomerRepository(_context);

    public IBrandRepository Brands =>
        _brandRepository ??= new BrandRepository(_context);

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default)
    {
        // Dispatch Domain Events here if you have them

        // Save changes
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed && disposing)
        {
            _context.Dispose();
        }
        _disposed = true;
    }
}