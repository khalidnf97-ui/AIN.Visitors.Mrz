namespace AIN.Visitors.Mrz.Models
{
    /// <summary>
    /// عقد نتيجة المسح العادية (المشارك مع وسام ومحمد).
    /// خالي تماماً من الـ Raw MRZ ومراجع الصور التزاماً بالشرط 8 و 13.
    /// </summary>
    public class ScanResult
    {
        public NormalizedDocumentData Data { get; set; } = new NormalizedDocumentData();
        public ValidationEvidence Evidence { get; set; } = new ValidationEvidence();
        public bool IsSuccess => Evidence.ValidationStatus == "Valid" || Evidence.ValidationStatus == "Warning";
    }
}