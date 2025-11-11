using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocalBrandFinder.Domain.Models.Common
{
    public class BaseUser : AuditableEntity
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public required string PasswordHash { get; set; }
    }
}
