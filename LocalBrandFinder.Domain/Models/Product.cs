using LocalBrandFinder.Domain.Models.Common;


namespace LocalBrandFinder.Domain.Models
{
    public class Product : AuditableEntity
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required decimal Price { get; set; }
        public required Guid BrandId { get; set; }
        public required int StockQuanity { get; set; }
        public required string FinishTime { get; set; }
        public required double Rating { get; set; }
        public required bool Is_Active { get; set; }
    }
}
