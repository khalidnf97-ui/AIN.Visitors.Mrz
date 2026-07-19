# AIN.Visitors.Mrz Parsing Library


##  Overview
Final engineering acceptance gate (v2) release for AIN Visitors MRZ parsing library, compliant with 12 July 2026 blueprint requirements.


##  Prerequisites
- .NET 8.0 SDK
- Node.js (LTS version)


##  Build & Test
### For C#:
Open `AIN.Visitors.sln` in Visual Studio and run tests via Test Explorer.
### For TypeScript:
```bash
cd ain-visitors-mrz-ts
npm install
npm test
-----------------------------------
# AIN.Visitors.Mrz - Document MRZ Parsing Library (v2)

##  Overview & Engineering Scope Boundary
**AIN.Visitors.Mrz** is a specialized engineering library designed toward ICAO 9303 compatibility for standardized Machine Readable Zone (MRZ) parsing and semantic validation of travel and identity documents (TD1, TD2, and TD3 formats).

### Scope Boundary (Assignment Limits)
This component strictly handles:
- MRZ parsing and normalization.
- ICAO check-digit validation (Individual, Optional, and Composite).
- Semantic and date resolution validation.
- Shared data contracts and scanner abstractions (`IDocumentScanner`).
- Deterministic mock scanner implementation.
- Automated C# and TypeScript parity testing.

**Out of Scope:** This library does **not** implement QR token generation, QR rendering, One-Time Passwords (OTP), protected sessions, Privacy Receipt persistence, tenant regulatory profile decisions, or kiosk user interface screens. Those responsibilities belong to external integration modules as defined in the system blueprint.

---

##  Key Architectural & Security Implementations

### 1. Restricted Artifacts & Data Separation
To prevent accidental identity leakage, the contracts strictly separate normalized document data from restricted raw artifacts:
- **`ScanResult` & `NormalizedDocumentData`:** Contain only normalized, sanitized document fields and validation evidence.
- **`RawMrzArtifact` & `DocumentImageReference`:** Classified as restricted artifacts. **Raw MRZ data and document images do not appear automatically in normal scanner results, QR payloads, public Privacy Receipts, log messages, exceptions, or telemetry.**

### 2. Memory Protection & Span-Based Processing
- Uses `ReadOnlySpan<char>` and array pooling (`ArrayPool<char>.Shared`) to reduce selected allocations during string slicing and check-digit calculations.
- Includes experimental secure-buffer handling (`SecureMrzBuffer` and cryptographic memory wiping in `RawMrzArtifact.Dispose`). 
- *Technical Note:* Limitations of .NET garbage collection and memory clearing are acknowledged; guaranteed zero-allocation or absolute RAM erasure is not claimed without targeted hardware benchmarking.

### 3. Comprehensive Semantic Validation & Error Catalog
Beyond mathematical check digits, the parser enforces semantic rules:
- Rejects impossible birth/expiry dates and flags ambiguous centuries.
- Detects expired documents based on reference validation times.
- Rejects unsupported or illegal characters immediately **before** check-digit calculation (preventing silent fallback to math value `0`).
- Replaces generic errors with a granular error catalog (`MrzErrorCode`), such as `DocumentNumberCheckDigitFailure`, `ImpossibleBirthDate`, `ExpiredDocument`, `IllegalCharacter`, and `UnknownCountryCode`.

---

##  AI Usage Disclosure & Compliance Claims
In accordance with engineering acceptance guidelines, completion claims are calibrated to reflect verified technical evidence:
- **ICAO Compliance:** *Designed toward ICAO 9303 compatibility.*
- **Cross-Platform Parity:** *Parity validation in progress* (proven via automated canonical C#/TypeScript test execution).
- **Memory Management:** *Uses span-based processing to reduce selected allocations* and *includes experimental secure-buffer handling*.
- **Quality Assurance:** *Automated semantic-validation coverage has been expanded* across both .NET and Node.js test suites.

---

##  Reproducible Build & Test Commands
The solution can be built and verified from a clean repository clone without relying on workstation-specific absolute paths or personal IDE artifacts.

### 1. .NET (C#) Solution & Automated Tests
Open your terminal in the root directory and run:
```bash
# Restore NuGet packages
dotnet restore

# Build the solution in Release or Debug mode
dotnet build

# Execute the automated C# test suite (AIN.Visitors.Mrz.Tests)
dotnet test
