using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocalBrandFinder.Application.DTOs.Authentication
{
    internal class CreateCategoryDTO
    {
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }
    }
}
