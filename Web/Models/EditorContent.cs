using Web.Infrastructure.EfCore.Repositories.Concrete;

namespace Web.Models;

public class EditorContent: BaseEntity
{
    public int Id { get; set; }

    public string Content { get; set; }
}
