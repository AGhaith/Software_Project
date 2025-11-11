using System.ComponentModel.DataAnnotations;

namespace LocalBrandFinder.Application.DTOs.Authentication;

public class CustomerSignUpDto
{
    public required string Name { get; set; }
   public required string Email { get; set; }
    public required string Password { get; set; }
    public required string ConfirmPassword { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
}