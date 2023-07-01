using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Web.Infrastructure.EfCore.Repositories.Abstract;
using Web.Models;

namespace Web.Pages.AiNews
{
    public class ArticlesModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;

        public ArticlesModel(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public List<Article> ArticleTableData { get; set; }


        public async Task OnGet()
        {
            var data = await _unitOfWork.Repository<Article>().FindBy().ToListAsync();
            foreach (var article in data)
            {
                article.CreatedDate = TimeZoneInfo.ConvertTimeFromUtc(article.CreatedDate,
                    TimeZoneInfo.FindSystemTimeZoneById("Turkey Standard Time"));
                article.FormattedCreatedDate = article.CreatedDate.ToString("dd.MM.yyyy HH:mm");
                if (article.UpdatedDate is not null)
                {
                    article.UpdatedDate = TimeZoneInfo.ConvertTimeFromUtc(article.UpdatedDate.Value,
                        TimeZoneInfo.FindSystemTimeZoneById("Turkey Standard Time"));
                    article.FormattedUpdatedDate = article.UpdatedDate.Value.ToString("dd.MM.yyyy HH:mm");
                }

                article.StatusStr = Enum.GetName(typeof(StatusEnum), article.Status);
            }
            ArticleTableData = data;
        }
    }
}