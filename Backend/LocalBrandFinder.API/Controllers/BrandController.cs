using LocalBrandFinder.Application;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Application.Utilities;
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

    public BrandController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    // PATCH: api/brand/add/{brandId}/categories/{categoryId}
    [HttpPatch("add/{brandId}/categories/{categoryId}")]
    [Authorize(Roles = "Brand")]
    public async Task<IActionResult> AddCategoryToBrand(Guid brandId, Guid categoryId)
    {

        // Include Categories to avoid null
        var brandList = await _unitOfWork.Brands.GetAsync(
            b => b.Id == brandId,
            includeString: "Categories"
        );
        var brand = brandList.FirstOrDefault();

        if (brand == null)
            return NotFound($"Brand with ID {brandId} not found.");

        var category = await _unitOfWork.Categories.GetSingleAsync(c => c.Id == categoryId);
        if (category == null)
            return NotFound($"Category with ID {categoryId} not found.");

        if (brand.Categories.Any(c => c.Id == categoryId))
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
    [HttpGet("Search/{brandName}")]
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
            b.Products,
        });

        return Ok(result);
    }
    [HttpPatch("add/{brandId}/Product/{ProductId}")]
    [Authorize(Roles = "Brand")]
    public async Task<IActionResult> AddProductToBrand(Guid brandId, CreateProductDTO productdto)
    {
        
        var brandList = await _unitOfWork.Brands.GetAsync(
            b => b.Id == brandId,
            includeString: "Products"
        );
        var brand = brandList.FirstOrDefault();

        if (brand == null)
            return NotFound($"Brand with ID {brandId} not found.");
        var product = new Product
        {
            Name = productdto.Name,
            Description = productdto.Description,
            Price = productdto.Price,
            Type = productdto.Type,
            AvailableSizes = productdto.AvailableSizes,
            AvailableStock = productdto.AvailableStock
        };
        await _unitOfWork.Products.AddAsync(product);
        bool saveResult = await _unitOfWork.SaveChangesAsync();
        if (!saveResult)
            return BadRequest(new { message = "Failed to create Product." });

        Guid ProductId = product.Id;
        if (product == null)
            return NotFound($"Product ID {ProductId} not found.");

        if (brand.Products.Any(c => c.Id == ProductId))
            return BadRequest("Product already exist");

        brand.Products.Add(product);
        await _unitOfWork.Brands.UpdateAsync(brand);
        bool r = await _unitOfWork.SaveChangesAsync();
        if (r)
            return Ok(new
            {
                message = "Product added to brand successfully.",
                product = brand.Products.Select(c => c.Name).ToList()
            });

        return BadRequest(new { message = "Failed to add Product." });
    }

}
