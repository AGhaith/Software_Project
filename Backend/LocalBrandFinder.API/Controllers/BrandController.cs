using FluentValidation;
using LocalBrandFinder.Application.DTOs.Authentication;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Application.Validators;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Needed for Include
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LocalBrandFinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]


    public class BrandController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IValidator<Brand> _validator; // ashan aaraf a call el validator

    public BrandController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        _validator = new BrandValidator(_unitOfWork); // ashan aaraf a call el validator
    }

    // PATCH: api/brand/add/{brandId}/categories/{categoryId}
    [HttpPatch("add/{brandId}/categories/{categoryId}")]
    [Authorize(Roles ="Brand")]
    public async Task<IActionResult> AddCategoryToBrand(Guid brandId, string categoryName)
    {
        categoryName = categoryName.ToLower();
        // Include Categories to avoid null
        var brandList = await _unitOfWork.Brands.GetAsync(
            b => b.Id == brandId,
            includeString: "Categories"
        );
        var brand = brandList.FirstOrDefault();

        if (brand == null)
            return NotFound($"Brand with ID {brandId} not found.");

        var category = await _unitOfWork.Categories.GetSingleAsync(c => c.Name.ToLower() == categoryName);
        if (category == null)
            return NotFound($"Category with Name {categoryName} not found.");

        if (brand.Categories.Any(c => c.Name.ToLower() == categoryName))
            return BadRequest("Category already assigned to this brand.");

        brand.Categories.Add(category);
        await _unitOfWork.Brands.UpdateAsync(brand);
        bool r = await _unitOfWork.SaveChangesAsync();
        if (r)
            return Ok(new
            {
                message = "Category added to brand successfully.",
                categories = brand.Categories.Select(c => c.Name).ToList()
            });

        return BadRequest(new { message = "Failed to add category." });
    }
    [HttpGet("has-category/{categoryName}")]
    public async Task<IActionResult> GetBrandsByCategory(string categoryName)
    {
        if (string.IsNullOrWhiteSpace(categoryName))
            return BadRequest("Category name is required.");

        // Convert both to lower for case-insensitive comparison
        var categories = await _unitOfWork.Categories.GetAsync(
            c => c.Name.ToLower() == categoryName.ToLower(),
            includeString: "Brands"
        );

        var category = categories.FirstOrDefault();
        if (category == null)
            return NotFound($"Category '{categoryName}' not found.");

        var brands = category.Brands.Select(b => new
        {
            b.Id,
            b.Name
        }).ToList();

        return Ok(brands);
    }
    [HttpGet("search/{brandName}")]
    public async Task<IActionResult> SearchBrand(string brandName)
    {
        if (string.IsNullOrWhiteSpace(brandName))
            return BadRequest("Brand name is required.");

        // Case-insensitive search
        var brands = await _unitOfWork.Brands.GetAsync(
            b => b.Name.ToLower().Contains(brandName.ToLower())
        );

        if (brands == null || !brands.Any())
            return NotFound($"No brands found matching '{brandName}'.");

        var result = brands.Select(b => new
        {
            b.Id,
            b.Name,
            b.Categories,
            b.LogoUrl,
            b.WebsiteUrl,
            b.Description,
        });

        return Ok(result);
    }


    [HttpGet("get-all")]
    public async Task<IActionResult> GetAllBrands()
    {
        var brands = await _unitOfWork.Brands.GetAllAsync();
        return Ok(brands);
    }




    [HttpPatch("brands/{id}")]

    public async Task<IActionResult> EditBrand(Guid id, [FromForm] EditBrandDto request)
    {

        var validationResult = await _validator.ValidateAsync((IValidationContext)request);

        if (!validationResult.IsValid)
            return BadRequest(validationResult.Errors);

        var brand = await _unitOfWork.Brands.GetSingleAsync(b => b.Id == id);
        if (brand == null)
            return NotFound();

        if (!string.IsNullOrEmpty(request.Tags))
            brand.Tags = request.Tags;

        if (!string.IsNullOrEmpty(request.Description))
            brand.Description = request.Description;

        if( request.Logo != null)
        {
            var logoUrl = await UploadLogoAsync(request.Logo);
            brand.LogoUrl = logoUrl;
        }


        if (!string.IsNullOrEmpty(request.WebsiteUrl))
            brand.WebsiteUrl = request.WebsiteUrl;

        if (!string.IsNullOrEmpty(request.PhoneNumber))
            brand.PhoneNumber = request.PhoneNumber;

        if (!string.IsNullOrEmpty(request.Address))
            brand.Address = request.Address;

        

        await _unitOfWork.SaveChangesAsync();
        return Ok(brand);
    }

    private async Task<string> UploadLogoAsync(IFormFile logo)
    {
        throw new NotImplementedException();
    }
}



