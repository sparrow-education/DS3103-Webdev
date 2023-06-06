// Annotate member Id as PK
using System.ComponentModel.DataAnnotations;

// Using declared contract
using ElectricGamesApi.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ElectricGamesApi.Models;


public class Game : IGame
{
    [Key]
    // Id is the PK for Database (SQLite has rowId which auto increment for each added entity)
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Platform { get; set; } = "";
    public int ReleaseYear { get; set; }
    public string GameImageURL { get; set; } = "";

    public static implicit operator Game(EntityEntry<Game> v)
    {
        throw new NotImplementedException();
    }
}