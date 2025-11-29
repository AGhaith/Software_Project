namespace LocalBrandFinder.Application.DTOs.Authentication;

public class LoginResponseDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Role { get; set; }
    public string? Message { get; set; }
}