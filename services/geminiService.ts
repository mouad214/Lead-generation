
import { GoogleGenAI } from "@google/genai";
import type { Lead } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateWhatsAppMessage(lead: Lead): Promise<string> {
  const promptTemplate = `أنت مساعد تسويق مختص. عندك هذه بيانات العميل: {full_name}, {business_name}, {business_type}, {monthly_ad_budget}. اكتب رسالة واتساب مختصرة (2-3 جمل) بالدارجة المغربية، tono: ودي ومحترف، الهدف: تأكيد اهتمام وطلب ميعاد اتصال. إضافة CTA يطلب رقم وقت مناسب للاتصال.`;

  const prompt = promptTemplate
    .replace('{full_name}', lead.full_name)
    .replace('{business_name}', lead.business_name || 'مشروعه')
    .replace('{business_type}', lead.business_type)
    .replace('{monthly_ad_budget}', (lead.monthly_ad_budget || 'غير محدد').toString());

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating message with Gemini:", error);
    return "عذراً، لم نتمكن من إنشاء الرسالة. يرجى المحاولة مرة أخرى.";
  }
}
