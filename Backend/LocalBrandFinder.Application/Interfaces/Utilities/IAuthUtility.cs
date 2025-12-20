

using LocalBrandFinder.Domain.Models.Common;

namespace LocalBrandFinder.Application.Interfaces.Utilities;

public interface IAuthUtility
{
    public string CreateToken(BaseUser user);
}
