using System.Collections.Concurrent;
using System.Diagnostics;
using System.IO;
using Microsoft.Extensions.Logging;

public class PythonScriptService
{
    public ConcurrentDictionary<string, Process> RunningScripts { get; private set; }
    private readonly ILogger _logger;

    public PythonScriptService(ILogger<PythonScriptService> logger)
    {
        RunningScripts = new ConcurrentDictionary<string, Process>();
        _logger = logger;
    }

    public string RunPythonScript(string scriptName)
    {
        var start = new ProcessStartInfo
        {
            FileName = "python",
            Arguments = string.Format("{0}.py", scriptName),
            UseShellExecute = false,
            RedirectStandardOutput = true,
            CreateNoWindow = true
        };

        using (Process process = Process.Start(start))
        {
            string scriptId = Guid.NewGuid().ToString();
            RunningScripts.TryAdd(scriptId, process);

            using (StreamReader reader = process.StandardOutput)
            {
                string result = reader.ReadToEnd();
                // Log the output using ILogger
                _logger.LogInformation("Python script output: {Output}", result);
                return scriptId;
            }
        }
    }

    public bool CancelPythonScript(string scriptId)
    {
        if (RunningScripts.TryRemove(scriptId, out var process))
        {
            process.Kill();
            // Log that script was cancelled using ILogger
            _logger.LogInformation($"Script {scriptId} was cancelled");
            return true;
        }
        return false;
    }
}