using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MlApiComp.Controllers
{
    [Route("api/demo")]
    public class DemoController: Controller
    {
        // Access me by typing http://yourhost:port/api/demo/helloworld?message=yourmessage E.g. http://localhost:26497/api/demo/helloworld?message=Bob

        [Route("helloworld")]
        public IActionResult HelloWorld(string message)
        {
            return Ok("Hello world! " + message);
        }
    }
}
