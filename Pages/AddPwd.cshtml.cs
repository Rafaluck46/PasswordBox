using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PasswordBox.Contexts;

namespace PasswordBox.Pages
{
    public class AddPwdModel : PageModel
    {

        private readonly PasswordBoxDbContext _context;

        public class PasswordViewModel
        {
            public int Id { get; set; }
            public string Nome { get; set; }
            public string Pwd { get; set; }

        }

        [BindProperty]
        public PasswordViewModel Password { get; set; }
        public AddPwdModel(PasswordBoxDbContext context)
        {
            this._context = context;
        }
        public void OnGet(int id)
        {
            if (id == 0)
            {
                Password = new PasswordViewModel();
                return;
            }
            var pass = _context.Password.FirstOrDefault(x => x.Id == id);
            Password = new PasswordViewModel()
            {
                Id = pass.Id,
                Nome = pass.Nome,
                Pwd = pass.Pwd,
            };
        }

        public IActionResult OnPost()
        {
            var entidade = new Entities.Password();
            entidade.Id = Password.Id;
            entidade.Nome = Password.Nome;
            entidade.Pwd = Password.Pwd;

            if (entidade.Id == 0)
                _context.Password.Add(entidade);
            else
                _context.Update(entidade);

            _context.SaveChanges();
            return RedirectToPage("/Index");
        }

        public IActionResult OnPostDelete(int id)
        {
            var entity = _context.Password.FirstOrDefault(x => x.Id == id);
            _context.Password.Remove(entity);
            _context.SaveChanges();
            return RedirectToPage("/Index");
        }

    }
}