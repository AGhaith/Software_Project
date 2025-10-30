using LocalBrandFinder.Domain.Models.Common;

namespace LocalBrandFinder.Domain.Models
{
    public class Category : BaseEntity
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}
