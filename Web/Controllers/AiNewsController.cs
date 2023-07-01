using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Web.Infrastructure.EfCore.Repositories.Abstract;
using Web.Models;

namespace Web.Controllers;

public class AiNewsController : BaseController
{
    private readonly IHostedService _aiNewsscrapingService;
    private readonly ILogger<AiNewsController> _logger;

    public AiNewsController(IUnitOfWork unitOfWork, IMapper mapper, IHostedService aiNewsscrapingService,
        ILogger<AiNewsController> logger) : base(unitOfWork, mapper)
    {
        _aiNewsscrapingService = aiNewsscrapingService;
        _logger = logger;
    }


    [HttpPost("AddArticle")]
    public IActionResult AddArticle([FromForm] Article model)
    {
        try
        {
            _logger.LogInformation("Attempting to add {Title} to database", model.Title);

            _unitOfWork.Repository<Article>().Add(model);
            _unitOfWork.SaveChanges();

            _logger.LogInformation("{Title} was successfully added to database", model.Title);
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while adding {Title} to the database", model.Title);
            return StatusCode(500, "An error occurred while adding the article.");
        }
    }

    [HttpPost("UpdateArticle")]
    public async Task<IActionResult> UpdateArticle([FromForm] Article model)
    {
        try
        {
            _logger.LogInformation("Attempting to update {Title}", model.Title);

            var article = await _unitOfWork.Repository<Article>().GetByIdAsync(model.Id);
            if (article != null)
            {
                _mapper.Map(model, article);
                _unitOfWork.Repository<Article>().Update(article);
                await _unitOfWork.SaveChangesAsync();

                _logger.LogInformation("{Title} was successfully updated", model.Title);
                return Ok();
            }

            _logger.LogWarning("No matching article found for {Title}", model.Title);
            return NotFound();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while updating {Title}", model.Title);
            return StatusCode(500, "An error occurred while updating the article.");
        }
    }
}