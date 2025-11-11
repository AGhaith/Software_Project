using FluentValidation;
using LocalBrandFinder.Application.Utilities;
using LocalBrandFinder.Application.Validators;
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
        services.AddValidatorsFromAssemblyContaining<CustomerSignUpDtoValidator>();

        return services;
    }
}