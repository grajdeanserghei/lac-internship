using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MlApiComp.Services
{
    public class MathService
    {
        public int Counter { get; private set; }

        /// <summary>
        /// 3! = 3 x 2 x 1; 
        /// </summary>
        /// <param name="n"></param>
        /// <returns></returns>
        public int Factorial(int n)
        {
            Counter++;

            if(n < 0)
            {
                throw new ArgumentException("n argument must be greather or equal to 0", "n");
            }

            int result = 1;

            for(int i = 1; i<=n; i++)
            {
                result *= i;
            }

            return result;
        }

        public int Max(int[] list)
        {
            if (list == null)
            {
                throw new ArgumentNullException("list");
            }

            if (list.Length == 0)
            {
                throw new ArgumentException("List must contains at least one lement", "list");
            }

            int max = list[0];

            for(int i =1; i<list.Length; i++)
            {
                if(max < list[i])
                {
                    max = list[i];
                }
            }

            return max;
        }
    }
}
