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

        public class SortData
        {
            public List<OrderData> Sort()
            {
                var falseStateOrders = _orderDataList2.Where(o => o.State == false).ToList();
                var trueStateOrders = _orderDataList2.Where(o => o.State == true).ToList();

                var sortedOrders = falseStateOrders.Concat(trueStateOrders).ToList();
                return sortedOrders;
            }
        }

        [HttpGet]
        public IActionResult GetAllOrderData()
        {
            try
            {
                var sortData = new SortData();
                var sortedOrders = sortData.Sort();

                Debug.Print("hey I'mhere");
                return Ok(sortedOrders);
                
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderDataById(int id)
        {
            try
            {

                var order = _orderDataList2.FirstOrDefault(o => o.Id == id);

                if (order == null)
                {

                    return NotFound();
                }


                return Ok(order);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



        [HttpPost]
        public IActionResult Post([FromBody] OrderData data)
        {
            try
            {

                var order = new OrderData
                {
                    Id = _nextId++,
                    User = data.User,
                    list_ordered = data.list_ordered,
                    Total = data.Total,
                    State = data.State
                };


                _orderDataList2.Add(order);


                return Ok(order);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id)
        {
            try
            {

                var order = _orderDataList2.FirstOrDefault(o => o.Id == id);
                Debug.WriteLine("hi");
                if (order == null)
                {

                    return NotFound();
                }


                order.State = true;


                return Ok(order);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

    }
}
