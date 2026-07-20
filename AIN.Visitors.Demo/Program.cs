using System;
using System.Threading.Tasks;
using AIN.Visitors.Mrz.Scanners;

namespace AIN.Visitors.Demo
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("=== Testing Mock Document Scanner (Wesam's Contract) ===");

            var scanner = new MockDocumentScanner();

            Console.WriteLine("\n[System] UI is waiting for user to insert document...\n");

            var document = await scanner.ScanAsync();

            if (document != null && document.IsSuccess)
            {
                Console.WriteLine("\n=== Extracted Document Data ===");
                Console.WriteLine($"Surname: {document.Data?.Surname}");
                Console.WriteLine($"Given Names: {document.Data?.GivenNames}");
                Console.WriteLine($"Document Number: {document.Data?.DocumentNumber}");
                Console.WriteLine($"Nationality: {document.Data?.Nationality}");
                Console.WriteLine($"Validation Status: {document.Evidence?.ValidationStatus}");
                Console.WriteLine("===============================\n");
            }
            else
            {
                Console.WriteLine("Failed to scan document or validation failed.");
            }
        }
    }
}