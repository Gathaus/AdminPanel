using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

public class AiNews : ControllerBase
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}