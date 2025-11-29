using LocalBrandFinder.Domain.Models.Common;

namespace LocalBrandFinder.Domain.Models;

public class Customer : BaseUser
{
    public string PhoneNumber { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
}