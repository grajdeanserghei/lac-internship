using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MlApiComp.Models
{
    public class MlFile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Content { get; set; }
    }
}
