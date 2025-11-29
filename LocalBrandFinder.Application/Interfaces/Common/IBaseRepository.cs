using System.Linq.Expressions;
using LocalBrandFinder.Domain.Models.Common;

namespace LocalBrandFinder.Application.Interfaces.Common;

public interface IBaseRepository<T> where T : BaseEntity
{
    Task<IList<T>> GetAllAsync();

    Task<T?> GetSingleAsync(Expression<Func<T, bool>> predicate);
    Task<IList<T>> GetAsync(Expression<Func<T, bool>> predicate);
    Task<IList<T>> GetAsync(Expression<Func<T, bool>>? predicate = null,
                                   Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
                                   string? includeString = null,
                                   bool disableTracking = true);
    Task<T?> GetByIdAsync(Guid id);
    Task<bool> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
}