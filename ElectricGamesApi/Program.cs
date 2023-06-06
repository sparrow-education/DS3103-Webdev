// Using GameContext + add SQLite package
using ElectricGamesApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Database registration with 3 cmd, add package, initial entity, update
// 1. dotnet add package Microsoft.EntityFrameworkCore.Design
// 2. dotnet ef migrations add InitialCreate
// 3. dotnet ef database update
builder.Services.AddDbContext<GameContext>( options => options.UseSqlite( "Data Source=MyGames.db" ) );

// Step 1 - OPEN UP API CORS
builder.Services.AddCors(
    // Granting access to this API
    options => {
        // Giving a logical name "AllowAll" to open this for public
        options.AddPolicy("AllowAll", 
            builder => builder
                .AllowAnyHeader() // Allowing Header information to be passed 
                .AllowAnyMethod() // Allowing CRUD operations
                .AllowAnyOrigin() // Allowing all domains
        );
    }
);

var app = builder.Build();
// Step 2 - Open CORS
app.UseCors("AllowAll");


// Step 3 - Configure index.html to be first page
DefaultFilesOptions options = new DefaultFilesOptions();
options.DefaultFileNames.Add("index.html");
app.UseDefaultFiles( options );

// Activate "wwwroot" folder to be static
app.UseStaticFiles();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
