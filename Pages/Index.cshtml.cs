using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PasswordBox.Contexts;

namespace PasswordBox.Pages
{
    public class IndexModel : PageModel
    {
        private readonly PasswordBoxDbContext _context;
        public IndexModel(PasswordBoxDbContext context)
        {
            this._context = context;
        }
        public List<PasswordViewModel> PassViewModel { get; set; }
        public class PasswordViewModel
        {
            public int Id { get; set; }
            public string Nome { get; set; }
            public string Pwd { get; set; }

        }

        public void OnGet()
        {
            PassViewModel = new List<PasswordViewModel>();
            _context.Password.ToList().ForEach(x =>
            {
                PassViewModel.Add(new PasswordViewModel()
                {
                    Id = x.Id,
                    Nome = x.Nome,
                    Pwd = x.Pwd
                });
            });
        }

        public IActionResult OnPostEdit(int id)
        {
            return Redirect($"/AddPwd/{id}");
        }
    }
}
