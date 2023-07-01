using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

public class ExternalFileController : BaseController
{
    private readonly PythonScriptService _pythonScriptService;
    private readonly ILogger<ExternalFileController> _logger;

    public ExternalFileController(PythonScriptService pythonScriptService, ILogger<ExternalFileController> logger)
    {
        _pythonScriptService = pythonScriptService;
        _logger = logger;
    }

    [HttpGet("run/{scriptName}")]
    public IActionResult RunPythonScript(string scriptName)
    {
        try
        {
            var scriptId = _pythonScriptService.RunPythonScript(scriptName);
            _logger.LogInformation("Script with ID {ScriptID} started successfully", scriptId);
            return Ok(scriptId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while running script {ScriptName}", scriptName);
            return StatusCode(500, "An error occurred while running the script.");
        }
    }

    [HttpGet("cancel/{scriptId}")]
    public IActionResult CancelPythonScript(string scriptId)
    {
        try
        {
            if (_pythonScriptService.CancelPythonScript(scriptId))
            {
                _logger.LogInformation("Script with ID {ScriptID} cancelled successfully", scriptId);
                return Ok();
            }
            else
            {
                _logger.LogWarning("No matching script with ID {ScriptID} was found", scriptId);
                return NotFound();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while cancelling script with ID {ScriptID}", scriptId);
            return StatusCode(500, "An error occurred while cancelling the script.");
        }
    }
}