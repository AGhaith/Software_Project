using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Domain.Models;
using LocalBrandFinder.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
 
namespace LocalBrandFinder.Infrastructure.Repositories;

public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
{
    public CustomerRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<Customer?> GetByEmailAsync(string email)
    {
        return await _dbContext.Customers
            .FirstOrDefaultAsync(c => c.Email.ToLower() == email.ToLower());
    }

    public async Task<IReadOnlyList<Customer>> GetCustomersByNameAsync(string name)
    {
        return await _dbContext.Customers
            .Where(c => c.Name.ToLower().Contains(name.ToLower()))
            .ToListAsync();
    }
}