import { Topic, OfficialResource, ChatSession, SourceRef } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 'consumer-rights',
    title: 'Consumer Rights',
    titleHi: 'उपभोक्ता अधिकार',
    iconName: 'Scale',
    description: 'Fundamental statutory protections under Section 2(9) of the Consumer Protection Act, 2019.',
    descriptionHi: 'उपभोक्ता संरक्षण अधिनियम, 2019 की धारा 2(9) के तहत 6 मौलिक कानूनी अधिकार।',
    statutoryRef: 'Section 2(9), Consumer Protection Act, 2019',
    sampleQuestion: 'What are the 6 basic consumer rights guaranteed under Indian law?',
    sampleQuestionHi: 'भारतीय कानून के तहत मिलने वाले 6 मूल उपभोक्ता अधिकार कौन से हैं?',
  },
  {
    id: 'refunds-returns',
    title: 'Refunds & Returns',
    titleHi: 'रिफंड एवं रिटर्न',
    iconName: 'RotateCcw',
    description: 'Rules for refund refusals, cancellation charges, and e-commerce return periods.',
    descriptionHi: 'रिफंड से इनकार, कैंसिलेशन शुल्क और ई-कॉमर्स रिटर्न नीतियों के नियम।',
    statutoryRef: 'Consumer Protection (E-Commerce) Rules, 2020',
    sampleQuestion: 'Can an online seller refuse my refund if the product is unusable?',
    sampleQuestionHi: 'क्या ऑनलाइन विक्रेता अनुपयोगी उत्पाद के लिए रिफंड से इनकार कर सकता है?',
  },
  {
    id: 'defective-products',
    title: 'Defective Products',
    titleHi: 'खराब उत्पाद',
    iconName: 'AlertTriangle',
    description: 'Product liability and statutory remedies against manufacturers and sellers.',
    descriptionHi: 'खराब या घटिया उत्पाद के लिए निर्माता और विक्रेता की उत्पाद देयता।',
    statutoryRef: 'Chapter VI (Product Liability), CPA 2019',
    sampleQuestion: 'I received a defective product. What legal remedies can I claim?',
    sampleQuestionHi: 'मुझे खराब उत्पाद मिला है। मुझे क्या कानूनी अधिकार और समाधान मिलते हैं?',
  },
  {
    id: 'ecommerce-issues',
    title: 'E-commerce Issues',
    titleHi: 'ई-कॉमर्स समस्याएं',
    iconName: 'ShoppingBag',
    description: 'Delivery delays, counterfeit goods, dark patterns, and nodal officer grievances.',
    descriptionHi: 'डिलीवरी में देरी, नकली उत्पाद, डार्क पैटर्न और नोडल शिकायत अधिकारी से संपर्क।',
    statutoryRef: 'Rule 4 & 5, E-Commerce Rules, 2020',
    sampleQuestion: 'How to report delayed deliveries or fake goods received on shopping apps?',
    sampleQuestionHi: 'शॉपिंग ऐप पर हुई देरी या नकली सामान की शिकायत कैसे दर्ज करें?',
  },
  {
    id: 'misleading-ads',
    title: 'Misleading Advertisements',
    titleHi: 'भ्रामक विज्ञापन',
    iconName: 'Megaphone',
    description: 'CCPA guidelines on false claims, celebrity endorsements, and unfair trade practices.',
    descriptionHi: 'झूठे दावों, भ्रामक प्रचार और अनुचित व्यापार प्रथाओं पर CCPA दिशानिर्देश।',
    statutoryRef: 'Section 21, Consumer Protection Act, 2019',
    sampleQuestion: 'How can I complain against a misleading advertisement with false claims?',
    sampleQuestionHi: 'झूठे और भ्रामक विज्ञापन के खिलाफ शिकायत कहां और कैसे दर्ज करें?',
  },
  {
    id: 'overcharging-mrp',
    title: 'Overcharging & MRP',
    titleHi: 'एमआरपी से अधिक वसूली',
    iconName: 'Tag',
    description: 'Enforcing printed Maximum Retail Price and combating dual MRP practices.',
    descriptionHi: 'अधिकतम खुदरा मूल्य (MRP) से अधिक दाम वसूलने और दोहरे MRP पर प्रतिबंध।',
    statutoryRef: 'Rule 18(2), Legal Metrology (Packaged Commodities) Rules, 2011',
    sampleQuestion: 'A shopkeeper charged more than the printed MRP. What are my rights?',
    sampleQuestionHi: 'दुकानदार ने छपे हुए MRP से ज्यादा पैसे वसूले। इस पर क्या नियम हैं?',
  },
];

export const HOMEPAGE_SUGGESTIONS = [
  {
    id: 'defective',
    topicId: 'defective-products',
    title: 'Defective Product',
    question: 'I received a defective product. What can I do?',
    questionHi: 'मुझे खराब उत्पाद मिला है। मैं क्या कर सकता हूँ?',
    icon: 'PackageX',
  },
  {
    id: 'refund',
    topicId: 'refunds-returns',
    title: 'Refund Refusal',
    question: 'Can an online seller refuse my refund?',
    questionHi: 'क्या ऑनलाइन विक्रेता मेरा रिफंड देने से मना कर सकता है?',
    icon: 'RotateCcw',
  },
  {
    id: 'mrp',
    topicId: 'overcharging-mrp',
    title: 'Charged Above MRP',
    question: 'A shopkeeper charged more than the printed MRP.',
    questionHi: 'दुकानदार ने छपे MRP से अधिक कीमत वसूली। क्या करें?',
    icon: 'Receipt',
  },
  {
    id: 'complaint',
    topicId: 'consumer-rights',
    title: 'File a Complaint',
    question: 'How can I file a consumer complaint in India?',
    questionHi: 'भारत में उपभोक्ता फोरम में शिकायत कैसे दर्ज करें?',
    icon: 'FileText',
  },
];

export const OFFICIAL_RESOURCES: OfficialResource[] = [
  {
    id: 'india-code',
    title: 'India Code - Digital Repository of Laws',
    organization: 'Ministry of Law and Justice, Govt of India',
    description: 'The official digital repository of all Central and State Acts, providing authentic, updated bare text of the Consumer Protection Act, 2019 and associated rules.',
    descriptionHi: 'भारत सरकार के सभी केंद्रीय व राज्य अधिनियमों का आधिकारिक डिजिटल संग्रह, जहां उपभोक्ता संरक्षण अधिनियम 2019 का मूल पाठ उपलब्ध है।',
    url: 'https://www.indiacode.nic.in/',
    iconName: 'BookOpen',
    badgeText: 'Official Bare Acts',
    keyServices: ['Search Bare Acts', 'CPA 2019 Text', 'Central Legislation Rules'],
  },
  {
    id: 'nch',
    title: 'National Consumer Helpline (NCH)',
    organization: 'Department of Consumer Affairs, Govt of India',
    description: 'Toll-free National Portal for prompt redressal of consumer grievances. Register complaints via Toll-Free 1915, SMS (8800001915), or web portal.',
    descriptionHi: 'उपभोक्ता शिकायतों के त्वरित निवारण के लिए केंद्र सरकार का राष्ट्रीय हेल्पलाइन पोर्टल। टोल-फ्री 1915 पर कॉल या ऑनलाइन शिकायत दर्ज करें।',
    url: 'https://consumerhelpline.gov.in/',
    iconName: 'PhoneCall',
    badgeText: 'Toll-Free 1915',
    keyServices: ['Lodge Online Grievance', 'Track Complaint Status', 'E-Commerce Redressal'],
  },
  {
    id: 'dca',
    title: 'Department of Consumer Affairs (DoCA)',
    organization: 'Ministry of Consumer Affairs, Food & Public Distribution',
    description: 'Nodal government department responsible for formulating consumer protection policies, CCPA enforcement, price monitoring, and Legal Metrology oversight.',
    descriptionHi: 'उपभोक्ता संरक्षण नीतियों, CCPA नियमों के क्रियान्वयन, मूल्य निगरानी और विधिक मापविज्ञान के लिए जिम्मेदार नोडल सरकारी विभाग।',
    url: 'https://consumeraffairs.nic.in/',
    iconName: 'Building2',
    badgeText: 'Central Authority',
    keyServices: ['CCPA Orders & Notifications', 'Dark Pattern Guidelines', 'Price Monitoring'],
  },
  {
    id: 'e-jagriti',
    title: 'e-Jagriti (e-Daakhil)',
    organization: 'National Consumer Disputes Redressal Commission',
    description: 'Unified online portal for hassle-free digital filing of consumer complaints across District, State, and National Consumer Dispute Redressal Commissions.',
    descriptionHi: 'जिला, राज्य और राष्ट्रीय उपभोक्ता विवाद निवारण आयोगों में सीधे ऑनलाइन केस व शिकायत दर्ज करने हेतु एकीकृत डिजिटल पोर्टल।',
    url: 'https://e-jagriti.gov.in/',
    iconName: 'FileCheck',
    badgeText: 'Digital Court Filing',
    keyServices: ['Online Case Filing (e-Daakhil)', 'Digital Fee Payment', 'Virtual Hearing Tracking'],
  },
  {
    id: 'bis-care',
    title: 'Bureau of Indian Standards (BIS)',
    organization: 'National Standards Body of India',
    description: 'Verify ISI marks, Hallmark authenticity on jewelry, and standard certifications. Report sub-standard quality goods and spurious certifications.',
    descriptionHi: 'आईएसआई (ISI) मार्क व हॉलमार्क की शुद्धता जांचें और घटिया गुणवत्ता वाले उत्पादों की शिकायत बीआईएस में करें।',
    url: 'https://www.bis.gov.in/',
    iconName: 'ShieldCheck',
    badgeText: 'Quality & Standards',
    keyServices: ['ISI Mark Verification', 'Hallmark Authenticity', 'BIS Care Mobile App'],
  },
  {
    id: 'asci',
    title: 'Advertising Standards Council of India (ASCI)',
    organization: 'Self-Regulatory Advertising Organization',
    description: 'Register complaints against misleading, indecent, or unsubstantiated advertisements across TV, print, digital media, and influencer endorsements.',
    descriptionHi: 'टीवी, प्रिंट, डिजिटल मीडिया या सोशल मीडिया इन्फ्लुएंसर्स के भ्रामक और झूठे विज्ञापनों के खिलाफ शिकायत दर्ज करें।',
    url: 'https://www.ascionline.in/',
    iconName: 'Megaphone',
    badgeText: 'Ad Compliance',
    keyServices: ['Lodge Ad Complaint', 'Misleading Claims Review', 'Influencer Guidelines'],
  },
];

export interface PredefinedResponse {
  keywords: string[];
  titleEn: string;
  titleHi: string;
  contentEn: string;
  contentHi: string;
  sources: SourceRef[];
  nextStepsEn: string[];
  nextStepsHi: string[];
}

export const PREDEFINED_RESPONSES: Record<string, PredefinedResponse> = {
  defective: {
    keywords: ['defective', 'broken', 'faulty', 'damaged', 'not working', 'malfunction', 'product defect'],
    titleEn: 'Remedies for Defective Products under CPA 2019',
    titleHi: 'खराब उत्पाद के लिए कानूनी समाधान',
    contentEn: `### Legal Position Under Indian Law
Under **Section 2(10) and Section 2(11) of the Consumer Protection Act, 2019**, a "defect" includes any fault, imperfection, or shortcoming in the quality, quantity, potency, purity, or standard required to be maintained by law or contract.

Furthermore, under **Chapter VI (Sections 82–87)**, India recognizes **Product Liability**. This holds both the manufacturer and the seller/e-commerce marketplace strictly liable for harm or financial loss caused by a defective product.

### What You Are Entitled To:
* **Free Repair / Rectification:** The seller or manufacturer must cure the defect without unreasonable delay or expense to you.
* **Replacement:** If repair is not feasible or fails to resolve the defect, you have a right to an identical, defect-free replacement.
* **Full Refund:** If neither repair nor replacement is provided, you are entitled to a 100% refund of the purchase price.
* **Compensation for Damages:** If the defect caused secondary property damage or physical injury, product liability provisions allow compensation claims.

### Important Notes on "No Return / No Exchange":
Blanket signs stating *"Goods once sold will not be returned or replaced"* have been held by Consumer Commissions to constitute an **Unfair Trade Practice** under Section 2(47) if the product is inherently defective.`,
    contentHi: `### भारतीय कानून के तहत आपकी स्थिति
**उपभोक्ता संरक्षण अधिनियम, 2019 की धारा 2(10) एवं 2(11)** के अनुसार, किसी भी उत्पाद में कानून या अनुबंध द्वारा निर्धारित गुणवत्ता, शुद्धता या मानक में कमी होना 'दोष' (Defect) माना जाता है।

अधिनियम के **अध्याय VI (धारा 82–87)** के तहत **उत्पाद देयता (Product Liability)** का स्पष्ट प्रावधान है। इसके अंतर्गत निर्माता और विक्रेता दोनों ही खराब उत्पाद के कारण हुए नुकसान के लिए उत्तरदायी हैं।

### आपके अधिकार:
* **निःशुल्क मरम्मत:** विक्रेता या निर्माता को बिना किसी अनुचित देरी के खराबी ठीक करनी होगी।
* **उत्पाद बदलना (Replacement):** यदि मरम्मत संभव नहीं है, तो नया और सही उत्पाद देना होगा।
* **पूर्ण रिफंड:** यदि उपरोक्त समाधान न मिले, तो पूरा पैसा वापस पाने का कानूनी हक है।
* **हर्जाना:** यदि खराब सामान से कोई शारीरिक या आर्थिक हानि हुई हो, तो मुआवजे का दावा किया जा सकता है।

### 'बिका हुआ माल वापस नहीं होगा' की स्थिति:
उपभोक्ता फोरम के आदेशों के अनुसार, खराब उत्पाद मिलने पर ऐसी शर्तें 'अनुचित व्यापार प्रथा' मानी जाती हैं और अमान्य होती हैं।`,
    sources: [
      {
        title: 'Consumer Protection Act, 2019 - Bare Text',
        url: 'https://www.indiacode.nic.in/handle/123456789/15256',
        organization: 'India Code / Ministry of Law',
        sectionRef: 'Sections 2(10), 82-87',
      },
      {
        title: 'National Consumer Helpline Portal',
        url: 'https://consumerhelpline.gov.in/',
        organization: 'Department of Consumer Affairs',
        sectionRef: 'Grievance Docket 1915',
      },
    ],
    nextStepsEn: [
      'Preserve original tax invoice, delivery box, and photographs/unboxing video showing the defect.',
      'Send a formal written notice/email to the seller’s registered customer support and Grievance Officer.',
      'If unresolved in 48 hours, register a grievance on National Consumer Helpline (NCH) by dialling 1915 or online.',
      'If the company fails to comply, file a statutory petition on e-Jagriti (e-Daakhil) before the District Consumer Commission.',
    ],
    nextStepsHi: [
      'खरीद का बिल (Tax Invoice), बॉक्स और खराबी की फोटो/वीडियो सुरक्षित रखें।',
      'कंपनी के ग्राहक सहायता और शिकायत निवारण अधिकारी को ईमेल द्वारा औपचारिक शिकायत भेजें।',
      'यदि 48 घंटों में समाधान न मिले, तो राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) पर शिकायत दर्ज कराएं।',
      'कंपनी द्वारा बात न मानने पर ई-जागृति (e-Daakhil) के माध्यम से जिला उपभोक्ता फोरम में ऑनलाइन केस दर्ज करें।',
    ],
  },
  refund: {
    keywords: ['refund', 'money back', 'return', 'cancellation', 'returned', 'refuse refund', 'non-refund'],
    titleEn: 'Rights Regarding Refund Refusal & E-Commerce Returns',
    titleHi: 'रिफंड से इनकार एवं ई-कॉमर्स रिटर्न पर कानूनी अधिकार',
    contentEn: `### Statutory Rules on Refunds
Under the **Consumer Protection (E-Commerce) Rules, 2020 (Rule 5 & Rule 6)**:
1. **Mandatory Acceptance:** An e-commerce entity or marketplace seller cannot refuse to accept returns or refuse refunds if goods are defective, deficient, delivered late, or not as described on the website.
2. **Explicit Timelines:** All refunds must be processed in accordance with the prescribed refund policies within a reasonable time frame (typically within 14 calendar days from receipt of return).
3. **No Unilateral Cancellation Fees:** Platforms cannot impose arbitrary cancellation penalties on buyers unless the seller also bears equivalent costs for unilateral cancellation.

### Unfair Contract Terms (Section 2(46))
Under Section 2(46) of the Act, unilateral clauses like *"Refunds will only be given as non-expiring store credit / wallet points"* cannot be forced upon a consumer when the fault lies entirely with the seller. Consumers are entitled to refund back to the original mode of payment.`,
    contentHi: `### रिफंड पर सरकारी नियम
**उपभोक्ता संरक्षण (ई-कॉमर्स) नियम, 2020 के नियम 5 एवं 6** के अनुसार:
1. **रिफंड से इनकार वर्जित:** यदि उत्पाद खराब है, विवरण से भिन्न है, या समय पर नहीं पहुंचा, तो विक्रेता या ई-कॉमर्स प्लेटफॉर्म रिफंड लेने से इनकार नहीं कर सकता।
2. **निश्चित समयसीमा:** वापसी प्रक्रिया पूर्ण होने के बाद उचित समयसीमा (सामान्यतः 14 दिनों के भीतर) में रिफंड मूल भुगतान खाते में आना चाहिए।
3. **वॉलेट या कूपन थोपना गलत:** जब गलती कंपनी की हो, तो पैसे के बदले सिर्फ 'वॉलेट क्रेडिट' या 'कूपन' लेने के लिए उपभोक्ता को बाध्य नहीं किया जा सकता।`,
    sources: [
      {
        title: 'Consumer Protection (E-Commerce) Rules, 2020',
        url: 'https://consumeraffairs.nic.in/acts-and-rules/consumer-protection',
        organization: 'Department of Consumer Affairs',
        sectionRef: 'Rule 5 & 6',
      },
      {
        title: 'National Consumer Helpline Portal',
        url: 'https://consumerhelpline.gov.in/',
        organization: 'Govt of India',
      },
    ],
    nextStepsEn: [
      'Document proof of return shipment / pickup receipt and tracking status.',
      'Check if the marketplace provided a refund reference number; check your bank statement.',
      'Lodge a ticket with the marketplace Nodal Grievance Officer (statutorily required to resolve within 1 month).',
      'Escalate to National Consumer Helpline (Call 1915 or WhatsApp 8800001915).',
    ],
    nextStepsHi: [
      'रिटर्न पिकअप रसीद और ट्रैकिंग आईडी का स्क्रीनशॉट संभाल कर रखें।',
      'संबंधित प्लेटफॉर्म के नोडल ग्रीवेंस ऑफिसर को लिखित शिकायत भेजें।',
      'यदि बैंक खाते में पैसा न आए, तो राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) पर शिकायत करें।',
    ],
  },
  mrp: {
    keywords: ['mrp', 'overcharging', 'extra charge', 'printed price', 'more than mrp', 'dual mrp', 'cooling charge'],
    titleEn: 'Prohibition of Overcharging Above MRP',
    titleHi: 'एमआरपी (MRP) से अधिक दाम वसूलने पर प्रतिबंध',
    contentEn: `### Legal Provisions Under Legal Metrology Act, 2009
Under **Rule 18(2) of the Legal Metrology (Packaged Commodities) Rules, 2011**, no retail dealer or other person shall make any sale of any commodity in packed form at a price exceeding the **Maximum Retail Price (MRP)** printed on the package.

### Common Illegal Practices:
* **"Chilling / Refrigeration Charges":** Adding ₹5 to ₹10 extra for cold drinks, milk, or packaged water is illegal. Consumer courts have repeatedly held that cooling costs are part of the retailer’s overheads.
* **Dual MRP:** Manufacturers are prohibited from declaring different MRPs for identical commodities sold at airports, multiplexes, or malls compared to ordinary retail stores.
* **Taxes on MRP:** Since MRP by definition includes all applicable taxes (GST, local levies), charging additional GST on top of the printed MRP is illegal.

### Penalties for the Offender:
Under Section 36 of the Legal Metrology Act, 2009, selling above MRP attracts fines up to ₹25,000 for the first offence, ₹50,000 for the second offence, and up to ₹1,00,000 or imprisonment for subsequent offences.`,
    contentHi: `### विधिक मापविज्ञान कानून के नियम
**विधिक मापविज्ञान (पैकेज्ड वस्तुएं) नियम, 2011 के नियम 18(2)** के अंतर्गत, किसी भी पैकेज्ड वस्तु को उस पर अंकित अधिकतम खुदरा मूल्य (MRP) से अधिक दर पर बेचना कानूनन अपराध है।

### प्रमुख गैर-कानूनी बातें:
* **चिलिंग या ठंडा करने का अतिरिक्त शुल्क:** कोल्ड ड्रिंक, पानी या दूध पर 'ठंडा करने का चार्ज' (₹5-10) जोड़ना पूर्णतः गैर-कानूनी है।
* **दोहरा MRP (Dual MRP):** एयरपोर्ट, मॉल या सिनेमा हॉल के लिए एक ही वस्तु पर अलग-अलग एमआरपी छापना प्रतिबंधित है।
* **MRP पर दोबारा टैक्स लगाना:** चूंकि MRP में सभी टैक्स (GST सहित) पहले से शामिल होते हैं, अतः MRP के ऊपर दोबारा GST जोड़ना अपराध है।

### उल्लंघन पर दंड:
विधिक मापविज्ञान अधिनियम की धारा 36 के तहत ₹25,000 से लेकर ₹1,00,000 तक का जुर्माना और जेल का प्रावधान है।`,
    sources: [
      {
        title: 'Legal Metrology (Packaged Commodities) Rules, 2011',
        url: 'https://consumeraffairs.nic.in/acts-and-rules/legal-metrology',
        organization: 'Ministry of Consumer Affairs',
        sectionRef: 'Rule 18(2)',
      },
      {
        title: 'National Consumer Helpline',
        url: 'https://consumerhelpline.gov.in/',
        organization: 'Govt of India',
      },
    ],
    nextStepsEn: [
      'Take a photo of the printed MRP on the package and demand a printed tax receipt showing the excess amount.',
      'Report the violation directly to the District Legal Metrology Inspector or State Weights & Measures Dept.',
      'File a complaint via NCH Portal or dial 1915.',
    ],
    nextStepsHi: [
      'सामान पर छपे MRP की फोटो लें और दुकानदार से पक्का बिल मांगें जिसमें अधिक ली गई राशि दर्ज हो।',
      'जिला विधिक मापविज्ञान अधिकारी (बाट और माप विभाग) से शिकायत करें।',
      'राष्ट्रीय उपभोक्ता हेल्पलाइन 1915 पर तत्काल रिपोर्ट करें।',
    ],
  },
  complaint: {
    keywords: ['file', 'complaint', 'how to complain', 'consumer forum', 'consumer court', 'procedure', 'edaakhil', 'ncdrc'],
    titleEn: 'Step-by-Step Procedure to File a Consumer Complaint in India',
    titleHi: 'भारत में उपभोक्ता शिकायत दर्ज करने की पूरी कानूनी प्रक्रिया',
    contentEn: `### Hierarchy & Pecuniary Jurisdiction of Consumer Commissions
Under the **Consumer Protection Act, 2019**, consumer disputes are adjudicated across a 3-tier quasi-judicial system based on the value of goods/services paid:
1. **District Consumer Disputes Redressal Commission (DCDRC):** Up to **₹50 Lakhs** value.
2. **State Consumer Disputes Redressal Commission (SCDRC):** From **₹50 Lakhs to ₹2 Crores**.
3. **National Commission (NCDRC):** Claims exceeding **₹2 Crores**.

### Stage 1: Pre-Litigation Informal Resolution (NCH)
Before proceeding to formal litigation, register a complaint with the **National Consumer Helpline (NCH)** via **1915** or **consumerhelpline.gov.in**. Hundreds of companies are convergence partners and resolve matters amicably within 15–30 days.

### Stage 2: Legal Demand Notice
Send a formal 15-day or 30-day notice via Registered Post / Email detailing the grievance, documents attached, and the specific relief claimed (refund, replacement, compensation).

### Stage 3: Digital Filing on e-Jagriti (e-Daakhil)
If no satisfactory remedy is offered:
* Register on **edaakhil.nic.in** / **e-jagriti.gov.in**.
* You do not strictly require an advocate; a consumer can represent themselves in person.
* Nominal court fees apply (Free for claims up to ₹5 Lakhs, minor fees for higher slabs).
* You can attend hearings through video-conferencing.`,
    contentHi: `### उपभोक्ता आयोगों की अधिकारिता (Pecuniary Jurisdiction)
**उपभोक्ता संरक्षण अधिनियम, 2019** के तहत 3-स्तरीय व्यवस्था है:
1. **जिला उपभोक्ता आयोग (DCDRC):** ₹50 लाख तक के मामले।
2. **राज्य उपभोक्ता आयोग (SCDRC):** ₹50 लाख से ₹2 करोड़ तक।
3. **राष्ट्रीय उपभोक्ता आयोग (NCDRC):** ₹2 करोड़ से अधिक के मामले।

### चरण 1: राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH)
कोर्ट जाने से पहले टोल-फ्री **1915** पर कॉल करके या **consumerhelpline.gov.in** पर शिकायत दर्ज करें। अधिकांश कंपनियां 15-30 दिनों में समझौता कर लेती हैं।

### चरण 2: औपचारिक नोटिस
कंपनी को 15 या 30 दिन का कानूनी नोटिस भेजें, जिसमें समस्या का विवरण, बिल और आपकी मांग (रिफंड/मुआवजा) शामिल हो।

### चरण 3: ई-दाखिल (e-Daakhil) पर ऑनलाइन केस
यदि कंपनी न माने तो **edaakhil.nic.in** पर स्वयं ऑनलाइन केस दर्ज करें। इसके लिए वकील रखना अनिवार्य नहीं है; उपभोक्ता स्वयं अपना पक्ष रख सकते हैं। ₹5 लाख तक के दावों पर कोई कोर्ट फीस नहीं है।`,
    sources: [
      {
        title: 'e-Jagriti (e-Daakhil) Online Case Filing',
        url: 'https://e-jagriti.gov.in/',
        organization: 'NCDRC & Ministry of Consumer Affairs',
        sectionRef: 'Online Redressal Portal',
      },
      {
        title: 'National Consumer Disputes Redressal Commission',
        url: 'http://ncdrc.nic.in/',
        organization: 'Judicial Forum',
      },
    ],
    nextStepsEn: [
      'Calculate total pecuniary value (Amount paid + reasonable compensation for mental agony).',
      'Organize all evidence: Invoices, warranty cards, courier slips, chat logs, photographs.',
      'Send a formal 15-day legal notice giving the company an opportunity to settle.',
      'Log into e-Daakhil, upload documents as PDF, and file before the appropriate District Commission.',
    ],
    nextStepsHi: [
      'कुल दावे की राशि जोड़ें (भुगतान किया गया मूल्य + मानसिक परेशानी हेतु उचित मुआवजा)।',
      'सभी दस्तावेज तैयार करें: बिल, ईमेल, चैट, तस्वीरें और बैंक स्टेटमेंट।',
      'कंपनी को 15 दिन का लिखित नोटिस दें।',
      'ई-दाखिल (e-Daakhil) पोर्टल पर पीडीएफ अपलोड करके केस फाइल करें।',
    ],
  },
  ecommerce: {
    keywords: ['ecommerce', 'e-commerce', 'flipkart', 'amazon', 'online shopping', 'fake item', 'wrong item', 'delivery delay'],
    titleEn: 'Rights Against E-Commerce Platforms & Online Marketplaces',
    titleHi: 'ई-कॉमर्स प्लेटफॉर्म और ऑनलाइन शॉपिंग पर आपके अधिकार',
    contentEn: `### Key Rules Under Consumer Protection (E-Commerce) Rules, 2020
1. **Grievance Officer Appointment:** Every e-commerce entity is mandated to display the name, designation, and contact details of a Grievance Redressal Officer on their platform. They must acknowledge complaints within 48 hours and redress them within 1 month.
2. **Prohibition of Unfair Trade Practices:** Manipulating search results, showing fake ratings, or bait-and-switch pricing is strictly prohibited.
3. **Country of Origin & Expiry Details:** Platforms must explicitly show the Country of Origin, expiry date, manufacturer info, and full breakup of price including delivery charges before purchase.
4. **Dark Patterns Banned:** Under CCPA 2023 Guidelines, practices like 'Basket Sneaking', 'Forced Action', 'False Urgency', and 'Subscription Traps' are illegal.`,
    contentHi: `### ई-कॉमर्स नियम 2020 के प्रमुख बिंदु
1. **शिकायत अधिकारी (Grievance Officer):** हर शॉपिंग वेबसाइट को अपनी वेबसाइट पर शिकायत अधिकारी का नाम व ईमेल देना अनिवार्य है। उन्हें 48 घंटे में पावती और 1 महीने में निवारण करना होगा।
2. **डार्क पैटर्न पर रोक:** 2023 के दिशानिर्देशों के अनुसार कार्ट में जबरन सामान जोड़ना, फर्जी उल्टी गिनती (False Urgency) और सब्सक्रिप्शन ट्रैप लगाना कानूनन अपराध है।
3. **उत्पाद की पूर्ण जानकारी:** वस्तु का निर्माण देश (Country of Origin), एक्सपायरी तारीख और सभी टैक्स का विवरण पहले दिखाना आवश्यक है।`,
    sources: [
      {
        title: 'Guidelines for Prevention and Regulation of Dark Patterns, 2023',
        url: 'https://consumeraffairs.nic.in/acts-and-rules/consumer-protection',
        organization: 'Central Consumer Protection Authority',
      },
    ],
    nextStepsEn: [
      'Capture screenshots of product listing, invoice, and actual item received.',
      'Contact the platform Grievance Officer directly via email with order ID.',
      'Lodge a ticket on National Consumer Helpline (1915).',
    ],
    nextStepsHi: [
      'ऑर्डर लिस्टिंग, बिल और मिले हुए सामान की तस्वीरें सुरक्षित रखें।',
      'वेबसाइट पर दिए गए ग्रीवेंस ऑफिसर को ऑर्डर नंबर सहित ईमेल भेजें।',
      'राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) पर ऑनलाइन शिकायत दर्ज करें।',
    ],
  },
  misleading: {
    keywords: ['misleading', 'ad', 'advertisement', 'fake claim', 'false claim', 'celebrity', 'influencer'],
    titleEn: 'Protection Against Misleading Advertisements & False Claims',
    titleHi: 'भ्रामक विज्ञापनों और झूठे दावों के खिलाफ संरक्षण',
    contentEn: `### CCPA Guidelines on Misleading Advertisements, 2022
Under **Section 21 of the Consumer Protection Act, 2019**, the Central Consumer Protection Authority (CCPA) possesses powers to investigate and penalize misleading ads.

* **Penalties on Manufacturers/Advertisers:** Fines up to **₹10 Lakhs** for the first contravention and up to **₹50 Lakhs** for every subsequent contravention.
* **Celebrity & Influencer Liability:** Influencers and endorsers must conduct due diligence regarding claims. The CCPA can prohibit an endorser from endorsing any product for up to 1 to 3 years.
* **Banned Advertisements:** Surrogate advertisements (advertising liquor under the guise of club soda/music CDs), bait advertisements with non-existent discount stocks, and unsubstantiated health claims are illegal.`,
    contentHi: `### भ्रामक विज्ञापन दिशानिर्देश 2022
**उपभोक्ता संरक्षण अधिनियम 2019 की धारा 21** के तहत केंद्रीय उपभोक्ता संरक्षण प्राधिकरण (CCPA) को जांच और भारी जुर्माना लगाने का अधिकार है।

* **जुर्माना:** पहली बार उल्लंघन पर ₹10 लाख तक और दोबारा उल्लंघन पर ₹50 लाख तक का जुर्माना।
* **इन्फ्लुएंसर और सेलिब्रिटी की जिम्मेदारी:** प्रचार करने वालों को दावों की सच्चाई जांचनी होगी; झूठे प्रचार पर 1 से 3 साल तक के लिए विज्ञापन करने पर प्रतिबंध लगाया जा सकता है।
* **सरोगेट विज्ञापन वर्जित:** शराब या तंबाकू का क्लब सोडा या म्यूजिक के नाम पर छद्म प्रचार पूरी तरह गैर-कानूनी है।`,
    sources: [
      {
        title: 'CCPA Guidelines on Misleading Advertisements 2022',
        url: 'https://consumeraffairs.nic.in/',
        organization: 'Department of Consumer Affairs',
      },
      {
        title: 'Advertising Standards Council of India (ASCI)',
        url: 'https://www.ascionline.in/',
        organization: 'Self Regulatory Organization',
      },
    ],
    nextStepsEn: [
      'Take a recording or screenshot of the misleading advertisement and the product packaging.',
      'Lodge an online complaint on the ASCI Portal (ascionline.in).',
      'Submit a formal complaint to the Central Consumer Protection Authority (CCPA) via email or NCH.',
    ],
    nextStepsHi: [
      'भ्रामक विज्ञापन का वीडियो, स्क्रीनशॉट या अखबार की कटिंग संभालें।',
      'ASCI पोर्टल (ascionline.in) पर ऑनलाइन शिकायत दर्ज करें।',
      'सीसीपीए (CCPA) अथवा राष्ट्रीय उपभोक्ता हेल्पलाइन पर शिकायत भेजें।',
    ],
  },
};

export const INITIAL_SAMPLE_SESSIONS: ChatSession[] = [
  {
    id: 'sample-session-1',
    title: 'Defective LED TV Display Lines',
    topicId: 'defective-products',
    createdAt: '2026-10-27T10:15:00.000Z',
    updatedAt: '2026-10-27T10:18:00.000Z',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'I purchased a 55-inch Smart TV 2 months ago. Thin horizontal lines appeared on the screen. The brand service center says panel replacement will take 60 days or requires ₹8,000 labour charge. What are my legal remedies?',
        timestamp: '10:15 AM',
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: `### Legal Evaluation Under Consumer Protection Act, 2019
Under **Section 2(11) of the Consumer Protection Act, 2019**, any shortcoming in product performance during the statutory warranty period constitutes a **Deficiency in Service** and a **Product Defect**.

### Key Legal Grounds:
1. **Unreasonable Delay (60 Days):** Forcing a consumer to wait 60 days without an interim backup or replacement is legally impermissible. Service centers are bound to provide repairs within a reasonable duration (typically 14–21 business days).
2. **Charging Labour During Warranty:** If the warranty is active, demanding hidden 'labour charges' or 'service fees' for manufacturing defects constitutes an **Unfair Trade Practice** under Section 2(47).
3. **Right to Complete Unit Replacement:** If the core display panel cannot be fixed promptly, you are statutorily entitled to a brand new television or a 100% refund.`,
        timestamp: '10:16 AM',
        topicId: 'defective-products',
        sources: [
          {
            title: 'Consumer Protection Act, 2019 - Bare Act',
            url: 'https://www.indiacode.nic.in/handle/123456789/15256',
            organization: 'Ministry of Law and Justice',
            sectionRef: 'Section 2(11) Deficiency of Service',
          },
          {
            title: 'National Consumer Helpline (NCH)',
            url: 'https://consumerhelpline.gov.in/',
            organization: 'Department of Consumer Affairs',
          },
        ],
        nextSteps: [
          'Email the brand corporate escalation desk with copy of Tax Invoice & Service Job Sheet.',
          'State clearly that asking for labour charges during warranty violates CPA 2019 Section 2(47).',
          'Lodge a docket on National Consumer Helpline (NCH) by dialling 1915.',
          'Draft a 15-day formal notice using the LegalEase Complaint Letter Generator.',
        ],
      },
    ],
  },
  {
    id: 'sample-session-2',
    title: 'E-commerce Platform Refused Refund',
    topicId: 'refunds-returns',
    createdAt: '2026-10-26T14:30:00.000Z',
    updatedAt: '2026-10-26T14:32:00.000Z',
    messages: [
      {
        id: 'msg-3',
        role: 'user',
        content: 'I ordered a winter jacket online. The seller delivered a completely wrong size and faded color. When I initiated a return, the app customer care rejected it saying "Clearance items cannot be returned". Is this legal?',
        timestamp: '02:30 PM',
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: `### Analysis Under Consumer Protection (E-Commerce) Rules, 2020
**No, this is not legal.** Even if items are advertised on "clearance" or "flash sale", sellers are legally bound to deliver goods that match the agreed specifications and description.

### Applicable Legal Rules:
* **Rule 6(2) of E-Commerce Rules, 2020:** Specifically states that no marketplace or seller shall refuse to accept returns or refuse refunds if the goods delivered are late, defective, or not conforming to the agreed characteristics.
* **Section 2(47) CPA 2019:** Delivering a wrong size/color and then refusing to rectify it constitutes an outright Unfair Trade Practice.
* **Unfair Contract Clauses:** Disclaimers like *"Sale items are final sale"* are void when the seller is at fault for wrong delivery.`,
        timestamp: '02:31 PM',
        topicId: 'refunds-returns',
        sources: [
          {
            title: 'Consumer Protection (E-Commerce) Rules, 2020',
            url: 'https://consumeraffairs.nic.in/acts-and-rules/consumer-protection',
            organization: 'DoCA',
            sectionRef: 'Rule 6(2)',
          },
        ],
        nextSteps: [
          'Capture screenshots of the order page showing the size ordered versus the label on the received jacket.',
          'Send a formal grievance to the platform’s Nodal Grievance Officer.',
          'Dial 1915 to lodge an immediate National Consumer Helpline complaint.',
        ],
      },
    ],
  },
];
