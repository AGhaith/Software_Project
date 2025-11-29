using LocalBrandFinder.Domain.Models;
using LocalBrandFinder.Infrastructure.Persistence;
using LocalBrandFinder.Application.Interfaces;

namespace LocalBrandFinder.Infrastructure.Repositories;

public class BrandRepository : BaseRepository<Brand>, IBrandRepository
{
    public BrandRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }
}