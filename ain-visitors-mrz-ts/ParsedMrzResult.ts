export interface ICheckDigitResults {
    DocumentNumber?: boolean;
    DateOfBirth?: boolean;
    DateOfExpiry?: boolean;
    OptionalData?: boolean;
    [key: string]: boolean | undefined;
}

export class ParsedMrzResult {
    public ContractVersion: string = "1.0.0";
    public ParserVersion: string = "2.0.0";
    public DocumentFormat: string = "";      
    public DocumentType: string = "";        
    public IssuingState: string = "";        
    public Nationality: string = "";         
    public DocumentNumber: string = "";
    public Surname: string = "";
    public GivenNames: string = "";
    public DateOfBirth: string = "";         
    public Sex: string | null = null;        
    public DateOfExpiry: string = "";        
    public OptionalData: string | null = null;
    public CheckDigitResults: ICheckDigitResults = {};
    public CompositeCheckDigitResult: boolean = false;
    public ValidationStatus: string = "Pending"; 
    public ErrorCodes: string[] = [];
    public ParsedAt: string = new Date().toISOString();
    public CorrelationId: string = "ts-" + Math.random().toString(36).substring(2, 11);
}