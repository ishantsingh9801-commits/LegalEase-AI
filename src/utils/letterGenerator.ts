import { ComplaintFormData } from '../types';

export function generateComplaintLetter(data: ComplaintFormData): string {
  const currentDate = new Date().toLocaleDateString(data.language === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (data.language === 'hi') {
    return `================================================================================
औपचारिक कानूनी नोटिस एवं उपभोक्ता शिकायत (डेमो प्रारूप)
उपभोक्ता संरक्षण अधिनियम, 2019 के अंतर्गत
================================================================================

दिनांक: ${currentDate}
प्रेषण माध्यम: पंजीकृत डाक / स्पीड पोस्ट / अधिकृत ईमेल

सेवा में,
शिकायत निवारण अधिकारी / प्रबंधक महोदय,
${data.companyName || '[कंपनी / विक्रेता का नाम]'}
${data.companyAddress || '[कंपनी का पंजीकृत पता / ईमेल]'}

प्रेषक:
${data.senderName || '[उपभोक्ता का नाम]'}
${data.senderAddress || '[उपभोक्ता का आवासीय पता]'}
दूरभाष: ${data.senderPhone || '[फोन नंबर]'} | ईमेल: ${data.senderEmail || '[ईमेल आईडी]'}

विषय: उपभोक्ता संरक्षण अधिनियम, 2019 की धारा 2(11) एवं 2(47) के तहत सेवा में कमी एवं खराब उत्पाद के संबंध में कानूनी नोटिस।

संदर्भ:
उत्पाद / सेवा: ${data.productName || '[उत्पाद का नाम]'}
क्रय तिथि: ${data.purchaseDate || '[खरीद की तारीख]'}
ऑर्डर / इनवॉइस संख्या: ${data.orderId || '[ऑर्डर या बिल संख्या]'}
भुगतान की गई राशि: ₹${data.pricePaid || '[भुगतान की गई राशि]'}

महोदय / महोदया,

1. यह कि मैंने उपरोक्त उल्लिखित तारीख को आपकी कंपनी / प्रतिष्ठान से पूर्ण प्रतिफल राशि ₹${data.pricePaid || '___'} का भुगतान करके ${data.productName || 'सामान'} क्रय किया था।

2. यह कि मुझे प्राप्त उत्पाद / सेवा में निम्नलिखित गंभीर त्रुटि एवं दोष है:
   "${data.problemDescription || 'उत्पाद में पाई गई तकनीकी अथवा भौतिक खराबी का विवरण'}"

3. यह कि उक्त समस्या के संबंध में मैंने पूर्व में आपके ग्राहक सेवा केंद्र से संपर्क किया था:
   "${data.previousAttempts || 'ग्राहक सहायता से पूर्व में की गई बातचीत अथवा ईमेल का विवरण'}"
   परंतु आपकी ओर से इस विषय पर कोई संतोषजनक व त्वरित कार्रवाई नहीं की गई, जो कि उपभोक्ता संरक्षण अधिनियम, 2019 के अंतर्गत 'सेवा में स्पष्ट कमी' (Deficiency in Service) है।

4. मांग एवं निवारण (Statutory Demand):
   उपरोक्त तथ्यों के दृष्टिगत, मैं आपसे मांग करता/करती हूँ कि इस नोटिस की प्राप्ति के ${data.resolutionDeadlineDays || 15} दिनों के भीतर:
   - ${data.desiredResolution || 'पूर्ण राशि का रिफंड अथवा बिना किसी शुल्क के नया उत्पाद प्रदान किया जाए'}
   - मानसिक प्रताड़ना एवं अनावश्यक पत्राचार हेतु उचित क्षतिपूर्ति की जाए।

5. कानूनी चेतावनी:
   यदि उक्त ${data.resolutionDeadlineDays || 15} दिनों की समयावधि में मेरी शिकायत का उचित समाधान नहीं किया जाता है, तो मैं सक्षम जिला उपभोक्ता विवाद निवारण आयोग (DCDRC) में धारा 35 के तहत वाद दायर करने और राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH - 1915) में शिकायत दर्ज कराने के लिए बाध्य होऊंगा/होऊंगी, जिसके समस्त खर्च व हर्जाने की जिम्मेदारी आपकी होगी।

भवदीय,

(हस्ताक्षर)
${data.senderName || '[उपभोक्ता का नाम]'}
`;
  }

  return `================================================================================
FORMAL LEGAL NOTICE & STATUTORY CONSUMER COMPLAINT
Under the Provisions of the Consumer Protection Act, 2019
================================================================================

Date: ${currentDate}
Mode of Delivery: Registered A.D. / Speed Post / Official Grievance Email

TO:
The Grievance Redressal Officer / Authorized Signatory,
${data.companyName || '[Company / Seller Name]'}
${data.companyAddress || '[Registered Corporate Address / Support Email]'}

FROM:
${data.senderName || '[Consumer Full Name]'}
${data.senderAddress || '[Consumer Residential Address]'}
Phone: ${data.senderPhone || '[Contact Number]'} | Email: ${data.senderEmail || '[Email Address]'}

SUBJECT: Formal Demand Notice under Section 2(11) and Section 2(47) of the Consumer Protection Act, 2019 for Deficiency in Service and Defective Product.

REFERENCE DETAILS:
Product / Service Name : ${data.productName || '[Product/Service Name]'}
Purchase Date          : ${data.purchaseDate || '[Purchase Date]'}
Order / Invoice ID     : ${data.orderId || '[Invoice / Order Reference]'}
Total Amount Paid      : ₹${data.pricePaid || '[Amount in INR]'}

Dear Sir / Madam,

1. TRANSACTION & CONSUMER STATUS:
   I am a bona fide consumer within the definition of Section 2(7) of the Consumer Protection Act, 2019, having purchased the aforementioned ${data.productName || 'product/service'} from your firm on ${data.purchaseDate || '[Date]'} against invoice value of ₹${data.pricePaid || '___'}.

2. STATEMENT OF GRIEVANCE & DEFECT:
   Upon receipt and regular usage, the following patent defect, non-conformity, or deficiency has occurred:
   "${data.problemDescription || '[Detailed description of the defect or service failure]'}"

3. PRIOR REDRESSAL ATTEMPTS:
   I have made reasonable efforts to resolve this dispute through your designated support channels:
   "${data.previousAttempts || '[Summary of prior customer care emails, tickets, or phone calls]'}"
   Regrettably, your organization has neglected to cure the defect or provide a lawful remedy, constituting an actionable Deficiency of Service under Section 2(11) and an Unfair Trade Practice under Section 2(47).

4. DEMAND FOR REMEDY:
   Under statutory product liability provisions (Chapter VI, CPA 2019), I hereby formally call upon you to satisfy the following demand within ${data.resolutionDeadlineDays || 15} calendar days of receipt of this notice:
   - Provide: ${data.desiredResolution || 'Full refund of the invoiced amount via original payment method, or immediate defect-free replacement'}.
   - Recompense for communication expenses and mental inconvenience caused by this delay.

5. NOTICE OF LEGAL PROCEEDINGS:
   Please take notice that if you fail to comply with the requisitions of this notice within ${data.resolutionDeadlineDays || 15} days, I shall be constrained to institute formal legal proceedings against your company before the competent District Consumer Disputes Redressal Commission (DCDRC) under Section 35 of the Consumer Protection Act, 2019, alongside registering a complaint with the National Consumer Helpline (NCH 1915).

   In such an event, you shall be held liable for all consequential damages, litigation costs, and interest @ 18% per annum.

Yours faithfully,

(Signature)
${data.senderName || '[Consumer Full Name]'}
`;
}

export function downloadTextFile(filename: string, text: string): void {
  const element = document.createElement('a');
  const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
}
