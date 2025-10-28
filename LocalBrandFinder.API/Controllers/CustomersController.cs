using LocalBrandFinder.Application.Interfaces;
using LocalBrandFinder.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace LocalBrandFinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CustomersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("getall")]
    public async Task<ActionResult<IEnumerable<Customer>>> GetAllCustomers()
    {
        var customers = await _unitOfWork.Customers.GetAllAsync();
        return Ok(customers);
    }

    [HttpPost("create")]
    public async Task<ActionResult<Customer>> CreateCustomer(Customer customer)
    {
        await _unitOfWork.Customers.AddAsync(customer);
        await _unitOfWork.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAllCustomers), new { id = customer.Id }, customer);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateCustomer(Guid id, Customer customer)
    {
        if (id != customer.Id)
        {
            return BadRequest();
        }

        var existingCustomer = await _unitOfWork.Customers.GetByIdAsync(id);
        if (existingCustomer == null)
        {
            return NotFound();
        }

        await _unitOfWork.Customers.UpdateAsync(customer);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteCustomer(Guid id)
    {
        var customer = await _unitOfWork.Customers.GetByIdAsync(id);
        if (customer == null)
        {
            return NotFound();
        }

        await _unitOfWork.Customers.DeleteAsync(customer);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

}