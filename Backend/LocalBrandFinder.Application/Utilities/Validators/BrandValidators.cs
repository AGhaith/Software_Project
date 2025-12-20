using FluentValidation;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Domain.Models;
using System;

public class BrandValidator : AbstractValidator<Brand>
{
    private IUnitOfWork unitOfWork;

    public BrandValidator()
    {
        //tags validation
        RuleFor(x => x.Tags)
            .MaximumLength(100)
            .When(x => !string.IsNullOrWhiteSpace(x.Tags));

        //description validation
        RuleFor(x => x.Description)
            .MaximumLength(300)
            .WithMessage("Description must not exceed 300 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Description));

        //logo URL validation
        RuleFor(x => x.LogoUrl)
            .Must(BeValidUrl)
            .When(x => !string.IsNullOrWhiteSpace(x.LogoUrl))
            .WithMessage("LogoUrl must be a valid URL.");

        //website URL validation
        RuleFor(x => x.WebsiteUrl)
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .When(x => !string.IsNullOrWhiteSpace(x.WebsiteUrl))
            .WithMessage("Website URL must be a valid link.");

        //phone number validation
        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^\+?\d{10,15}$")
            .WithMessage("Phone number must be valid and contain 10–15 digits.");

        //address validation
        RuleFor(x => x.Address)
            .MaximumLength(100)
            .WithMessage("Address must not exceed 100 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Address));
    }

    public BrandValidator(IUnitOfWork unitOfWork)
    {
        this.unitOfWork = unitOfWork;
    }

    private bool BeValidUrl(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out _);
    }
}
