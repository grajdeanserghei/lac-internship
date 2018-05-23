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

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var file = dbContext.Files.Find(id);
            if (file == null)
            {
                return NotFound("File does not exist!!"); 
            }
            return Ok(file);
        }

        [HttpGet]
        public IList<MlFile> GetAll()
        {
            return dbContext.Files.ToList();
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

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] MlFile file)
        {
            if (file == null || file.Id != id)
            {
                return BadRequest();
            }

            var existingFile = dbContext.Files.Find(id);
            if (existingFile == null)
            {
                return NotFound();
            }

            existingFile.AzureApiResult = file.AzureApiResult;
            existingFile.GoogleApiResult = file.GoogleApiResult;
            existingFile.Name = file.Name;

            dbContext.Files.Update(existingFile);
            dbContext.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var file = dbContext.Files.Find(id);
            if (file == null)
            {
                return NotFound();
            }

            dbContext.Files.Remove(file);
            dbContext.SaveChanges();
            return NoContent();
        }
    }
}