import { PREDEFINED_RESPONSES, PredefinedResponse } from '../data/sampleData';
import { Language, Message } from '../types';

export function matchPredefinedResponse(
  query: string,
  lang: Language
): {
  content: string;
  topicId?: string;
  sources: Message['sources'];
  nextSteps: string[];
} {
  const normalized = query.toLowerCase();

  // Check specific keys
  let matched: PredefinedResponse | null = null;
  let topicId = 'consumer-rights';

  if (
    normalized.includes('defect') ||
    normalized.includes('broken') ||
    normalized.includes('fault') ||
    normalized.includes('damage') ||
    normalized.includes('screen') ||
    normalized.includes('hardware') ||
    normalized.includes('खराब') ||
    normalized.includes('टूटा')
  ) {
    matched = PREDEFINED_RESPONSES.defective;
    topicId = 'defective-products';
  } else if (
    normalized.includes('refund') ||
    normalized.includes('return') ||
    normalized.includes('cancel') ||
    normalized.includes('money back') ||
    normalized.includes('रिफंड') ||
    normalized.includes('वापसी')
  ) {
    matched = PREDEFINED_RESPONSES.refund;
    topicId = 'refunds-returns';
  } else if (
    normalized.includes('mrp') ||
    normalized.includes('price') ||
    normalized.includes('overcharg') ||
    normalized.includes('chilling') ||
    normalized.includes('extra charge') ||
    normalized.includes('प्रिंटेड') ||
    normalized.includes('एमआरपी')
  ) {
    matched = PREDEFINED_RESPONSES.mrp;
    topicId = 'overcharging-mrp';
  } else if (
    normalized.includes('how to file') ||
    normalized.includes('consumer court') ||
    normalized.includes('consumer forum') ||
    normalized.includes('edaakhil') ||
    normalized.includes('complaint') ||
    normalized.includes('शिकायत') ||
    normalized.includes('कोर्ट')
  ) {
    matched = PREDEFINED_RESPONSES.complaint;
    topicId = 'consumer-rights';
  } else if (
    normalized.includes('ad') ||
    normalized.includes('mislead') ||
    normalized.includes('fake claim') ||
    normalized.includes('influencer') ||
    normalized.includes('विज्ञापन')
  ) {
    matched = PREDEFINED_RESPONSES.misleading;
    topicId = 'misleading-ads';
  } else if (
    normalized.includes('ecommerce') ||
    normalized.includes('online') ||
    normalized.includes('amazon') ||
    normalized.includes('flipkart') ||
    normalized.includes('shopping')
  ) {
    matched = PREDEFINED_RESPONSES.ecommerce;
    topicId = 'ecommerce-issues';
  }

  if (matched) {
    return {
      content: lang === 'hi' ? matched.contentHi : matched.contentEn,
      topicId,
      sources: matched.sources,
      nextSteps: lang === 'hi' ? matched.nextStepsHi : matched.nextStepsEn,
    };
  }

  // Fallback realistic legal guidance for general consumer queries
  if (lang === 'hi') {
    return {
      content: `### आपकी उपभोक्ता समस्या का कानूनी विश्लेषण
भारतीय **उपभोक्ता संरक्षण अधिनियम, 2019 (CPA 2019)** के अंतर्गत प्रत्येक उपभोक्ता को वस्तुओं एवं सेवाओं में किसी भी प्रकार की कमी (Deficiency of Service) अथवा अनुचित व्यापार पद्धति (Unfair Trade Practice) के विरुद्ध सुरक्षा प्राप्त है।

### कानूनी प्रावधान:
* **धारा 2(9):** उपभोक्ता के 6 मौलिक अधिकार—सुरक्षा का अधिकार, सूचना का अधिकार, चयन का अधिकार, सुने जाने का अधिकार, निवारण पाने का अधिकार, और उपभोक्ता शिक्षा का अधिकार।
* **धारा 35:** उपभोक्ता स्वयं व्यक्तिगत रूप से अपने निवास स्थान या कार्यस्थल के क्षेत्राधिकार वाले जिला उपभोक्ता आयोग में वाद दायर कर सकता है।

### महत्वपूर्ण बिंदु:
खरीददार और विक्रेता के बीच हुए किसी भी अनुबंध में ऐसी शर्तें जो उपभोक्ता के वैधानिक अधिकारों को छीनती हैं, भारतीय कानून के तहत अमान्य मानी जाती हैं।`,
      topicId: 'consumer-rights',
      sources: [
        {
          title: 'उपभोक्ता संरक्षण अधिनियम, 2019 (विधिक पाठ)',
          url: 'https://www.indiacode.nic.in/handle/123456789/15256',
          organization: 'विधि एवं न्याय मंत्रालय, भारत सरकार',
        },
        {
          title: 'राष्ट्रीय उपभोक्ता हेल्पलाइन',
          url: 'https://consumerhelpline.gov.in/',
          organization: 'उपभोक्ता मामले विभाग',
        },
      ],
      nextSteps: [
        'समस्या से जुड़े सभी प्रमाण (खरीद का बिल, वारंटी कार्ड, लेन-देन रिकॉर्ड, ईमेल) एकत्रित करें।',
        'संबंधित संस्था या कंपनी को 15 दिन का औपचारिक समाधान नोटिस प्रेषित करें।',
        'टोल फ्री नंबर 1915 पर कॉल करके राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH) में शिकायत दर्ज कराएं।',
        'यदि समाधान न मिले, तो ई-दाखिल पोर्टल (edaakhil.nic.in) पर जिला आयोग में केस दर्ज करें।',
      ],
    };
  }

  return {
    content: `### Legal Assessment Under the Consumer Protection Framework
Under the **Consumer Protection Act, 2019 (CPA 2019)**, consumers are legally protected against "Deficiency in Service" (Section 2(11)) and "Unfair Trade Practices" (Section 2(47)) across all commercial transactions in India.

### Key Statutory Provisions:
* **Section 2(9) - Fundamental Consumer Rights:** Confirms your statutory rights including the Right to be Informed about quality/standards, the Right to be Heard, and the Right to Seek Redressal against unfair or restrictive trade practices.
* **Jurisdictional Relief (Section 34 & 35):** You are legally empowered to institute a consumer complaint at the District Commission situated within the local limits of your own residence or place of business, eliminating jurisdictional hurdles.
* **Mandatory Disclosure:** Merchants and service providers are statutorily required to resolve consumer grievances through established grievance redressal channels.

### Evidentiary Prerequisite:
Under Section 38, your claim relies upon factual documentary proof. Ensure all transaction receipts, written correspondence, and product details are archived securely.`,
    topicId: 'consumer-rights',
    sources: [
      {
        title: 'Consumer Protection Act, 2019 - Statutory Text',
        url: 'https://www.indiacode.nic.in/handle/123456789/15256',
        organization: 'Ministry of Law & Justice, Govt of India',
        sectionRef: 'Sections 2(9), 2(11), 35',
      },
      {
        title: 'National Consumer Helpline (NCH)',
        url: 'https://consumerhelpline.gov.in/',
        organization: 'Department of Consumer Affairs',
        sectionRef: 'Toll-Free 1915',
      },
    ],
    nextSteps: [
      'Preserve tax invoice, bank transaction slip, order confirmations, and written messages.',
      'Send a formal 15-day Demand Notice to the registered office of the merchant or service provider.',
      'Lodge an informal docket on the National Consumer Helpline (NCH) by dialling 1915.',
      'If neglected, file a statutory petition on the e-Jagriti / e-Daakhil electronic portal.',
    ],
  };
}
