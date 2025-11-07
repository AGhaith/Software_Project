using LocalBrandFinder.Domain.Models;
using LocalBrandFinder.Domain.Models.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace LocalBrandFinder.Application.Utilities
{
    public class AuthUtility(IConfiguration configuration)
    {
        public string CreateToken(BaseUser user)
        {

            string role = (user is Customer) ? "Customer" : "Brand";
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Name),
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, role)
            };

            var secret = configuration["AppSettings:Token"]
    ?? throw new InvalidOperationException("JWT secret key not found in configuration.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration["AppSettings:Issuer"],
                audience: configuration["AppSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: cred
            );
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
