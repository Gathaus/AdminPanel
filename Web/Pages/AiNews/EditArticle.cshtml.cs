using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Web.Infrastructure.EfCore.Repositories.Abstract;
using Web.Models;

namespace Web.Pages.AiNews;

public class EditArticle : PageModel
{
    private readonly IUnitOfWork _unitOfWork;
    public EditArticle(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public Article Article { get; set; }
    
    
    public async Task<IActionResult> OnGetAsync(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        Article = await _unitOfWork.Repository<Article>().GetByIdAsync(id);

        if (Article == null)
        {
            return NotFound();
        }
        return Page();
    }
}