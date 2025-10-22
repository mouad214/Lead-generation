
import type { FormData, LeadStatus } from '../types';

interface QualificationResult {
  score_add: number;
  status: LeadStatus;
  next_action: string;
}

// Qualification based on interest level
const qualifyLead = (formData: FormData): QualificationResult => {
  const budget = formData.monthly_ad_budget || 0;
  
  if (formData.interest_level === 'نعم الآن' && budget >= 100) {
    return { score_add: 50, status: 'Hot Lead', next_action: 'Call within 2 hours' };
  }
  if (formData.interest_level === 'نعم الآن') {
     return { score_add: 40, status: 'Hot Lead', next_action: 'Call within 2 hours' };
  }
  if (formData.interest_level === 'نعم لاحقاً') {
    return { score_add: 20, status: 'Warm Lead', next_action: 'Follow-up in 3 days' };
  }
  if (formData.interest_level === 'غير مهتم') {
    return { score_add: 0, status: 'Cold Lead', next_action: 'Add to newsletter list' };
  }
  return { score_add: 0, status: 'Cold Lead', next_action: 'Review Manually' };
};

// Scoring based on other factors
export const calculateScore = (formData: FormData): { score: number; status: LeadStatus; next_action: string } => {
  let score = 10; // base_score
  const budget = formData.monthly_ad_budget || 0;

  const qualification = qualifyLead(formData);
  score += qualification.score_add;

  if (budget >= 500) {
    score += 30;
  } else if (budget >= 100) {
    score += 15;
  }

  if (formData.business_type === 'مخبز' || formData.business_type === 'مطعم') {
    score += 10;
  }

  let finalStatus: LeadStatus = 'Cold Lead';
  if (score >= 60) finalStatus = 'Hot Lead';
  else if (score >= 30) finalStatus = 'Warm Lead';

  // The qualification status should take precedence if it's more urgent
  const status = finalStatus === 'Hot Lead' || qualification.status === 'Hot Lead' ? 'Hot Lead' :
                 finalStatus === 'Warm Lead' || qualification.status === 'Warm Lead' ? 'Warm Lead' : 'Cold Lead';

  return { score, status, next_action: qualification.next_action };
};
