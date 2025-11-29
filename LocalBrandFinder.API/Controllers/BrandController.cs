using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Needed for Include
using System;
using System.Linq;
using System.Threading.Tasks;

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


}
