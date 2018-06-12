using System;
using System.Collections.Generic;
using System.Text;
using MlApiComp.Services;
using Xunit;

namespace MlApiCompTests
{
    public class MathServiceTests
    {
        public static IEnumerable<object[]> MaxValidValues
        {
            get
            {
                return new List<object[]>
                {
                    new object[] { new int[] { 1, 2 }, 2 },
                    new object[] { new int[] { 4 }, 4 },
                    new object[] { new int[] { 5, 0, int.MaxValue }, int.MaxValue },
                    new object[] { new int[] { -1, -2, -4, -9 }, -1 },
                };
            }
        }

        public static IEnumerable<object[]> MaxInvalidValues
        {
            get
            {
                return new List<object[]>
                {
                    new object[] { new int[] { } },
                    new object[] { null }
                };
            }
        }

        MathService service = new MathService();


        [Theory]
        [InlineData(0, 1)]
        [InlineData(1, 1)]
        [InlineData(2, 2)]
        [InlineData(3, 6)]
        public void Factorial_n_is_valid(int n, int expectedResult)
        {
            // Arrange

            // Act
            int result = service.Factorial(n);

            // Assert
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(-2)]
        public void Factorial_n_is_negative_(int n)
        {
            // Arrange

            // Act
            ArgumentException exception = Assert.Throws<ArgumentException>(()=> service.Factorial(n));

            // Assert
            Assert.Contains("n argument must be greather or equal to 0", exception.Message);
            Assert.Equal("n", exception.ParamName);
        }

        [Theory]
        [MemberData("MaxValidValues")]
        public void Max_valid_values_returns_max(int[] list, int expectedMax)
        {

            int actualMax = service.Max(list);

            Assert.Equal(expectedMax, actualMax);
        }

        [Theory]
        [MemberData("MaxInvalidValues")]
        public void Max_invalid_values_returns_max(int[] list)
        {

            // TODO: Fix test
            Exception e = Assert.Throws<Exception>(()=> service.Max(list));
        }
    }
}
