namespace ElectricGamesApi.Interfaces;

public interface IQuiz
{
    int Id {get; set;}
    string Question1 {get; set;}
    string Question2 {get; set;}
    string Question3 {get; set;}
    string Question4 {get; set;}
    string Answer {get; set;}
}