using System.ComponentModel.DataAnnotations;

using ElectricGamesApi.Interfaces;

namespace ElectricGamesApi.Models;

public class GameCharacter : IGameCharacter
{
    [Key]
    public int Id {get; set;}
    public string Name {get; set;} = "";
    public string Game {get; set;} = "";
    public string ImageURL {get; set;} = "";    
}