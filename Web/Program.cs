using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Compact;
using Web.Infrastructure.EfCore.Repositories.Abstract;
using Web.Infrastructure.EfCore.Repositories.Concrete;
using Web.Models;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var connectionString = configuration.GetConnectionString("DefaultConnection");

// Configure Serilog
// Configuring Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug() // Minimum log level set to debug
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning) // Overriding log level of Microsoft to Warning
    .Enrich.FromLogContext()
    .WriteTo.Console() // Writing logs to console
    .WriteTo.File(new CompactJsonFormatter(), Path.Combine(Directory.GetCurrentDirectory(), "logs", "log.json")) 
    .WriteTo.PostgreSQL(connectionString: connectionString, tableName: "logs", needAutoCreateTable: false, schemaName: "public")
    .CreateLogger();

builder.Host.UseSerilog(); // Uses Serilog for logging.
Serilog.Debugging.SelfLog.Enable(Console.Error); // Enable self logging of Serilog (useful for debugging Serilog itself)
builder.Services.AddSingleton<PythonScriptService>();
// Add services to the container.
builder.Services.AddRazorPages();
// Add services to the container.
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseSerilogRequestLogging(); // Use Serilog for request logging

app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();
app.Run();