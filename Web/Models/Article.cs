using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Mime;
using Web.Infrastructure.EfCore.Repositories.Concrete;

namespace Web.Models;

public class Article: BaseEntity
{
    public string Content { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public string? Tags { get; set; }
    public string? Author { get; set; }
    public string? SeoKeywords { get; set; }
    public StatusEnum Status { get; set; } = StatusEnum.Draft;

    [NotMapped]
    public string? FormattedCreatedDate { get; set; }
    [NotMapped]
    public string? FormattedUpdatedDate { get; set; }
    [NotMapped]
    public string? StatusStr { get; set; }

}
