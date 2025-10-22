
import React from 'react';
import type { Lead } from '../types';
import LeadListItem from './LeadListItem';

interface LeadListProps {
  leads: Lead[];
  onGenerateMessage: (lead: Lead) => void;
  isLoading: boolean;
  activeLeadId: string | null;
}

const LeadList: React.FC<LeadListProps> = ({ leads, onGenerateMessage, isLoading, activeLeadId }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-teal-600">قائمة العملاء المحتملين</h2>
      {leads.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <p className="text-slate-500">لم تتم إضافة أي عملاء بعد. ابدأ بملء النموذج أعلاه!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {leads.map(lead => (
            <LeadListItem 
              key={lead.id} 
              lead={lead}
              onGenerateMessage={onGenerateMessage}
              isLoading={isLoading}
              activeLeadId={activeLeadId}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeadList;
