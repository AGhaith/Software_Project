using LocalBrandFinder.Domain.Models.Common;

namespace LocalBrandFinder.Domain.Models;

public class Brand : BaseUser
{
    public ICollection<Category> Categories { get; set; } = new List<Category>();
    public string Tags { get; set; } = string.Empty;

    public string WebsiteUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
}