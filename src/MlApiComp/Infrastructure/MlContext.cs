using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MlApiComp.Models;

namespace MlApiComp.Infrastructure
{
    public class MlContext:DbContext
    {
        public MlContext(DbContextOptions<MlContext> options) : base(options)
        {
        }

        public DbSet<MlFile> Files { get; set; }
    }
}
