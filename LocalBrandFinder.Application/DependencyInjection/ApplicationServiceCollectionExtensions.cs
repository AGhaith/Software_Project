using LocalBrandFinder.Application.Utilities;
using LocalBrandFinder.Domain.Models.Common;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace LocalBrandFinder.Application.DependencyInjection;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddSingleton<IPasswordHasher<object>, PasswordHasher<object>>();
        services.AddSingleton<PasswordUtility>();
        services.AddSingleton<AuthUtility>();


        return services;
    }
}