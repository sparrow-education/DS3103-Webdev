// Making a contract for GameCharacter, defining default implementation for members
namespace ElectricGamesApi.Interfaces;

public interface IGameCharacter
{
    int Id { get; set; }
    string Name { get; set; }
    string Game { get; set; }
    string ImageURL { get; set; }
}