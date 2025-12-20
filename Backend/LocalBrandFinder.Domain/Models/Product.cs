namespace LocalBrandFinder.Domain.Models.Common;

public class Product : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Price { get; set; }
    public required string Type { get; set; }
    public List<string>? AvailableSizes { get; set; }
    public required int AvailableStock { get; set; }
    public Guid BrandId { get; set; }   // foreign key
    public List<String>? Images { get; set; }

}
