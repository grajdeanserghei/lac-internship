using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MlApiComp.Services
{
    public class MathService
    {
        /// <summary>
        /// 3! = 3 x 2 x 1; 
        /// </summary>
        /// <param name="n"></param>
        /// <returns></returns>
        public int Factorial(int n)
        {
            int result = 1;

            for(int i = 1; i<=n; i++)
            {
                result *= i;
            }

            return result;
        }
    }
}
