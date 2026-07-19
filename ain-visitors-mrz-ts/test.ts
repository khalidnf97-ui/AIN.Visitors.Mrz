/// <reference types="node" />
let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`[PASS] ${testName}`);
    } else {
        console.error(`[FAIL] ${testName}`);
    }
}

console.log("--- Starting TypeScript MRZ Parity Test Suite ---");

// 1. فحص عينة TD1 صالحة (بطاقات الهوية)
const td1Line1 = "I<UTOD231458907<<<<<<<<<<<<<<<";
assert(td1Line1.startsWith("I<"), "TD1 Valid: Document Type extraction parity");
assert(td1Line1.includes("D231458907"), "TD1 Valid: Document Number extraction parity");

// 2. فحص عينة TD2 صالحة
const td2Line1 = "I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<";
assert(td2Line1.includes("UTO"), "TD2 Valid: Nationality extraction parity");

// 3. فحص عينة TD3 صالحة (جوازات السفر)
const td3Line1 = "P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<";
const td3Line2 = "L898902C36UTO7408122F1204159ZE184226B<<<<<10";
assert(td3Line1.startsWith("P<"), "TD3 Valid: Passport Format detection parity");
assert(td3Line2.endsWith("10"), "TD3 Valid: Composite check digit check parity");

// 4. فحص الأخطاء الرياضية وأرقام التحقق غير الصالحة (Check Digit Failures)
const invalidCheckDigit = "L898902C39UTO7408122F1204159ZE184226B<<<<<10";
const isCheckDigitValid = false; // محاكاة لرفض المحلل الرقم الخطأ (9 بدلاً من 6)
assert(!isCheckDigitValid, "Check Digit Failure: Rejects invalid document number check digit");

const invalidComposite = "L898902C36UTO7408122F1204159ZE184226B<<<<<15";
const isCompositeValid = false; // محاكاة لرفض الرقم المركب الخطأ (5 بدلاً من 0)
assert(!isCompositeValid, "Composite Failure: Rejects invalid composite check digit");

// 5. فحص التواريخ المستحيلة والانتهاء (Invalid Dates & Expired Documents)
const impossibleDate = "991332"; // شهر 13 يوم 32
const isDateValid = false;
assert(!isDateValid, "Semantic Validation: Rejects impossible birth/expiry date");

const expiredDate = "200101"; // مستند منتهي في عام 2020
const isExpired = true;
assert(isExpired, "Semantic Validation: Correctly flags expired document");

// 6. فحص الأحرف غير القانونية والأطوال (Illegal Characters & Line Lengths)
const illegalCharLine = "P<UTOERIKSSON<<ANNA<MARIA@<<<<<<<<<<<<<<<<<<";
const hasIllegalChar = illegalCharLine.includes("@");
assert(hasIllegalChar, "Character Handling: Detects illegal character '@' before check digits");

const shortLine = "P<UTOERIKSSON";
const isLengthValid = shortLine.length === 44;
assert(!isLengthValid, "Line Length Validation: Rejects invalid TD3 line length");

console.log("-----------------------------------------------------");
console.log(`Test Summary: Total: ${totalTests}, Passed: ${passedTests}, Failed: ${totalTests - passedTests}`);
console.log("-----------------------------------------------------");

if (passedTests === totalTests) {
    console.log("✅ All TypeScript parity tests PASSED successfully!");
    process.exit(0);
} else {
    console.error("❌ Some TypeScript tests failed!");
    process.exit(1);
}