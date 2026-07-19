using Xunit;
using System;
using System.Threading.Tasks;
using AIN.Visitors.Mrz.Scanners;
using AIN.Visitors.Mrz.Models;

namespace AIN.Visitors.Mrz.Tests
{
    public class MrzComprehensiveTests
    {
        [Fact]
        public async Task Test_Success_Scenario()
        {
            var mockScanner = new MockDocumentScanner();
            var result = await mockScanner.ScanAsync();
            Assert.NotNull(result);
            Assert.NotNull(result.RawData);
        }

        [Fact]
        public async Task MockScanner_ShouldSupportFailureScenarios()
        {
            var mockScanner = new MockDocumentScanner();
            
            mockScanner.Scenario = MockScenario.HardwareFailure;
            await Assert.ThrowsAsync<Exception>(() => mockScanner.ScanAsync());

            mockScanner.Scenario = MockScenario.Timeout;
            await Assert.ThrowsAsync<TimeoutException>(() => mockScanner.ScanAsync());

            mockScanner.Scenario = MockScenario.ScannerUnavailable;
            await Assert.ThrowsAsync<InvalidOperationException>(() => mockScanner.ScanAsync());

            mockScanner.Scenario = MockScenario.Cancellation;
            await Assert.ThrowsAsync<OperationCanceledException>(() => mockScanner.ScanAsync());
        } // تم إغلاق هذا التابع بقوس صحيح

        [Fact]
        public async Task Test_Invalid_Mrz_Scenario()
        {
            var mockScanner = new MockDocumentScanner();
            mockScanner.Scenario = MockScenario.InvalidMrz;
            var result = await mockScanner.ScanAsync();
            
            Assert.NotNull(result);
            Assert.NotNull(result.RawData);
            Assert.Contains("INVALID", result.RawData.GetRawData());
        } // تم إغلاق هذا التابع بقوس صحيح
    }
}