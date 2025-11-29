using FluentValidation;
using LocalBrandFinder.Application.DTOs.Authentication;
using LocalBrandFinder.Application.Interfaces;
using System;
using System.Threading.Tasks;

namespace LocalBrandFinder.Application.Validators;

public class BrandSignUpDtoValidator : AbstractValidator<BrandSignUpDto>
{
    private readonly IUnitOfWork _unitOfWork;

    public BrandSignUpDtoValidator(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

        // --- Name ---
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MinimumLength(2).WithMessage("Name must be at least 2 characters long.")
            .MaximumLength(50).WithMessage("Name must not exceed 50 characters.");

        // --- Email ---
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.")
            .MustAsync(async (email, _) =>
                !await _unitOfWork.Brands.ExistsAsync(b => b.Email == email))
            .WithMessage("Email is already registered.");

        // --- Password ---
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"\d").WithMessage("Password must contain at least one digit.")
            .Matches(@"[\W_]").WithMessage("Password must contain at least one special character.");

        // --- Confirm Password ---
        RuleFor(x => x.ConfirmPassword)
            .Equal(x => x.Password)
            .WithMessage("Passwords do not match.");

        // --- Phone Number ---
        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^\+?\d{10,15}$")
            .WithMessage("Phone number must be valid and contain 10–15 digits.");

        // --- Address ---
        RuleFor(x => x.Address)
            .MaximumLength(100)
            .WithMessage("Address must not exceed 100 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Address));

        // --- Website URL ---
        RuleFor(x => x.WebsiteUrl)
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .When(x => !string.IsNullOrWhiteSpace(x.WebsiteUrl))
            .WithMessage("Website URL must be a valid link.");

        // --- Logo URL ---
        RuleFor(x => x.LogoUrl)
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .When(x => !string.IsNullOrWhiteSpace(x.LogoUrl))
            .WithMessage("Logo URL must be a valid link.");

        // --- Description ---
        RuleFor(x => x.Description)
            .MaximumLength(300)
            .WithMessage("Description must not exceed 300 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Description));
    }
}
