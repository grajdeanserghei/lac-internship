using System;
using Xunit;

namespace MlApiCompTests
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            int expected = 5;

            int result = 2 + 1;

            Assert.Equal(expected, result);
        }
    }
}
