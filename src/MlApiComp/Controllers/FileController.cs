using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MlApiComp.Infrastructure;
using MlApiComp.Models;

namespace MlApiComp.Controllers
{
    [Produces("application/json")]
    [Route("api/File")]
    public class FilesController : Controller
    {
        private readonly MlContext dbContext;

        public FilesController(MlContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var file = dbContext.Files.Find(id);
            if (file == null)
            {
                return NotFound("File does not exist!!"); 
            }
            return Ok(file);
        }

        [HttpPost]
        public IActionResult Post(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("You must upload a file with key <file>!");
            }

            using (var fileStream = file.OpenReadStream())
            {
                using (var memoryStream = new MemoryStream())
                {
                    fileStream.CopyTo(memoryStream);
                    var fileModel = new MlFile();
                    fileModel.Content = memoryStream.ToArray();
                    fileModel.Name = file.Name;
                    dbContext.Add(fileModel);
                    dbContext.SaveChanges();
                    var fileUri = this.Url.Action(nameof(FilesController.Get), new { id = fileModel.Id });
                    return Created(fileUri, fileModel);
                }
            }
        }
    }
}