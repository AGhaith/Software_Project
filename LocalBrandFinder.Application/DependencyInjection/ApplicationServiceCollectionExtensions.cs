using Microsoft.Extensions.DependencyInjection;

namespace LocalBrandFinder.Application.DependencyInjection;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Add application services
        // services.AddScoped<ICustomerService, CustomerService>();
        // Add AutoMapper
        // services.AddAutoMapper(Assembly.GetExecutingAssembly());
        // Add MediatR
        // services.AddMediatR(Assembly.GetExecutingAssembly());

        return services;
    }
}