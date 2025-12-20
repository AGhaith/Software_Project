using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocalBrandFinder.Application.DTOs.Authentication
{
    public  class EditBrandDto
    {
        public string? Tags { get; set; }
        public string? Description { get; set; }
        public string? WebsiteUrl { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }

        // upload logo
        public IFormFile? Logo { get; set; } 
    }
}
