using System.Linq.Expressions;
using LocalBrandFinder.Application.Interfaces.Common;
using LocalBrandFinder.Domain.Models.Common;
using LocalBrandFinder.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LocalBrandFinder.Infrastructure.Repositories;

public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
{
    protected readonly ApplicationDbContext _dbContext;

    protected readonly DbSet<T> _dbSet;
    public BaseRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = _dbContext.Set<T>();
    }

    public async Task<IList<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<IList<T>> GetAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }

    public async Task<IList<T>> GetAsync(Expression<Func<T, bool>>? predicate = null,
                                                Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
                                                string? includeString = null,
                                                bool disableTracking = true)
    {
        IQueryable<T> query = _dbSet;

        if (disableTracking)
            query = query.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(includeString))
            query = query.Include(includeString);

        if (predicate != null)
            query = query.Where(predicate);

        if (orderBy != null)
            return await orderBy(query).ToListAsync();

        return await query.ToListAsync();
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<bool> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        return entity != null;
    }

    public Task UpdateAsync(T entity)
    {
        _dbContext.Entry(entity).State = EntityState.Modified;
        return Task.CompletedTask;
    }

    public Task DeleteAsync(T entity)
    {
        _dbSet.Remove(entity);
        return Task.CompletedTask;
    }

    public async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.AnyAsync(predicate);
    }

    public async Task<T?> GetSingleAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.FirstOrDefaultAsync(predicate);
    }
}