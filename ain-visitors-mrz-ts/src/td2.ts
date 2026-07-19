import { MrzFields, MrzErrorCode, calculateCheckDigit, cleanString, containsLowercase } from './helpers';

export function parseTd2(line1: string, line2: string): MrzFields {
    const result: MrzFields = { isValid: false, errorCode: MrzErrorCode.None };

    // التحقق من الأطوال
    if (line1.length !== 36 || line2.length !== 36) {
        result.errorCode = MrzErrorCode.InvalidLength;
        return result;
    }

    // التحقق من التنسيق
    if (line1[0] !== 'I' && line1[0] !== 'A' && line1[0] !== 'C') {
        result.errorCode = MrzErrorCode.InvalidFormat;
        return result;
    }

    // التحقق من الحروف
    if (containsLowercase(line1) || containsLowercase(line2)) {
        result.errorCode = MrzErrorCode.IllegalCharacter;
        return result;
    }

    // التحقق من أرقام التحقق (باستخدام رموز المهمة 6)
    if (calculateCheckDigit(line1.substring(5, 9)).toString() !== line1[9]) {
        result.errorCode = MrzErrorCode.DocumentNumberCheckDigitFailure;
        return result;
    }
    if (calculateCheckDigit(line2.substring(0, 6)).toString() !== line2[6]) {
        result.errorCode = MrzErrorCode.BirthDateCheckDigitFailure;
        return result;
    }
    if (calculateCheckDigit(line2.substring(8, 14)).toString() !== line2[14]) {
        result.errorCode = MrzErrorCode.ExpiryDateCheckDigitFailure;
        return result;
    }

    result.isValid = true;
    // ... (تكملة استخراج البيانات المعتادة كما هي في كودك الأصلي)
    return result;
}