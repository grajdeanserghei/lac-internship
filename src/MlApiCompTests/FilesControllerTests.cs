using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MlApiComp.Controllers;
using MlApiComp.Infrastructure;
using Moq;
using Xunit;

namespace MlApiCompTests
{
    public class FilesControllerTests
    {
        [Fact]
        public void Post_NullFile_ReturnsBadRequest()
        {
            // Arrange
            var context = GetDbContext();
            FilesController controller = new FilesController(context);

            // Act
            IActionResult result = controller.Post(null);

            // Assert
            Assert.NotNull(result);
            var badResult = Assert.IsType<BadRequestObjectResult>(result);
            var message = Assert.IsType<string>(badResult.Value);
            Assert.Equal("You must upload a file with key <file>!", message);
        }

        [Fact]
        public void Post_ValidFile_ReturnsOk()
        {
            // Arrange
            var context = GetDbContext();
            FilesController controller = new FilesController(context);

            var mockFile = new Mock<IFormFile>();
            IFormFile file = mockFile.Object;

            mockFile
                .Setup(x => x.OpenReadStream())
                .Returns(new MemoryStream());

            // Act
            IActionResult result = controller.Post(file);

            // Assert
            Assert.NotNull(result);

            // TODO: assert CreatedResult is valid 
        }

        [Fact]
        public void Post_ValidFile_SavesFile()
        {
            // Arrange
            MlContext context = GetDbContext();
            FilesController controller = new FilesController(context);

            const string fileName = "test.pdf";
            var mockFile = new Mock<IFormFile>();
            IFormFile file = mockFile.Object;

            mockFile.Setup(x => x.FileName).Returns(fileName);

            mockFile
                .Setup(x => x.OpenReadStream())
                .Returns(new MemoryStream());

            // Act
            controller.Post(file);

            // Assert
            var entityFile = context.Files.FirstOrDefault();
            Assert.NotNull(entityFile);
            Assert.Equal(fileName, entityFile.Name);

            // TODO: assert data bytes 
        }

        private MlContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<MlContext>()
                .UseInMemoryDatabase()
                .Options;

            return new MlContext(options);
        }
    }
}
