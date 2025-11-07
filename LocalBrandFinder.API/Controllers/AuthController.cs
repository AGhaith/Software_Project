using LocalBrandFinder.Application.DTOs.Authentication;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Application.Utilities;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocalBrandFinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(
    IUnitOfWork _unitOfWork,
    PasswordUtility _passwordUtility,
    AuthUtility _authUtility
) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto loginDto)
    {
        // Try customer login
        var customer = await _unitOfWork.Customers.GetSingleAsync(c => c.Email == loginDto.Email);

        if (customer != null && _passwordUtility.VerifyPassword(loginDto.Password, customer.PasswordHash))
        {
            string token = _authUtility.CreateToken(customer);
            return Ok(new { Token = token, Role = "Customer" });
        }

        // Try brand login
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
        var existingCustomer = await _unitOfWork.Customers.GetSingleAsync(c => c.Email == registerDto.Email);
        if (existingCustomer != null)
            return BadRequest("Email already registered");

        var customer = new Customer
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PasswordHash = _passwordUtility.HashPassword(registerDto.Password),
            PhoneNumber = registerDto.PhoneNumber ?? string.Empty,
            Address = registerDto.Address ?? string.Empty
        };

        bool r1 = await _unitOfWork.Customers.AddAsync(customer);
        bool r2 = await _unitOfWork.SaveChangesAsync();

        if (r1 && r2)
        {
            var token = _authUtility.CreateToken(customer);
            return Ok(new
            {
                Message = "Registration successful",
                Token = token
            });
        }

        return Unauthorized("Failed to register.");
    }

    [HttpPost("brand/register")]
    public async Task<IActionResult> RegisterBrand(BrandSignUpDto registerDto)
    {
        var existingBrand = await _unitOfWork.Brands.GetSingleAsync(b => b.Email == registerDto.Email);
        if (existingBrand != null)
            return BadRequest("Email already registered");

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

        bool r1 = await _unitOfWork.Brands.AddAsync(brand);
        bool r2 = await _unitOfWork.SaveChangesAsync();

        if (r1 && r2)
        {
            var token = _authUtility.CreateToken(brand);
            return Ok(new
            {
                Message = "Registration successful",
                Token = token
            });
        }

        return Unauthorized("Failed to register.");
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

