using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace LocalBrandFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var brands = await _unitOfWork.Brands.GetAllAsync();
            if (brands == null || !brands.Any())
                return NotFound("No brands found.");
            return Ok(brands);
        }

        
        [HttpPost("create")] 
        public async Task<IActionResult> CreateCategory([FromBody] CategoryCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Category name cannot be empty.");

            var existingCategory = await _unitOfWork.Categories
                .GetSingleAsync(c => c.Name.ToLower() == dto.Name.ToLower());

            if (existingCategory != null)
                return BadRequest("Category already exists.");

            var category = new Category { Name = dto.Name };

            await _unitOfWork.Categories.AddAsync(category);
            var result = await _unitOfWork.SaveChangesAsync();

            if (!result)
                return StatusCode(500, "Failed to create category.");

            return Ok(category);
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(Guid id) //get category by id
        {
            var category = await _unitOfWork.Categories.GetAsync(c => c.Id == id);

            if (category == null)
                return NotFound($"Category with id {id} not found.");

            return Ok(category);
        }
    }
}
