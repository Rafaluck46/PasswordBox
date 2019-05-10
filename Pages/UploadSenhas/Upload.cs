using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PasswordBox.Contexts;
using PasswordBox.Entities;

namespace PasswordBox.Pages
{
    [ApiController]
    [Route("/api/[controller]")]
    public class Upload : ControllerBase
    {
        private readonly PasswordBoxDbContext _context;
        
        public Upload(PasswordBoxDbContext context){
            this._context = context;
        }

        [HttpPost]
        public void Create(List<Password> password)
        {
            using (_context)
            {
                _context.Password.AddRange(password);
                _context.SaveChanges();
            }
                        
        }
    }
}