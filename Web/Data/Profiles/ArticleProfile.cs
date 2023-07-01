using AutoMapper;
using Web.Models;

namespace Web.Data.Profiles;

public class ArticleProfile : Profile
{
    public ArticleProfile()
    {
        CreateMap<Article, Article>()
            .ForMember(dest => dest.Id, act => act.Ignore())
            .ForMember(dest => dest.CreatedDate, act => act.Ignore())
            .ForMember(dest => dest.UpdatedDate, act => act.Ignore())
            .ForMember(dest => dest.Status, act => act.Ignore());
    }
}