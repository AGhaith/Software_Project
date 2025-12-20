namespace LocalBrandFinder.Application.Interfaces.Utilities;
public interface IPasswordUtility
{
    string HashPassword(string password);
    bool VerifyPassword(string password, string hash);
}