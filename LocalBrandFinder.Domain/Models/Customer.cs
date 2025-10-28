using LocalBrandFinder.Domain.Models.Common;

namespace LocalBrandFinder.Domain.Models;

public class Customer : AuditableEntity
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public string PhoneNumber { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
}