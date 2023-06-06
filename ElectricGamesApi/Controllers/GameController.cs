// A Controller is a C# class that controls the way a user interacts with an Model-View-Control app.
// Controllers are the gateway to Database layer in Backend 
// Controllers do operates on CRUD functions taking HTTP request from FrontEnd 


#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectricGamesApi.Models;

namespace ElectricGamesApi.Controllers;

// Annotates this is a MVC controller
// Route is the definition of HTTP access to this controller, in this case .../api/Game
// The class name need the suffix 'Controller'
[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    // Preparing for Dependency Injection pattern - declaring GameContext to readonly (Scope)
    private readonly GameContext context;
    // Dependency Injection, loose coupling - GameController class constructor is dependent on injection from external resource
    // The GameContext which is a DAO - Data Access Object is being sent to this construct in order to use context
    // TL;DR Avoiding type coupling to hard code reference
    public GameController( GameContext _context )
    {
        context = _context;
    }

    // Instantiate API fillers simulating a database for test
    private List<Game> games = new List<Game>
    {
        new Game { Id = 1000, Title = "Modern Warfare 2", Platform = "PC", ReleaseYear = 2022, GameImageURL = "1.jpg"}
    };


    // Creating Endpoints - The CRUD methods
    [HttpGet("[action]")]
    // "[action]" having action defined inside annotation refers to method - GetAllCharacters()
    // A get function that returns a collection of class Game with Task-based operation
    // that executes asynchronously from main thread. 
    // The operation is a class ActionResult that returns the result of the process. 
    public async Task< ActionResult<List<Game>> > GetAllGames()
    {
        try
        {
            // Method ToListAsync is a method of IQueryable that evaluate queries from database entity 'Game'
            // and returns a List of elements from the input sequence.
            // Using 'await' to ensure asynchronous operation is completed before return
            List<Game> games = await context.Game.ToListAsync();
            // HTTP response message 👍
            return Ok( games );
        }
        catch
        {
            // HTTP response message - server side error 👎
            return StatusCode(500); 
        }
    }


    // Endpoint for Get request with id as parameter ..api/Game/id
    // Having annotation Route will - create url to show method name and query parameter
    [HttpGet]
    [Route("[action]/{id}")]
    public async Task< ActionResult<Game> > GetById( int id )
    {
        Game game = await context.Game.FindAsync( id );

        if( game != null)
        {
            return Ok( game );
        }
        else
        {
            return NotFound(404);
        }
    }


    // Endpoint for Get request with name as third Get method with help of Route to identify this [HttpGet]
    // The URL will be in this fashion: https://localhost:7xxx/api/Game/GetByName/title
    // https://localhost:7xxx = domain
    // api/Game               = controller
    // GetByName              = method 
    // title                  = parameter
    [HttpGet]
    [Route("[action]/{title}")]
    public async Task< IEnumerable<Game> > GetByName( string title )
    {
        var allGames = await context.Game.ToListAsync();
        if( allGames != null )
        {
            return allGames.Where( _title => _title.Title.Contains( title ) );
        }
        else
        {
            return null;
        }
    }


    // Endpoint for Post request with Game object as parameter
    [HttpPost]
    [Route("[action]")]
    public async Task< IActionResult > Post( Game newGame )
    {
        try
        {   
            // Try to add the instance and save the change in database
            // Returns a response 201 if succeeded creating a new instance
            context.Game.Add( newGame );
            await context.SaveChangesAsync();
            
            // This gave me a headache as the method will cause code 500
            // Object is successfully sent to database but returns error.
            // According to Microsoft using method with suffix Async is obsolete or
            // as they say "undesirable" 
            // Documentation recommends using configuration at startup to suppress this suffix
            // However this does not work where I added one line in Program.cs under builder.
            // Solution to this was changing the action to "Post" versus "Get"
            // https://learn.microsoft.com/en-us/dotnet/core/compatibility/aspnetcore#mvc-async-suffix-trimmed-from-controller-action-names
            // https://stackoverflow.com/questions/69722872/asp-net-core-6-how-to-access-configuration-during-startup

            return CreatedAtAction(nameof(GetById), new {id = newGame.Id}, newGame);
        }
        catch
        {
            return StatusCode(500);
        }
    }


    // Endpoint for Put request with Game object as parameter
    [HttpPut]
    [Route("[action]")]
    public async Task< IActionResult > Put( Game editedGame )
    {
        try
        {
            // Try to find the instance and save the change in database
            // Creating access to given entity and save the change
            // Returns a response 204 if succeeded altered an instance
            context.Entry(editedGame).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }


    // Endpoint for Delete request with id as parameter
    [HttpDelete]
    [Route("[action]/{id}")]
    public async Task<IActionResult> Delete( int id )
    {
        Game gameToDelete = await context.Game.FindAsync( id );

        try
        {
            if (gameToDelete != null)
            {
                context.Game.Remove(gameToDelete);
                await context.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound(404);
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }
}

