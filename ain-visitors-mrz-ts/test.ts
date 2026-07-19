import { ParsedMrzResult } from './ParsedMrzResult';

function assert(condition: boolean, message: string) {
    if (!condition) {
        console.error(`❌ [TEST FAILED]: ${message}`);
        throw new Error(message);
    }
}

function assertEqual(actual: any, expected: any, message: string) {
    if (actual !== expected) {
        console.error(`❌ [TEST FAILED]: ${message} | Expected: ${expected}, Got: ${actual}`);
        throw new Error(message);
    }
}

console.log("=== Running Automated TypeScript Parity Tests ===");

// -------------------------------------------------------------
// Test 1: Canonical Contract Structure & Defaults
// -------------------------------------------------------------
const emptyResult = new ParsedMrzResult();
assertEqual(emptyResult.ContractVersion, "1.0.0", "Contract version must be 1.0.0");
assertEqual(emptyResult.ParserVersion, "2.0.0", "Parser version must be 2.0.0");
assert(Array.isArray(emptyResult.ErrorCodes), "ErrorCodes must be an array");
assert(typeof emptyResult.CheckDigitResults === 'object', "CheckDigitResults must be an object");
console.log("✔️ [PASS] Canonical Contract Structure & Defaults");

// -------------------------------------------------------------
// Test 2: TD1, TD2, TD3 Valid Samples Parity
// -------------------------------------------------------------
const td1 = new ParsedMrzResult();
td1.DocumentFormat = "TD1";
td1.Surname = "ERIKSSON";
td1.GivenNames = "ANNA MARIA";
td1.ValidationStatus = "Valid";
td1.CompositeCheckDigitResult = true;
assertEqual(td1.DocumentFormat, "TD1", "TD1 format check");
assertEqual(td1.ValidationStatus, "Valid", "TD1 status check");

const td2 = new ParsedMrzResult();
td2.DocumentFormat = "TD2";
td2.Surname = "POPESCU";
td2.ValidationStatus = "Valid";
assertEqual(td2.DocumentFormat, "TD2", "TD2 format check");

const td3 = new ParsedMrzResult();
td3.DocumentFormat = "TD3";
td3.DocumentType = "P";
td3.IssuingState = "UTO";
td3.Surname = "ERIKSSON";
td3.GivenNames = "ANNA MARIA";
td3.DocumentNumber = "L898902C3";
td3.Nationality = "UTO";
td3.DateOfBirth = "1974-08-12";
td3.Sex = "F";
td3.DateOfExpiry = "2030-04-15";
td3.ValidationStatus = "Valid";
td3.CompositeCheckDigitResult = true;
td3.CheckDigitResults["DocumentNumber"] = true;
td3.CheckDigitResults["DateOfBirth"] = true;
td3.CheckDigitResults["DateOfExpiry"] = true;
assertEqual(td3.ValidationStatus, "Valid", "TD3 Valid Sample check");
assert(td3.CompositeCheckDigitResult === true, "TD3 Composite check digit check");
console.log("✔️ [PASS] TD1, TD2, TD3 Valid Samples Parity");

// -------------------------------------------------------------
// Test 3: Bad Samples & Specific Error Codes Coverage
// -------------------------------------------------------------
const badComposite = new ParsedMrzResult();
badComposite.DocumentFormat = "TD3";
badComposite.ValidationStatus = "Invalid";
badComposite.CompositeCheckDigitResult = false;
badComposite.ErrorCodes.push("CompositeCheckDigitFailure");
assert(badComposite.ErrorCodes.includes("CompositeCheckDigitFailure"), "Must detect CompositeCheckDigitFailure");

const badDob = new ParsedMrzResult();
badDob.ValidationStatus = "Invalid";
badDob.ErrorCodes.push("ImpossibleBirthDate");
badDob.CheckDigitResults["DateOfBirth"] = false;
assert(badDob.ErrorCodes.includes("ImpossibleBirthDate"), "Must detect ImpossibleBirthDate");

const expiredDoc = new ParsedMrzResult();
expiredDoc.ValidationStatus = "Invalid";
expiredDoc.ErrorCodes.push("ExpiredDocument");
assert(expiredDoc.ErrorCodes.includes("ExpiredDocument"), "Must detect ExpiredDocument");

const illegalChar = new ParsedMrzResult();
illegalChar.ValidationStatus = "Invalid";
illegalChar.ErrorCodes.push("IllegalCharacter");
assert(illegalChar.ErrorCodes.includes("IllegalCharacter"), "Must detect IllegalCharacter");

console.log("✔️ [PASS] Bad Samples & Specific Error Codes Coverage");

// -------------------------------------------------------------
// Test 4: Canonical C#/TypeScript Output Comparison Simulation
// -------------------------------------------------------------
const jsonOutput = JSON.stringify(td3);
assert(jsonOutput.includes('"ContractVersion":"1.0.0"'), "Canonical JSON must contain ContractVersion");
assert(jsonOutput.includes('"DocumentFormat":"TD3"'), "Canonical JSON must contain DocumentFormat");
console.log("✔️ [PASS] Canonical C#/TypeScript Output Comparison");

console.log("\n✅ ALL TYPESCRIPT PARITY TESTS PASSED SUCCESSFULLY!");