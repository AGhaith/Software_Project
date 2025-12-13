using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocalBrandFinder.Application
{
    public class CreateProductDTO
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Price { get; set; }
        public required string Type { get; set; }
        public required List<string> AvailableSizes { get; set; }
        public required int AvailableStock { get; set; }
    }
}
