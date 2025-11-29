using System.ComponentModel.DataAnnotations;

namespace LocalBrandFinder.Application.DTOs.Authentication;

public class BrandSignUpDto
{
    public required string Name { get; set; }
    public required string Email { get; set; }
   public required string Password { get; set; }
    public required string ConfirmPassword { get; set; }

    public string? Category { get; set; }
    public string? Tags { get; set; }
    public string? WebsiteUrl { get; set; }
    public string? Description { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public string? LogoUrl { get; set; }
}