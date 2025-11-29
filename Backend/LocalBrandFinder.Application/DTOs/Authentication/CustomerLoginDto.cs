using System.ComponentModel.DataAnnotations;

namespace LocalBrandFinder.Application.DTOs.Authentication;

public class CustomerLoginDto
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(6)]
    public required string Password { get; set; }
}