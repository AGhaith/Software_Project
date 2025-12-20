using FluentValidation;
using FluentValidation.Results;
using LocalBrandFinder.API.Controllers;
using LocalBrandFinder.Application.DTOs.Authentication;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Application.Interfaces.Utilities;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Linq.Expressions;

using ValidationResult = FluentValidation.Results.ValidationResult;
public class AuthControllerTests
{
    private readonly Mock<IUnitOfWork> _uow = new();
    private readonly Mock<IPasswordUtility> _passwordUtil = new();
    private readonly Mock<IAuthUtility> _authUtil = new();
    private readonly Mock<IValidator<CustomerSignUpDto>> _customerValidator = new();
    private readonly Mock<IValidator<BrandSignUpDto>> _brandValidator = new();
    private readonly Mock<IImgBBService> _imgBB = new();

    private AuthController CreateController()
    {
        return new AuthController(
            _uow.Object,
            _passwordUtil.Object,
            _authUtil.Object,
            _customerValidator.Object,
            _brandValidator.Object,
            _imgBB.Object
        );
    }

    // ---------------- LOGIN ----------------

    [Fact]
    public async Task Login_ReturnsOk_WhenCustomerCredentialsValid()
    {
        var customer = new Customer
        {
            Name = "TestName",
            Email = "test@test.com",
            PasswordHash = "hashed",
        };

        _uow.Setup(u => u.Customers.GetSingleAsync(It.IsAny<Expression<Func<Customer, bool>>>()))
            .ReturnsAsync(customer);

        _passwordUtil.Setup(p => p.VerifyPassword("123", "hashed"))
            .Returns(true);

        _authUtil.Setup(a => a.CreateToken(customer))
            .Returns("jwt");

        var controller = CreateController();

        var result = await controller.Login(new LoginRequestDto
        {
            Email = "test@test.com",
            Password = "123"
        });

        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.Contains("Token", ok.Value!.ToString());
    }

    [Fact]
    public async Task Login_ReturnsUnauthorized_WhenInvalidCredentials()
    {
        _uow.Setup(u => u.Customers.GetSingleAsync(It.IsAny<Expression<Func<Customer, bool>>>()))
            .ReturnsAsync((Customer?)null);

        _uow.Setup(u => u.Brands.GetSingleAsync(It.IsAny<Expression<Func<Brand, bool>>>()))
            .ReturnsAsync((Brand?)null);

        var controller = CreateController();

        var result = await controller.Login(new LoginRequestDto
        {
            Email = "wrong@test.com",
            Password = "nope"
        });

        Assert.IsType<UnauthorizedObjectResult>(result);
    }

    // ---------------- CUSTOMER REGISTER ----------------

    [Fact]
    public async Task RegisterCustomer_ReturnsOk_WhenValid()
    {
        _customerValidator
            .Setup(v => v.ValidateAsync(It.IsAny<CustomerSignUpDto>(), default))
            .ReturnsAsync(new ValidationResult());

        _passwordUtil.Setup(p => p.HashPassword(It.IsAny<string>()))
            .Returns("hashed");

        _uow.Setup(u => u.Customers.AddAsync(It.IsAny<Customer>()))
            .ReturnsAsync(true);

        _uow.Setup(u => u.SaveChangesAsync())
            .ReturnsAsync(true);

        _authUtil.Setup(a => a.CreateToken(It.IsAny<Customer>()))
            .Returns("jwt");

        var controller = CreateController();

        var result = await controller.RegisterCustomer(new CustomerSignUpDto
        {
            Name = "Ahmed",
            Email = "a@test.com",
            Password = "123",
            ConfirmPassword = "123",

        });

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task RegisterCustomer_ReturnsBadRequest_WhenValidationFails()
    {
        _customerValidator
            .Setup(v => v.ValidateAsync(It.IsAny<CustomerSignUpDto>(), default))
            .ReturnsAsync(new ValidationResult(
                new[] { new ValidationFailure("Email", "Invalid") }
            ));

        var controller = CreateController();

        var result = await controller.RegisterCustomer(new CustomerSignUpDto
        {
            Name = string.Empty,
            Email = string.Empty,
            Password = string.Empty,
            ConfirmPassword = string.Empty
        });

        Assert.IsType<BadRequestObjectResult>(result);
    }
}
