using LocalBrandFinder.Application.Common.Security;
using LocalBrandFinder.Application.DTOs.Authentication;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace LocalBrandFinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public AuthController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto loginDto)
    {
        // Try customer login first
        var customers = await _unitOfWork.Customers.GetAsync(c => c.Email == loginDto.Email);
        var customer = customers.FirstOrDefault();

        if (customer != null && PasswordHasher.VerifyPassword(loginDto.Password, customer.PasswordHash))
        {
            var customerResponse = new LoginResponseDto
            {
                Id = customer.Id.ToString(),
                Name = customer.Name,
                Email = customer.Email,
                Role = "Customer",
                Message = "Login successful"
            };
            return Ok(customerResponse);
        }

        // Try brand login
        var brands = await _unitOfWork.Brands.GetAsync(b => b.Email == loginDto.Email);
        var brand = brands.FirstOrDefault();

        if (brand != null && PasswordHasher.VerifyPassword(loginDto.Password, brand.PasswordHash))
        {
            var brandResponse = new LoginResponseDto
            {
                Id = brand.Id.ToString(),
                Name = brand.Name,
                Email = brand.Email,
                Role = "Brand",
                Message = "Login successful"
            };
            return Ok(brandResponse);
        }

        return Unauthorized("Invalid email or password");
    }

    [HttpPost("customer/register")]
    public async Task<ActionResult<LoginResponseDto>> RegisterCustomer(CustomerSignUpDto registerDto)
    {
        var existingCustomers = await _unitOfWork.Customers.GetAsync(c => c.Email == registerDto.Email);
        if (existingCustomers.Any())
        {
            return BadRequest("Email already registered");
        }

        var customer = new Customer
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PasswordHash = PasswordHasher.HashPassword(registerDto.Password),
            PhoneNumber = registerDto.PhoneNumber ?? string.Empty,
            Address = registerDto.Address ?? string.Empty
        };

        await _unitOfWork.Customers.AddAsync(customer);
        await _unitOfWork.SaveChangesAsync();

        var response = new LoginResponseDto
        {
            Id = customer.Id.ToString(),
            Name = customer.Name,
            Email = customer.Email,
            Role = "Customer",
            Message = "Registration successful"
        };

        return CreatedAtAction(nameof(Login), new { }, response);
    }

    [HttpPost("brand/register")]
    public async Task<ActionResult<LoginResponseDto>> RegisterBrand(BrandSignUpDto registerDto)
    {
        var existingBrands = await _unitOfWork.Brands.GetAsync(b => b.Email == registerDto.Email);
        if (existingBrands.Any())
        {
            return BadRequest("Email already registered");
        }

        var brand = new Brand
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PasswordHash = PasswordHasher.HashPassword(registerDto.Password),
            Description = registerDto.Description ?? string.Empty,
            PhoneNumber = registerDto.PhoneNumber ?? string.Empty,
            Address = registerDto.Address ?? string.Empty,
            LogoUrl = registerDto.LogoUrl ?? string.Empty
        };

        await _unitOfWork.Brands.AddAsync(brand);
        await _unitOfWork.SaveChangesAsync();

        var response = new LoginResponseDto
        {
            Id = brand.Id.ToString(),
            Name = brand.Name,
            Email = brand.Email,
            Role = "Brand",
            Message = "Registration successful"
        };

        return CreatedAtAction(nameof(Login), new { }, response);
    }
}