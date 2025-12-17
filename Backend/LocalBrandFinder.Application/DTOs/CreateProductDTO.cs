using Microsoft.AspNetCore.Http;

namespace LocalBrandFinder.Application;

public class CreateProductDTO
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Price { get; set; }
    public required string Type { get; set; }
    public List<string>? AvailableSizes { get; set; }
    public required int AvailableStock { get; set; }
    public List<IFormFile>? Images { get; set; }
}
