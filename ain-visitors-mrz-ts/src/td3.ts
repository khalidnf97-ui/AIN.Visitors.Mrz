import { MrzFields, MrzErrorCode, calculateCheckDigit, cleanString, containsLowercase } from './helpers';

export function parseTd3(line1: string, line2: string): MrzFields {
    const result: MrzFields = { isValid: false, errorCode: MrzErrorCode.None };

    // 1. التحقق من الأطوال
    if (line1.length !== 44 || line2.length !== 44) {
        result.errorCode = MrzErrorCode.InvalidLength;
        return result;
    }

    // 2. التحقق من التنسيق
    if (line1[0] !== 'P') {
        result.errorCode = MrzErrorCode.InvalidFormat;
        return result;
    }

    // 3. التحقق من الحروف (الرمز المحدث)
    if (containsLowercase(line1) || containsLowercase(line2)) {
        result.errorCode = MrzErrorCode.IllegalCharacter;
        return result;
    }

    // 4. استخراج البيانات للتحقق
    const docNumber = line2.substring(0, 9);
    const docNumCheck = line2[9];
    const dob = line2.substring(13, 19);
    const dobCheck = line2[19];
    const expiry = line2.substring(21, 27);
    const expiryCheck = line2[27];

    const compPart1 = line2.substring(0, 10);
    const compPart2 = line2.substring(13, 20);
    const compPart3 = line2.substring(21, 43);
    const compositeStr = compPart1 + compPart2 + compPart3;
    const compositeCheck = line2[43];

    // 5. التحقق من أرقام التحقق (استخدام الرموز المحددة للمهمة 6)
    if (calculateCheckDigit(docNumber).toString() !== docNumCheck) {
        result.errorCode = MrzErrorCode.DocumentNumberCheckDigitFailure;
        return result;
    }
    if (calculateCheckDigit(dob).toString() !== dobCheck) {
        result.errorCode = MrzErrorCode.BirthDateCheckDigitFailure;
        return result;
    }
    if (calculateCheckDigit(expiry).toString() !== expiryCheck) {
        result.errorCode = MrzErrorCode.ExpiryDateCheckDigitFailure;
        return result;
    }
    if (calculateCheckDigit(compositeStr).toString() !== compositeCheck) {
        result.errorCode = MrzErrorCode.CompositeCheckDigitFailure;
        return result;
    }

    // 6. استكمال تعبئة البيانات في حالة النجاح
    result.isValid = true;
    result.documentType = cleanString(line1.substring(0, 2));
    result.issuingState = cleanString(line1.substring(2, 5));
    
    const nameRaw = line1.substring(5, 44);
    const separatorIndex = nameRaw.indexOf("<<");
    if (separatorIndex !== -1) {
        result.primaryIdentifier = cleanString(nameRaw.substring(0, separatorIndex), true);
        result.secondaryIdentifier = cleanString(nameRaw.substring(separatorIndex + 2), true);
    } else {
        result.primaryIdentifier = cleanString(nameRaw, true);
    }

    result.documentNumber = cleanString(docNumber);
    result.nationality = cleanString(line2.substring(10, 13));
    result.dateOfBirth = cleanString(dob);
    
    const sexChar = line2[20];
    result.sex = sexChar === '<' ? "U" : sexChar;
    
    result.dateOfExpiry = cleanString(expiry);
    result.personalNumber = cleanString(line2.substring(28, 42));

    return result;
}