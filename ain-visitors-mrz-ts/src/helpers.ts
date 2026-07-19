export enum MrzErrorCode {
    None = "None",
    InvalidLength = "InvalidLength",
    InvalidFormat = "InvalidFormat",
    IllegalCharacter = "IllegalCharacter",
    CheckDigitError = "CheckDigitError",
    DocumentNumberCheckDigitFailure = "DocumentNumberCheckDigitFailure",
    BirthDateCheckDigitFailure = "BirthDateCheckDigitFailure",
    ExpiryDateCheckDigitFailure = "ExpiryDateCheckDigitFailure",
    OptionalDataCheckDigitFailure = "OptionalDataCheckDigitFailure",
    CompositeCheckDigitFailure = "CompositeCheckDigitFailure",
    ImpossibleBirthDate = "ImpossibleBirthDate",
    ImpossibleExpiryDate = "ImpossibleExpiryDate",
    ExpiredDocument = "ExpiredDocument",
    InvalidSexMarker = "InvalidSexMarker",
    UnknownCountryCode = "UnknownCountryCode",
    AmbiguousCentury = "AmbiguousCentury",
    UnsupportedFormat = "UnsupportedFormat",
    InternalParserFailure = "InternalParserFailure"
}

export interface MrzFields {
    isValid: boolean;
    errorCode: MrzErrorCode;
    documentType?: string;
    issuingState?: string;
    documentNumber?: string;
    primaryIdentifier?: string;
    secondaryIdentifier?: string;
    nationality?: string;
    dateOfBirth?: string;
    sex?: string;
    dateOfExpiry?: string;
    personalNumber?: string;
}

export function calculateCheckDigit(val: string): number {
    const weights = [7, 3, 1];
    let sum = 0;
    for (let i = 0; i < val.length; i++) {
        const c = val[i];
        let v = 0;
        if (c >= '0' && c <= '9') v = c.charCodeAt(0) - '0'.charCodeAt(0);
        else if (c >= 'A' && c <= 'Z') v = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        else if (c === '<') v = 0;
        sum += v * weights[i % 3];
    }
    return sum % 10;
}

export function cleanString(val: string, replaceWithSpace: boolean = false): string {
    return val.replace(/</g, replaceWithSpace ? ' ' : '').trim();
}

export function containsLowercase(val: string): boolean {
    return /[a-z]/.test(val);
}