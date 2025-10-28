using LocalBrandFinder.Application.DependencyInjection;
using LocalBrandFinder.Infrastructure.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace LocalBrandFinder.API.DependencyInjection;

public static class ApiServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Add services from other layers
        services.AddApplicationServices();
        services.AddInfrastructureServices(configuration);

        // Add controllers
        services.AddControllers();
        services.AddEndpointsApiExplorer();

        // Configure Swagger without authentication
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "LocalBrandFinder API",
                Version = "v1",
                Description = "API for Local Brand Finder application"
            });
        });

        return services;
    }
}
