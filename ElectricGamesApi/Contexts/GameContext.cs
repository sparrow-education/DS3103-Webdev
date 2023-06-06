// GameContext is a translator between Model class and Database
// GameContext also defines Entity in SQLite
// Model(.NET C#)(Controller) => ----data(GameContext)----> Database(SQLite)


// Minimize likelihood for runtime to throw System.NullReferenceException
#nullable disable

// SQLite package, DbContext
using Microsoft.EntityFrameworkCore;

namespace ElectricGamesApi.Models;

public class GameContext : DbContext
{
    // Constructor for class GameContext with context configurations as parameter as type base
    public GameContext( DbContextOptions<GameContext> options ) : base( options ) {}

    // DbSet set Game as entity / table in SQLite
    // In theory DbSet<Game> should work, but for safety purposes
    public DbSet<ElectricGamesApi.Models.Game> Game { get;set; } 
}
