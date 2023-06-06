// Making a contract for Game, defining default implementation for members
namespace ElectricGamesApi.Interfaces;

public interface IGame
{
    int Id { get; set; }
    string Title { get; set; }
    string Platform { get; set; }
    int ReleaseYear {get;set;}
    string GameImageURL { get; set; }
}
