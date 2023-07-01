using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Web.Models;

namespace Web.Data.Configurations;

public class ArticleConfiguration : IEntityTypeConfiguration<Article>
{
    public void Configure(EntityTypeBuilder<Article> builder)
    {
        builder.HasData(new List<Article>()
        {
            new Article()
            {
                Id = 1,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title",
                Status = StatusEnum.Draft
            },
            new Article()
            {
                Id = 2,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title",
                Status = StatusEnum.Draft
            },
            new Article()
            {
                Id = 3,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title",
                Status = StatusEnum.Published
            },
            new Article()
            {
                Id = 4,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title",
                Status = StatusEnum.Published
            },
            new Article()
            {
                Id = 5,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title",
                Status = StatusEnum.Deleted
            },
            new Article()
            {
                Id = 6,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title",
                Status = StatusEnum.Deleted
            },
            new Article()
            {
                Id = 7,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title"
            },
            new Article()
            {
                Id = 8,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title"
            },
            new Article()
            {
                Id = 9,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title"
            },
            new Article()
            {
                Id = 10,
                Author = "Admin",
                Content = "Content",
                Description = "Description",
                SeoKeywords = "SeoKeywords",
                Tags = "Tags",
                Title = "Title"
            },
        });
    }
}