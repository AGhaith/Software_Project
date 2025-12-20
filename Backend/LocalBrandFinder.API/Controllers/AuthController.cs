using FluentValidation;
using FluentValidation.Results;
using LocalBrandFinder.Application;
using LocalBrandFinder.Application.DTOs.Authentication;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Application.Interfaces.Utilities;
using LocalBrandFinder.Application.Utilities;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocalBrandFinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(
    IUnitOfWork _unitOfWork,
    IPasswordUtility _passwordUtility,
    IAuthUtility _authUtility,
    IValidator<CustomerSignUpDto> _customerValidator,
    IValidator<BrandSignUpDto> _brandValidator,
    IImgBBService _imgBB) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]LoginRequestDto loginDto)
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
    public async Task<IActionResult> RegisterCustomer([FromBody] CustomerSignUpDto registerDto)
    {
        Console.WriteLine("REQUEST RECIEVED");
        // Validate the DTO
        ValidationResult validation = await _customerValidator.ValidateAsync(registerDto);
        if (!validation.IsValid)
        {
            Console.WriteLine("EROOROROR");
            return BadRequest(validation.Errors.Select(e => e.ErrorMessage));
        }
        // Create the customer object
        var customer = new Customer
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PasswordHash = _passwordUtility.HashPassword(registerDto.Password),
            PhoneNumber = registerDto.PhoneNumber ?? string.Empty,
            Address = registerDto.Address ?? string.Empty
        };
        var pfp = registerDto.ProfilePicture;
        // Handle profile picture

        if (pfp != null && pfp.Length > 0)
        {
            var url = await _imgBB.UploadAsync(pfp); // Your image upload service
            customer.pfpLink = url;
        }else
        {
            customer.pfpLink = null;
        }

            // Save to database
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
    public async Task<IActionResult> RegisterBrand([FromForm] BrandSignUpDto registerDto)

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
            WebsiteUrl = registerDto.WebsiteUrl ?? string.Empty,
        };
        var logo = registerDto.Logo;
        if (!(logo == null || logo.Length == 0))
        {

            var url = await _imgBB.UploadAsync(logo);

            brand.LogoUrl = url;
        }

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
