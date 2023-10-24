using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text;
using System.Text.Json;

namespace miniprojectweb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class APIPastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Scorching"
    };

        private readonly ILogger<APIPastController> _logger;

        public APIPastController(ILogger<APIPastController> logger)
        {
            _logger = logger;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            string output = "hi mtf";

            var data = new { key1 = "value1", key2 = "kuay rai" };
            var json = JsonSerializer.Serialize(data);
            return Content(json, "application/json");
        }

        [HttpPost]
        public IActionResult ReceiveData([FromBody] object data)
        {
            Debug.WriteLine("in");
            // Handle the POST data here
            _logger.LogInformation("Received data: {data} Hi", data);

            // You can process the data and return a response if needed
            return Ok("Data received successfully");
        }
    }
}