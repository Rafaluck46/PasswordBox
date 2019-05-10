using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PasswordBox.Pages
{
    [ApiController]
    [Route("/api/[controller]")]
    public class Upload : ControllerBase
    {
        [HttpPost]
        public void Create(byte[] file)
        {

        }
    }
}