using FluentValidation;
using LocalBrandFinder.Application.DTOs.Authentication;
using LocalBrandFinder.Application.Interfaces;
using System.Threading.Tasks;

namespace LocalBrandFinder.Application.Validators;

public class CustomerSignUpDtoValidator : AbstractValidator<CustomerSignUpDto>
{
    private readonly IUnitOfWork _unitOfWork;

    public CustomerSignUpDtoValidator(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MinimumLength(2).WithMessage("Name must be at least 2 characters long.")
            .MaximumLength(50).WithMessage("Name must not exceed 50 characters.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.")
            .MustAsync(async (email, _) =>
                !await _unitOfWork.Customers.ExistsAsync(c => c.Email == email))
            .WithMessage("Email is already registered.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"\d").WithMessage("Password must contain at least one digit.")
            .Matches(@"[\W_]").WithMessage("Password must contain at least one special character.");

        RuleFor(x => x.ConfirmPassword)
            .Equal(x => x.Password).WithMessage("Passwords do not match.");

        RuleFor(x => x.PhoneNumber)
            .Matches(@"^\+?\d{10,15}$").When(x => !string.IsNullOrWhiteSpace(x.PhoneNumber))
            .WithMessage("Phone number must be valid and contain 10–15 digits.");

        RuleFor(x => x.Address)
            .MaximumLength(100).WithMessage("Address must not exceed 100 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Address));
    }
}
