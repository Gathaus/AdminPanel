namespace Web.Infrastructure.EfCore.Repositories.Abstract;

public interface IHelperModel
{
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
}