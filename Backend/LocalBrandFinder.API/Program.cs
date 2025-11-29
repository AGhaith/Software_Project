using LocalBrandFinder.API.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()    // or .WithOrigins("https://your-frontend.com")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Add API services
builder.Services.AddApiServices(builder.Configuration);

var app = builder.Build();
app.UseApiDocumentation();

app.UseHttpsRedirection();
app.MapControllers();
app.Lifetime.ApplicationStarted.Register(() =>
{
    Console.ForegroundColor = ConsoleColor.White;
    Console.WriteLine("\nApplication started successfully.\n");
    Console.ResetColor();

    foreach (var address in app.Urls)
    {
        Console.ForegroundColor = ConsoleColor.White;
        Console.Write("Now listening on: ");
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine(address);

        Console.ForegroundColor = ConsoleColor.White;
        Console.Write("Scalar UI: ");
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine($"{address}/scalar/v1\n");

        Console.ResetColor();
    }
});
//  Add this BEFORE app.MapControllers()
app.UseCors("AllowAll");

app.MapControllers();

app.Run();
