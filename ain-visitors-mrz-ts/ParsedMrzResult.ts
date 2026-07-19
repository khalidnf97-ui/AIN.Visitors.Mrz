/**
 * العقد الموحد المؤرخ لمخرجات تحليل MRZ (نسخة TypeScript المطابقة).
 * متطابق هندسياً بنسبة 100% مع كلاس C# لضمان نجاح مقارنة مخرجات JSON الآلية (Canonical Parity).
 */

export interface CheckDigitResultsMap {
    documentNumber: boolean;
    dateOfBirth: boolean;
    dateOfExpiry: boolean;
    optionalData?: boolean;
}

export interface ParsedMrzResult {
    contractVersion: string;
    parserVersion: string;
    documentFormat: 'TD1' | 'TD2' | 'TD3' | '';
    documentType: string;
    issuingState: string;
    nationality: string;
    documentNumber: string;
    surname: string;
    givenNames: string;
    dateOfBirth: string; // ISO Format: YYYY-MM-DD
    sex: 'M' | 'F' | 'X' | null;
    dateOfExpiry: string; // ISO Format: YYYY-MM-DD
    optionalData: string | null;
    checkDigitResults: CheckDigitResultsMap;
    compositeCheckDigitResult: boolean;
    validationStatus: 'Valid' | 'Invalid' | 'Warning' | 'Unknown';
    errorCodes: string[];
    parsedAt: string; // ISO 8601 UTC
    correlationId: string;
}

/**
 * دالة مساعدة لإنشاء نتيجة معيارية أولية مع الحفاظ على الترتيب الصارم للحقول في مخرجات JSON.
 */
export function createCanonicalResult(): ParsedMrzResult {
    return {
        contractVersion: "1.0.0",
        parserVersion: "2.0.0",
        documentFormat: "",
        documentType: "",
        issuingState: "",
        nationality: "",
        documentNumber: "",
        surname: "",
        givenNames: "",
        dateOfBirth: "",
        sex: null,
        dateOfExpiry: "",
        optionalData: null,
        checkDigitResults: {
            documentNumber: false,
            dateOfBirth: false,
            dateOfExpiry: false
        },
        compositeCheckDigitResult: false,
        validationStatus: "Unknown",
        errorCodes: [],
        parsedAt: new Date().toISOString(),
        correlationId: "00000000-0000-0000-0000-000000000000"
    };
}