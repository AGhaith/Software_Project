using LocalBrandFinder.API.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Add API services
builder.Services.AddApiServices(builder.Configuration);

var app = builder.Build();

// Use CORS early in the pipeline
app.UseCors("AllowAll");

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

app.Run();
