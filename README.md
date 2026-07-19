# AIN.Visitors.Mrz - Document MRZ Parsing Library (v2)

##  Overview
Final engineering acceptance gate (v2) release for AIN Visitors MRZ parsing library, compliant with 12 July 2026 blueprint requirements.

##  Prerequisites
- .NET 8.0 SDK
- Node.js (LTS version)

##  Build & Test Instructions

### For C#:
Open `AIN.Visitors.sln` in Visual Studio and run tests via Test Explorer, or run the following in the root directory:
```bash
dotnet restore
dotnet build
dotnet test
---------------------------------------------------

For TypeScript:
Bash
cd ain-visitors-mrz-ts
npm install
npm test


## Engineering Scope & Boundaries
AIN.Visitors.Mrz is a specialized engineering library designed toward ICAO 9303 compatibility for standardized Machine Readable Zone (MRZ) parsing and semantic validation of travel and identity documents (TD1, TD2, and TD3 formats).

Scope Boundary (Assignment Limits)
This component strictly handles:

MRZ parsing and normalization.

ICAO check-digit validation (Individual, Optional, and Composite).

Semantic and date resolution validation.

Shared data contracts and scanner abstractions (IDocumentScanner).

Deterministic mock scanner implementation.

Automated C# and TypeScript parity testing.

Out of Scope: This library does not implement QR token generation, QR rendering, One-Time Passwords (OTP), protected sessions, Privacy Receipt persistence, tenant regulatory profile decisions, or kiosk user interface screens.

🔐 Key Architectural & Security Implementations
Data Separation: ScanResult and NormalizedDocumentData are strictly separated from restricted raw artifacts (Raw MRZ and document images).

Memory Management: Uses span-based processing (ReadOnlySpan<char>) to reduce allocations. Includes experimental SecureMrzBuffer for memory handling.

Semantic Validation: Enforces strict rules for date resolution, illegal character rejection, and granular error reporting via MrzErrorCode (e.g., DocumentNumberCheckDigitFailure, ImpossibleBirthDate).

⚖️ AI Usage Disclosure & Compliance Claims
In accordance with engineering acceptance guidelines, compliance claims are calibrated to reflect verified evidence:

ICAO Compliance: Designed toward ICAO 9303 compatibility.

Cross-Platform Parity: Parity validation in progress (verified via automated canonical tests).

Memory Management: Uses span-based processing to reduce selected allocations and includes experimental secure-buffer handling.

Quality Assurance: Automated semantic-validation coverage has been expanded across .NET and Node.js suites.
