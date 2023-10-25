using Microsoft.AspNetCore.Mvc;
using miniprojectweb.Models;
using System.Diagnostics;
using System.Net;
//using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace miniprojectweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Management : ControllerBase
    {
        private static int _nextId = 2;
        private List<OrderData> _orderDataList = new List<OrderData>();
        private static List<OrderData> _orderDataList2 = new List<OrderData>
{       
    new OrderData
    {
        Id = 1,
        User = new User
        {
            Name = "sarawut",
            Tel = "0925402852",
            Address = "24/1 moo 5 maphong panthong chonburi"
        },
        list_ordered = new List<Ordered>
        {
            new Ordered
            {
                Name = "ร้าน P&A",
                Food = "กะเพราหมูกรอบโบราณ",
                Price = 65,
                Amount = 1,
                Textarea = "ไม่ใส่กะเพรา"
            },
            new Ordered
            {
                Name = "ร้านน้ำ",
                Food = "น้ำแดงโซดา",
                Price = 40,
                Amount = 2,
                Textarea = "No vegetable"
            }
        },
        Total = 145,
        State = false
    }
};
        
        /*
        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // Replace this with code to fetch your OrderData object based on the provided 'id'
            OrderData orderData = GetOrderDataById(id);

            if (orderData == null)
            {
                return NotFound(); // Return a 404 Not Found if the data is not found
            }

            return Ok(orderData); // Return the OrderData object as JSON
        }

        // Your other controller methods here */

        // Example method to fetch OrderData by ID (replace with your actual data retrieval logic)

        [HttpGet]
        public IActionResult GetAllOrderData()
        {
            try
            {
                // Return a success response with the list of orders
                Debug.Print("hey I'mhere");
                return Ok(_orderDataList2);
                
            }
            catch (Exception ex)
            {
                // Return an error response with the error message
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderDataById(int id)
        {
            try
            {
                // Find the order with the specified ID in the list of orders
                var order = _orderDataList2.FirstOrDefault(o => o.Id == id);

                if (order == null)
                {
                    // Return a not found response if the order is not found
                    return NotFound();
                }

                // Return a success response with the order object
                return Ok(order);
            }
            catch (Exception ex)
            {
                // Return an error response with the error message
                return BadRequest(ex.Message);
            }
        }



        [HttpPost]
        public IActionResult Post([FromBody] OrderData data)
        {
            try
            {
                // Create a new order object with the parsed data
                var order = new OrderData
                {
                    Id = _nextId++,
                    User = data.User,
                    list_ordered = data.list_ordered,
                    Total = data.Total,
                    State = data.State
                };

                // Add the order to the list of orders
                _orderDataList2.Add(order);

                // Return a success response with the new order object
                return Ok(order);
            }
            catch (Exception ex)
            {
                // Return an error response with the error message
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id)
        {
            try
            {
                // Find the order with the specified ID in the list of orders
                var order = _orderDataList2.FirstOrDefault(o => o.Id == id);
                Debug.WriteLine("hi");
                if (order == null)
                {
                    // Return a not found response if the order is not found
                    return NotFound();
                }

                // Update the state of the order
                order.State = true;

                // Return a success response with the updated order object
                return Ok(order);
            }
            catch (Exception ex)
            {
                // Return an error response with the error message
                return BadRequest(ex.Message);
            }
        }

    }
}
