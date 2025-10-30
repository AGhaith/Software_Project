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

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "LocalBrandFinder API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

//  Add this BEFORE app.MapControllers()
app.UseCors("AllowAll");

app.MapControllers();

app.Run();
