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

## Engineering Scope & Boundaries
AIN.Visitors.Mrz is a specialized engineering library designed toward ICAO 9303 compatibility.

Scope Boundary (Assignment Limits)
This component strictly handles:

MRZ parsing and normalization.

ICAO check-digit validation (Individual, Optional, and Composite).

Semantic and date resolution validation.

Shared data contracts and scanner abstractions (IDocumentScanner).

Deterministic mock scanner implementation.

Automated C# and TypeScript parity testing.

Out of Scope: This library does not implement QR token generation, QR rendering, or One-Time Password processing
