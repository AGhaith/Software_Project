using Microsoft.AspNetCore.Identity;

namespace LocalBrandFinder.Application.Utilities;

public class PasswordUtility
{
    private readonly IPasswordHasher<object> _hasher;

    public PasswordUtility(IPasswordHasher<object> hasher)
    {
        _hasher = hasher;
    }

    public string HashPassword(string password)
    {
        return _hasher.HashPassword(null, password);
    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        var result = _hasher.VerifyHashedPassword(null, hashedPassword, password);
        return result == PasswordVerificationResult.Success;
    }
}
