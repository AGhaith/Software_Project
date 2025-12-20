using Microsoft.AspNetCore.Http;

namespace LocalBrandFinder.Application.Interfaces.Utilities;

public interface IImgBBService
{
    Task<string> UploadAsync(IFormFile file);
}
