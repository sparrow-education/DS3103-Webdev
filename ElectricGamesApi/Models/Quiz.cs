using System.ComponentModel.DataAnnotations;

using ElectricGamesApi.Interfaces;

namespace ElectricGamesApi.Models;

public class Quiz : IQuiz
{
    [Key]

    public int Id {get;set;}
    public string Question1 {get;set;} = "";
    public string Question2 {get;set;} = "";
    public string Question3 {get;set;} = "";
    public string Question4 {get;set;} = "";
    public string Answer {get;set;} = "";
}