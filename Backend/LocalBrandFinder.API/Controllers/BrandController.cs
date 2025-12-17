using LocalBrandFinder.Application;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Domain.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocalBrandFinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrandController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private ImgBBService _ImgBBService;
    public BrandController(IUnitOfWork unitOfWork, ImgBBService imgBBService)
    {
        _ImgBBService = imgBBService;
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
        var brand = brands.FirstOrDefault();

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
    [HttpPost("Add-Product/{brandId}/")]
    [Authorize(Roles = "Brand")]   
    public async Task<IActionResult> AddProductToBrand(Guid brandId, CreateProductDTO product)
    {

        var brandList = await _unitOfWork.Brands.GetAsync(
            b => b.Id == brandId
        );
        var brand = brandList.FirstOrDefault();

        if (brand == null)
            return NotFound($"Brand with ID {brandId} not found.");
        List<String> Urls = new List<String>();
        if (product.Images != null)
        {
            foreach (IFormFile image in product.Images)
            {
                if (image.Length == 0)
                    continue;
                var url = await _ImgBBService.UploadAsync(image);
                Urls.Add(url);
            }
        }



        Product p = new Product
        {
            Id = Guid.NewGuid(),
            Name = product.Name,
            Price = product.Price,
            Description = product.Description,
            AvailableStock = product.AvailableStock,
            AvailableSizes = product.AvailableSizes,
            Type = product.Type,
            Images = Urls,
        };

        brand.Products.Add(p);

        await _unitOfWork.Products.AddAsync(p);
        await _unitOfWork.Brands.UpdateAsync(brand);
        bool r = await _unitOfWork.SaveChangesAsync();

        if (r)
            return Ok(new
            {
                message = "Product added to brand successfully.",
                products = p,
            });

        return NotFound();
    }

    [HttpGet("GetProductsFromBrand/{brandId}/")]
    public async Task<IActionResult> GetProductsFromBrand(Guid brandId)
    {

        var ProductList = await _unitOfWork.Products.GetAsync(
            b => b.BrandId == brandId
        );
        if (ProductList == null)
            return NotFound($"Brand with ID {brandId} not found.");
       
        return Ok(ProductList);
    }


}
