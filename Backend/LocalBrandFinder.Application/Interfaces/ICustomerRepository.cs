using LocalBrandFinder.Application.Interfaces.Common;
using LocalBrandFinder.Domain.Models;

namespace LocalBrandFinder.Application.Interfaces;

public interface ICustomerRepository : IBaseRepository<Customer>
{
    Task<Customer?> GetByEmailAsync(string email);
    Task<IReadOnlyList<Customer>> GetCustomersByNameAsync(string name);
}