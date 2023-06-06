using Microsoft.AspNetCore.Mvc;

namespace ElectricGamesApi.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UploadImageController : ControllerBase
{
    private readonly IWebHostEnvironment hosting;

    // Dependency injection - provides info about web hosting environment this app 
    public UploadImageController(IWebHostEnvironment _hosting)
    {
        hosting = _hosting;
    }


    // HTTP POST method for uploading a file to static folder wwwroot inside a folder name images
    // The async function is accepting IFormFile that represents the file object
    [HttpPost]
    public async Task< IActionResult > UploadImage( IFormFile file )
    {
        try
        {
            string wwwrootPath = hosting.WebRootPath;
            string absolutePath = Path.Combine($"{wwwrootPath}/images/{file.FileName}");

            // FileStream is a class to read input - we defined the absolute path and mode for creation of file
            await using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                // Copy the file object that contains the image, into fileStream that creates a new copy to the absolute path we defined
                file.CopyTo(fileStream);
            }
            return Ok(200);
        }
        catch
        {
            return StatusCode(500);
        }
    }
}