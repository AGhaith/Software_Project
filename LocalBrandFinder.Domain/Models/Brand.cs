using LocalBrandFinder.Domain.Models.Common;

namespace LocalBrandFinder.Domain.Models;

public class Brand : AuditableEntity
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }

    public string Category { get; set; } = string.Empty;

    public string Tags { get; set; } = string.Empty;

    public string WebsiteUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
}