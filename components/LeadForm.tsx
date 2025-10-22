
import React, { useState } from 'react';
import type { FormData } from '../types';

interface LeadFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

const initialFormData: FormData = {
  full_name: '',
  phone: '',
  business_name: '',
  business_type: '',
  monthly_ad_budget: undefined,
  interest_level: '',
  preferred_contact_time: '',
  notes: '',
};

const businessTypeOptions = ["مخبز", "مقهى", "مطعم", "محل تجاري", "خدمة"];
const interestLevelOptions = ["نعم الآن", "نعم لاحقاً", "غير مهتم"];

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumberInput = type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumberInput ? (value ? parseFloat(value) : undefined) : value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as FormData['interest_level'] }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-teal-600">تسجيل عميل محتمل جديد</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="full_name" className="mb-2 font-semibold text-slate-700">الاسم الكامل <span className="text-red-500">*</span></label>
          <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-2 font-semibold text-slate-700">رقم الهاتف (WhatsApp) <span className="text-red-500">*</span></label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
        </div>

        {/* Business Name */}
        <div className="flex flex-col">
          <label htmlFor="business_name" className="mb-2 font-semibold text-slate-700">اسم المشروع</label>
          <input type="text" id="business_name" name="business_name" value={formData.business_name} onChange={handleChange} className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
        </div>

        {/* Business Type */}
        <div className="flex flex-col">
          <label htmlFor="business_type" className="mb-2 font-semibold text-slate-700">نوع النشاط <span className="text-red-500">*</span></label>
          <select id="business_type" name="business_type" value={formData.business_type} onChange={handleChange} required className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white">
            <option value="" disabled>اختر نوع النشاط</option>
            {businessTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        
        {/* Ad Budget */}
        <div className="flex flex-col">
          <label htmlFor="monthly_ad_budget" className="mb-2 font-semibold text-slate-700">ميزانية إشهار شهرية (درهم)</label>
          <input type="number" id="monthly_ad_budget" name="monthly_ad_budget" value={formData.monthly_ad_budget || ''} onChange={handleChange} min="0" className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
        </div>
        
        {/* Preferred Contact Time */}
        <div className="flex flex-col">
            <label htmlFor="preferred_contact_time" className="mb-2 font-semibold text-slate-700">وقت الاتصال المفضل</label>
            <input type="text" id="preferred_contact_time" name="preferred_contact_time" value={formData.preferred_contact_time} onChange={handleChange} className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
        </div>

        {/* Interest Level */}
        <div className="md:col-span-2">
            <label className="mb-3 block font-semibold text-slate-700">هل مهتم بإطلاق حملة دابا؟ <span className="text-red-500">*</span></label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {interestLevelOptions.map(opt => (
                    <div key={opt} className="flex items-center">
                        <input type="radio" id={opt} name="interest_level" value={opt} checked={formData.interest_level === opt} onChange={handleRadioChange} required className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500"/>
                        <label htmlFor={opt} className="ms-2 text-sm font-medium text-slate-900">{opt}</label>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Notes */}
        <div className="md:col-span-2">
            <label htmlFor="notes" className="mb-2 font-semibold text-slate-700">ملاحظات إضافية</label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition w-full"></textarea>
        </div>

        {/* Consent */}
        <div className="md:col-span-2 text-sm text-slate-500">
             <p>بالموافقة على إرسال هذا الاستمارة، أنت توافق على أن نتواصل معك عبر الهاتف أو الواتساب لأغراض تسويقية.</p>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
            <button type="submit" disabled={isSubmitting} className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:bg-slate-400">
                {isSubmitting ? 'جاري الإرسال...' : 'إضافة العميل'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
