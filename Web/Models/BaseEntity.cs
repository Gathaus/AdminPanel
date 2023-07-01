using Web.Infrastructure.EfCore.Repositories.Abstract;

namespace Web.Models;

public class BaseEntity :IEntity
{
    public int Id { get; set; }
    public int? ModifiedById { get; set; }
    public int? CreatedById { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }

    public bool IsDeleted { get; set; }
}