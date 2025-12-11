using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Json;
namespace LocalBrandFinder.Application;
public class ImgBBService
{
    private readonly string _apiKey;
    private readonly HttpClient _httpClient;

    public ImgBBService(IConfiguration config)
    {
        _apiKey = config["ImgBB:ApiKey"];
        _httpClient = new HttpClient();
    }

    public async Task<string> UploadAsync(IFormFile file)
    {
        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);
        var bytes = ms.ToArray();
        var base64 = Convert.ToBase64String(bytes);

        using var form = new MultipartFormDataContent();
        form.Add(new StringContent(base64), "image");

        var url = $"https://api.imgbb.com/1/upload?key={_apiKey}";

        var response = await _httpClient.PostAsync(url, form);
        var json = await response.Content.ReadFromJsonAsync<ImgBBResponse>();

        return json?.Data?.Url ?? throw new Exception("Failed to upload image");
    }
}

public class ImgBBResponse
{
    public ImgBBData Data { get; set; }
}

public class ImgBBData
{
    public string Url { get; set; }
}
