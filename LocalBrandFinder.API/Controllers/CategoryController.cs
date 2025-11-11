using LocalBrandFinder.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LocalBrandFinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoryController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
}