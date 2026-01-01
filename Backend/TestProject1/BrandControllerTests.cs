using LocalBrandFinder.API.Controllers;
using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Linq.Expressions;
using Xunit;
using FluentValidation;
using LocalBrandFinder.Application.DTOs;
using LocalBrandFinder.Application.Interfaces.Utilities;

public class BrandControllerTests
{
    private readonly Mock<IUnitOfWork> _uow = new();
    private readonly Mock<IImgBBService> _imgBBService = new();
    private readonly Mock<IValidator<EditBrandDto>> _editBrandValidator = new();

    private BrandController CreateController()
        => new BrandController(_uow.Object, _imgBBService.Object, _editBrandValidator.Object);

    // ---------- ADD CATEGORY ----------

    [Fact]
    public async Task AddCategoryToBrand_ReturnsOk_WhenSuccessful()
    {
        var brandId = Guid.NewGuid();
        var brand = new Brand
        {
            Id = brandId,
            Name = "TestBrand",
            Categories = new List<Category>(),
            Email = "test@nu.edu.eg",
            PasswordHash = "Hashed",
        };
        var category = new Category { Name = "fashion" };

        var brandRepo = new Mock<IBrandRepository>();
        brandRepo.Setup(r => r.GetAsync(
                It.IsAny<Expression<Func<Brand, bool>>>(),
                It.IsAny<Func<IQueryable<Brand>, IOrderedQueryable<Brand>>>(),
                It.IsAny<string>(),
                It.IsAny<bool>()
            ))
            .ReturnsAsync(new List<Brand> { brand });

        var categoryRepo = new Mock<ICategoryRepository>();
        categoryRepo.Setup(r => r.GetAsync(
                It.IsAny<Expression<Func<Category, bool>>>(),
                It.IsAny<Func<IQueryable<Category>, IOrderedQueryable<Category>>>(),
                It.IsAny<string>(),
                It.IsAny<bool>()
            ))
            .ReturnsAsync(new List<Category> { category });

        categoryRepo.Setup(r => r.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>()))
            .ReturnsAsync(category);

        brandRepo.Setup(r => r.UpdateAsync(It.IsAny<Brand>()))
            .Returns(Task.CompletedTask);

        _uow.Setup(u => u.Brands).Returns(brandRepo.Object);
        _uow.Setup(u => u.Categories).Returns(categoryRepo.Object);

        _uow.Setup(u => u.SaveChangesAsync())
            .ReturnsAsync(true);

        var controller = CreateController();
        var result = await controller.AddCategoryToBrand(brandId, "Fashion");

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task AddCategoryToBrand_ReturnsNotFound_WhenBrandMissing()
    {
        var brandRepo = new Mock<IBrandRepository>();
        brandRepo.Setup(r => r.GetAsync(
                It.IsAny<Expression<Func<Brand, bool>>>(),
                It.IsAny<Func<IQueryable<Brand>, IOrderedQueryable<Brand>>>(),
                It.IsAny<string>(),
                It.IsAny<bool>()
            ))
            .ReturnsAsync(new List<Brand>());

        _uow.Setup(u => u.Brands).Returns(brandRepo.Object);

        var controller = CreateController();
        var result = await controller.AddCategoryToBrand(Guid.NewGuid(), "fashion");

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task AddCategoryToBrand_ReturnsBadRequest_WhenCategoryAlreadyExists()
    {
        var category = new Category { Name = "fashion" };
        var brandId = Guid.NewGuid();
        var brand = new Brand
        {
            Id = brandId,
            Name = "test",
            Email = "test@gmail.com",
            PasswordHash = "hashed",
            Categories = new List<Category> { category }
        };

        var brandRepo = new Mock<IBrandRepository>();
        brandRepo.Setup(r => r.GetAsync(
                It.IsAny<Expression<Func<Brand, bool>>>(),
                It.IsAny<Func<IQueryable<Brand>, IOrderedQueryable<Brand>>>(),
                It.IsAny<string>(),
                It.IsAny<bool>()
            ))
            .ReturnsAsync(new List<Brand> { brand });

        var categoryRepo = new Mock<ICategoryRepository>();
        categoryRepo.Setup(r => r.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>()))
            .ReturnsAsync(category);

        _uow.Setup(u => u.Brands).Returns(brandRepo.Object);
        _uow.Setup(u => u.Categories).Returns(categoryRepo.Object);

        var controller = CreateController();
        var result = await controller.AddCategoryToBrand(brandId, "fashion");

        Assert.IsType<BadRequestObjectResult>(result);
    }

    // ---------- GET BRANDS BY CATEGORY ----------

    [Fact]
    public async Task GetBrandsByCategory_ReturnsOk_WhenFound()
    {
        var category = new Category
        {
            Name = "tech",
            Brands = new List<Brand>
            {
                new Brand { Id = Guid.NewGuid(), Name = "BrandA", Email = "test@gmail.com", PasswordHash = "hashed" }
            }
        };

        var categoryRepo = new Mock<ICategoryRepository>();
        categoryRepo.Setup(r => r.GetAsync(
                It.IsAny<Expression<Func<Category, bool>>>(),
                It.IsAny<Func<IQueryable<Category>, IOrderedQueryable<Category>>>(),
                It.IsAny<string>(),
                It.IsAny<bool>()
            ))
            .ReturnsAsync(new List<Category> { category });

        _uow.Setup(u => u.Categories).Returns(categoryRepo.Object);

        var controller = CreateController();
        var result = await controller.GetBrandsByCategory("tech");

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task GetBrandsByCategory_ReturnsNotFound_WhenMissing()
    {
        var categoryRepo = new Mock<ICategoryRepository>();
        categoryRepo.Setup(r => r.GetAsync(
                It.IsAny<Expression<Func<Category, bool>>>(),
                It.IsAny<Func<IQueryable<Category>, IOrderedQueryable<Category>>>(),
                It.IsAny<string>(),
                It.IsAny<bool>()
            ))
            .ReturnsAsync(new List<Category>());

        _uow.Setup(u => u.Categories).Returns(categoryRepo.Object);

        var controller = CreateController();
        var result = await controller.GetBrandsByCategory("unknown");

        Assert.IsType<NotFoundObjectResult>(result);
    }

    // ---------- SEARCH BRAND ----------

    [Fact]
    public async Task SearchBrand_ReturnsNotFound_WhenNoMatch()
    {
        var brandRepo = new Mock<IBrandRepository>();
        brandRepo.Setup(r => r.GetAsync(
                It.IsAny<Expression<Func<Brand, bool>>>(),
                It.IsAny<Func<IQueryable<Brand>, IOrderedQueryable<Brand>>>(),
                It.IsAny<string>(),
                It.IsAny<bool>()
            ))
            .ReturnsAsync(new List<Brand>());

        _uow.Setup(u => u.Brands).Returns(brandRepo.Object);

        var controller = CreateController();
        var result = await controller.SearchBrand("unknown");

        Assert.IsType<NotFoundObjectResult>(result);
    }

    // ---------- GET ALL ----------

    [Fact]
    public async Task GetAllBrands_ReturnsOk()
    {
        var brandRepo = new Mock<IBrandRepository>();
        brandRepo.Setup(r => r.GetAllAsync())
            .ReturnsAsync(new List<Brand>());

        _uow.Setup(u => u.Brands).Returns(brandRepo.Object);

        var controller = CreateController();
        var result = await controller.GetAllBrands();

        Assert.IsType<OkObjectResult>(result);
    }
}
