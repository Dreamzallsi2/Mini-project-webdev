using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using miniprojectweb.Models;
using System.Text;

namespace miniprojectweb.Controllers
{
    public class HomeController : Controller
    {




        // GET: HomeController
        public ActionResult Index()
        {
            string help;
            help = "Hi you are in";
            return Content(help, "text/plain", Encoding.UTF8);
        }

        // GET: HomeController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }
        
        // GET: HomeController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: HomeController/Create
        /*
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([FromBody] Order order)
        {
            try
            {
                // Save the order to the database or perform other actions as needed
                // ...

                // Return a success response with the new order object
                return Ok(order);
            }
            catch (Exception ex)
            {
                // Return an error response with the error message
                return BadRequest(ex.Message);
            }
        }*/

        // GET: HomeController/Edit/5
        public ActionResult Edit(int id)
        {
            string help;
            help = Convert.ToString(id);
            return Content(help, "text/plain",Encoding.UTF8);
        }

        // POST: HomeController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: HomeController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: HomeController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
