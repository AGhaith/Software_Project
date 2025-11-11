using LocalBrandFinder.Domain.Models;
using LocalBrandFinder.Infrastructure.Persistence;
using LocalBrandFinder.Application.Interfaces;

namespace LocalBrandFinder.Infrastructure.Repositories;

public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }
}