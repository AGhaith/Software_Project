using LocalBrandFinder.Domain.Models;
using LocalBrandFinder.Infrastructure.Persistence;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Domain.Models.Common;

namespace LocalBrandFinder.Infrastructure.Repositories;

public class ProductRepository : BaseRepository<Product>, IProductRepository
{
    public ProductRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }
}