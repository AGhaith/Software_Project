using System.ComponentModel.DataAnnotations;

namespace LocalBrandFinder.Application.DTOs.Authentication;

public class LoginRequestDto
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Password { get; set; }
}