using LocalBrandFinder.Application.Interfaces;
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
            return NotFound($"Category with Name {categoryName} not found.");

        if (brand.Categories?.Any(c => c.Name.ToLower() == categoryName) ?? false)
            return BadRequest("Category already assigned to this brand.");

        brand.Categories ??= new List<Domain.Models.Category>();
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

        var categories = await _unitOfWork.Categories.GetAsync(
            c => c.Name.ToLower() == categoryName.ToLower(),
            includeString: "Brands"
        );

        var category = categories?.FirstOrDefault(); // safe
        if (category == null)
            return NotFound($"Category '{categoryName}' not found.");

        var brands = category.Brands?.Select(b => new { b.Id, b.Name }) ?? Enumerable.Empty<object>();




        return Ok(brands);
    }

    [HttpGet("search/{brandName}")]
    public async Task<IActionResult> SearchBrand(string brandName)
    {
        if (string.IsNullOrWhiteSpace(brandName))
            return BadRequest("Brand name is required.");

        var brands = await _unitOfWork.Brands.GetAsync(
            b => b.Name.ToLower().Contains(brandName.ToLower())
        );

        if (brands == null || !brands.Any())
            return NotFound($"No brands found matching '{brandName}'.");

        var result = brands.Select(b => new
        {
            b.Id,
            b.Name,
            Categories = b.Categories ?? new List<Domain.Models.Category>(),
            b.LogoUrl,
            b.WebsiteUrl,
            b.Description,
        });

        return Ok(result);
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> GetAllBrands()
    {
        var brands = await _unitOfWork.Brands.GetAllAsync() ?? new List<Domain.Models.Brand>();
        return Ok(brands);
    }
}
