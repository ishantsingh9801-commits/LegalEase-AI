import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System prompt grounding the model as LegalEase AI
const SYSTEM_INSTRUCTION = `You are "LegalEase AI", a specialized legal awareness and consumer protection assistant for Indian consumers.
Your goal is to explain statutory rights under Indian Consumer Law in a clean, structured, empathetic, and practical manner.

Legal Grounding & Knowledge Base:
- Consumer Protection Act, 2019 (CPA 2019)
- Section 2(9): 6 Fundamental Consumer Rights (Safety, Information, Choice, Heard, Redressal, Consumer Awareness).
- Section 2(10) & 2(11): Defect in goods and Deficiency in service.
- Section 2(47): Unfair Trade Practices (e.g. false claims, refusing refunds for defective goods, refusing receipts).
- Chapter VI (Sections 82-87): Product Liability (Manufacturer and Seller obligations).
- Consumer Protection (E-Commerce) Rules, 2020: Mandatory appointment of Nodal Grievance Officer, 48h acknowledgement, 1 month redressal, prohibition against refusing returns on defective/misdescribed goods, ban on unfair cancellation fees.
- Legal Metrology (Packaged Commodities) Rules, 2011: Rule 18(2) strictly prohibiting selling above Maximum Retail Price (MRP), no extra chilling charges, ban on dual MRP.
- Central Consumer Protection Authority (CCPA) Guidelines: 2022 Misleading Advertisements, 2023 Guidelines for Prevention and Regulation of Dark Patterns.
- Consumer Dispute Redressal Commissions Pecuniary Jurisdiction:
  * District Commission (DCDRC): Claims up to ₹50 Lakhs.
  * State Commission (SCDRC): Claims from ₹50 Lakhs to ₹2 Crores.
  * National Commission (NCDRC): Claims exceeding ₹2 Crores.
- Official Dispute Portals: National Consumer Helpline (NCH - Toll-free 1915 or consumerhelpline.gov.in) and e-Jagriti / e-Daakhil (edaakhil.nic.in).

Formatting & Output Rules:
- Answer in the requested language (English or Hindi).
- Provide a structured response with Markdown headings (###), bullet points, and clean sections.
- Identify 2-4 concrete, actionable next steps for the consumer.
- Provide 1-3 genuine official source references (with real URLs to e.g. indiacode.nic.in, consumerhelpline.gov.in, consumeraffairs.nic.in, e-jagriti.gov.in).
- Always maintain educational tone. Include a quiet educational reminder that this is general legal education, not advocate legal representation.`;

// API endpoint for Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language = 'en', history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured in server environment.',
      });
    }

    // Format chat context if provided
    const userPrompt = `Language requested: ${language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}\n\nUser Question:\n${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: {
              type: Type.STRING,
              description: 'The comprehensive legal explanation formatted in clean Markdown with headings and bullet points.',
            },
            topicId: {
              type: Type.STRING,
              description: 'Topic category: consumer-rights, refunds-returns, defective-products, ecommerce-issues, misleading-ads, or overcharging-mrp',
            },
            nextSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3-4 actionable sequential steps the consumer should take.',
            },
            sources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  organization: { type: Type.STRING },
                  url: { type: Type.STRING },
                  sectionRef: { type: Type.STRING },
                },
                required: ['title', 'organization', 'url'],
              },
              description: 'Genuine official references (India Code, National Consumer Helpline, e-Jagriti, DoCA).',
            },
          },
          required: ['content', 'nextSteps', 'sources'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate legal response',
    });
  }
});

// API endpoint to enhance / format a formal complaint letter
app.post('/api/letter/enhance', async (req, res) => {
  try {
    const { formData, language = 'en' } = req.body;

    if (!formData) {
      return res.status(400).json({ error: 'Form data is required' });
    }

    const prompt = `Draft a high-standard, professional Legal Demand Notice & Consumer Complaint based on these details:
Complainant: ${formData.senderName || 'Consumer'}
Complainant Contact: ${formData.senderAddress || ''}, ${formData.senderPhone || ''}, ${formData.senderEmail || ''}
Opposite Party (Company): ${formData.companyName}
Company Address: ${formData.companyAddress || 'Customer Service / Registered Office'}
Product/Service: ${formData.productName}
Purchase Date: ${formData.purchaseDate}
Invoice/Order ID: ${formData.orderId || 'N/A'}
Amount Paid: ₹${formData.pricePaid || 'N/A'}
Grievance / Defect: ${formData.problemDescription}
Previous Attempts: ${formData.previousAttempts || 'None'}
Desired Remedy: ${formData.desiredResolution}
Statutory Response Time: ${formData.resolutionDeadlineDays || 15} days
Language: ${language === 'hi' ? 'Hindi' : 'English'}

Format it as an official legal notice with sections for:
1. Transaction Details & Consumer Status (Section 2(7) CPA 2019)
2. Statement of Facts & Defect / Deficiency in Service
3. Prior Efforts at Redressal & Breach of E-Commerce / Consumer Rules
4. Statutory Requisitions & Relief Claimed
5. Notice of Legal Proceedings before District Consumer Disputes Redressal Commission (DCDRC) and National Consumer Helpline (1915).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return res.json({ letter: response.text });
  } catch (error: any) {
    console.error('Error in /api/letter/enhance:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to enhance complaint letter',
    });
  }
});

// Mount Vite middleware in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`LegalEase AI server running on port ${port}`);
  });
}

startServer();
