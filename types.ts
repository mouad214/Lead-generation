
export interface FormData {
  full_name: string;
  phone: string;
  business_name?: string;
  business_type: 'مخبز' | 'مقهى' | 'مطعم' | 'محل تجاري' | 'خدمة' | '';
  monthly_ad_budget?: number;
  interest_level: 'نعم الآن' | 'نعم لاحقاً' | 'غير مهتم' | '';
  preferred_contact_time?: string;
  notes?: string;
}

export type LeadStatus = 'Hot Lead' | 'Warm Lead' | 'Cold Lead';

export interface Lead extends FormData {
  id: string;
  createdAt: string;
  score: number;
  status: LeadStatus;
  next_action: string;
}
