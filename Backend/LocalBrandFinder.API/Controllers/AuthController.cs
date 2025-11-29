using FluentValidation;
using FluentValidation.Results;
using LocalBrandFinder.Application.DTOs.Authentication;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Application.Utilities;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace LocalBrandFinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(
    IUnitOfWork _unitOfWork,
    PasswordUtility _passwordUtility,
    AuthUtility _authUtility,
    IValidator<CustomerSignUpDto> _customerValidator,
    IValidator<BrandSignUpDto> _brandValidator
) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto loginDto)
    {
        var customer = await _unitOfWork.Customers.GetSingleAsync(c => c.Email == loginDto.Email);

        if (customer != null && _passwordUtility.VerifyPassword(loginDto.Password, customer.PasswordHash))
        {
            string token = _authUtility.CreateToken(customer);
            return Ok(new { Token = token, Role = "Customer" });
        }

        var brand = await _unitOfWork.Brands.GetSingleAsync(b => b.Email == loginDto.Email);

        if (brand != null && _passwordUtility.VerifyPassword(loginDto.Password, brand.PasswordHash))
        {
            string token = _authUtility.CreateToken(brand);
            return Ok(new { Token = token, Role = "Brand" });
        }

        return Unauthorized("Invalid email or password");
    }

    [HttpPost("customer/register")]
    public async Task<IActionResult> RegisterCustomer(CustomerSignUpDto registerDto)
    {
        ValidationResult validation = await _customerValidator.ValidateAsync(registerDto);
        if (!validation.IsValid)
            return BadRequest(validation.Errors.Select(e => e.ErrorMessage));

        var customer = new Customer
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PasswordHash = _passwordUtility.HashPassword(registerDto.Password),
            PhoneNumber = registerDto.PhoneNumber ?? string.Empty,
            Address = registerDto.Address ?? string.Empty
        };

        bool added = await _unitOfWork.Customers.AddAsync(customer);
        bool saved = await _unitOfWork.SaveChangesAsync();

        if (added && saved)
        {
            var token = _authUtility.CreateToken(customer);
            return Ok(new
            {
                Message = "Registration successful",
                Token = token
            });
        }

        return StatusCode(500, "Failed to register customer.");
    }

    [HttpPost("brand/register")]
    public async Task<IActionResult> RegisterBrand(BrandSignUpDto registerDto)
    {
        ValidationResult validation = await _brandValidator.ValidateAsync(registerDto);
        if (!validation.IsValid)
            return BadRequest(validation.Errors.Select(e => e.ErrorMessage));

        var brand = new Brand
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PasswordHash = _passwordUtility.HashPassword(registerDto.Password),
            Description = registerDto.Description ?? string.Empty,
            PhoneNumber = registerDto.PhoneNumber ?? string.Empty,
            Address = registerDto.Address ?? string.Empty,
            LogoUrl = registerDto.LogoUrl ?? string.Empty
        };

        bool added = await _unitOfWork.Brands.AddAsync(brand);
        bool saved = await _unitOfWork.SaveChangesAsync();

        if (added && saved)
        {
            var token = _authUtility.CreateToken(brand);
            return Ok(new
            {
                Message = "Registration successful",
                Token = token
            });
        }

        return StatusCode(500, "Failed to register brand.");
    }

    [HttpGet("test/customer")]
    [Authorize(Roles = "Customer")]
    public IActionResult TestCustomerAuth()
    {
        return Ok(new
        {
            Message = "Customer authentication successful.",
            User = User.Identity?.Name,
            Role = "Customer"
        });
    }

    [HttpGet("test/brand")]
    [Authorize(Roles = "Brand")]
    public IActionResult TestBrandAuth()
    {
        return Ok(new
        {
            Message = "Brand authentication successful.",
            User = User.Identity?.Name,
            Role = "Brand"
        });
    }
}
