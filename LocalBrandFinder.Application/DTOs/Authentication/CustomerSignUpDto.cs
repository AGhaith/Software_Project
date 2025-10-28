using System.ComponentModel.DataAnnotations;

namespace LocalBrandFinder.Application.DTOs.Authentication;

public class CustomerSignUpDto
{
    [Required]
    [MinLength(2)]
    public required string Name { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(6)]
    public required string Password { get; set; }

    [Required]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public required string ConfirmPassword { get; set; }

    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
}