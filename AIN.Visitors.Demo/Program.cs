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

            using var document = await scanner.ScanAsync();

            if (document != null && document.IsSuccess)
            {
                Console.WriteLine("\n=== Extracted Document Data ===");
                Console.WriteLine($"Name (EN): {document.FullNameEnglish}");
                Console.WriteLine($"Name (AR): {document.FullNameArabic}");
                Console.WriteLine($"National ID: {document.NationalID}");
                Console.WriteLine($"Raw MRZ:\n{document.RawMrzData}");
                Console.WriteLine("===============================\n");
            }
            else
            {
                Console.WriteLine("Failed to scan document.");
            }
        }
    }
}