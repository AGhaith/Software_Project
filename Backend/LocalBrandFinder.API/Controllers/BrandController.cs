using FluentValidation;
using LocalBrandFinder.Application;
using LocalBrandFinder.Application.DTOs;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Application.Interfaces.Utilities;
using LocalBrandFinder.Domain.Models;
using LocalBrandFinder.Domain.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocalBrandFinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrandController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IImgBBService _imgBBService;
    private readonly IValidator<EditBrandDto> _editBrandValidator;

    public BrandController(
        IUnitOfWork unitOfWork,
        IImgBBService imgBBService,
        IValidator<EditBrandDto> editBrandValidator)
    {
        _unitOfWork = unitOfWork;
        _imgBBService = imgBBService;
        _editBrandValidator = editBrandValidator;
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> GetAllBrands()
    {
        var brands = await _unitOfWork.Brands.GetAllAsync();
        return Ok(brands ?? new List<Brand>());
    }

    [HttpPatch("add/{brandId}/categories/{categoryName}")]
    [Authorize(Roles = "Brand")]
    public async Task<IActionResult> AddCategoryToBrand(Guid brandId, string categoryName)
    {
        if (string.IsNullOrWhiteSpace(categoryName))
            return BadRequest("Category name is required.");

        categoryName = categoryName.ToLower();

        var brandList = await _unitOfWork.Brands.GetAsync(
            b => b.Id == brandId,
            includeString: "Categories"
        );

        var brand = brandList?.FirstOrDefault();
        if (brand == null)
            return NotFound($"Brand with ID {brandId} not found.");

        var category = await _unitOfWork.Categories.GetSingleAsync(c => c.Name.ToLower() == categoryName);
        if (category == null)
            return NotFound($"Category '{categoryName}' not found.");

        if (brand.Categories != null && brand.Categories.Any(c => c.Name.ToLower() == categoryName))
            return BadRequest("Category already assigned to this brand.");

        brand.Categories ??= new List<Category>();
        brand.Categories.Add(category);

        await _unitOfWork.Brands.UpdateAsync(brand);
        if (await _unitOfWork.SaveChangesAsync())
        {
            return Ok(new
            {
                message = "Category added successfully.",
                categories = brand.Categories.Select(c => c.Name)
            });
        }

        return BadRequest("Failed to add category.");
    }

    [HttpGet("has-category/{categoryName}")]
    public async Task<IActionResult> GetBrandsByCategory(string categoryName)
    {
        var categories = await _unitOfWork.Categories.GetAsync(
            c => c.Name.ToLower() == categoryName.ToLower(),
            includeString: "Brands"
        );

        var category = categories?.FirstOrDefault();
        if (category == null) return NotFound();

        var result = category.Brands?.Select(b => new { b.Id, b.Name }) ?? Enumerable.Empty<object>();
        return Ok(result);
    }

    [HttpGet("search/{brandName}")]
    public async Task<IActionResult> SearchBrand(string brandName)
    {
        var brands = await _unitOfWork.Brands.GetAsync(
            b => b.Name.ToLower().Contains(brandName.ToLower()),
            includeString: "Categories"
        );

        if (brands == null || !brands.Any())
            return NotFound();

        return Ok(brands.Select(b => new {
            b.Id,
            b.Name,
            b.LogoUrl,
            b.WebsiteUrl,
            b.Description,
            Categories = b.Categories?.Select(c => c.Name)
        }));
    }

    [HttpPost("Add-Product/{brandId}")]
    [Authorize(Roles = "Brand")]
    public async Task<IActionResult> AddProductToBrand(Guid brandId, [FromBody] CreateProductDTO productDto)
    {
        var brand = await _unitOfWork.Brands.GetSingleAsync(b => b.Id == brandId);
        if (brand == null) return NotFound("Brand not found.");

        var newProduct = new Product
        {
            Name = productDto.Name,
            Price = productDto.Price,
            BrandId = brandId,
            Description = productDto.Description,
            AvailableSizes = productDto.AvailableSizes,
            AvailableStock = productDto.AvailableStock,
            Type = productDto.Type,
        };

        await _unitOfWork.Products.AddAsync(newProduct);
        if (await _unitOfWork.SaveChangesAsync())
            return Ok(new { message = "Product added successfully." });

        return BadRequest("Failed to add product.");
    }

    [HttpPatch("edit/{id}")]
    [Authorize(Roles = "Brand")]
    public async Task<IActionResult> EditBrand(Guid id, [FromForm] EditBrandDto request)
    {
        var validationResult = await _editBrandValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
            return BadRequest(validationResult.Errors);

        var brand = await _unitOfWork.Brands.GetSingleAsync(b => b.Id == id);
        if (brand == null) return NotFound();

        // Update fields if provided
        if (!string.IsNullOrEmpty(request.Description)) brand.Description = request.Description;
        if (!string.IsNullOrEmpty(request.WebsiteUrl)) brand.WebsiteUrl = request.WebsiteUrl;
        if (!string.IsNullOrEmpty(request.PhoneNumber)) brand.PhoneNumber = request.PhoneNumber;
        if (!string.IsNullOrEmpty(request.Address)) brand.Address = request.Address;
        if (!string.IsNullOrEmpty(request.Tags)) brand.Tags = request.Tags;

        if (request.Logo != null)
        {
            brand.LogoUrl = await _imgBBService.UploadAsync(request.Logo);
        }

        await _unitOfWork.SaveChangesAsync();
        return Ok(brand);
    }

    [HttpGet("GetProductsFromBrand/{brandId}")]
    public async Task<IActionResult> GetProductsFromBrand(Guid brandId)
    {
        var products = await _unitOfWork.Products.GetAsync(p => p.BrandId == brandId);
        return Ok(products ?? new List<Product>());
    }
}