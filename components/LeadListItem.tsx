
import React from 'react';
import type { Lead } from '../types';
import FireIcon from './icons/FireIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface LeadListItemProps {
  lead: Lead;
  onGenerateMessage: (lead: Lead) => void;
  isLoading: boolean;
  activeLeadId: string | null;
}

const statusStyles: { [key in Lead['status']]: { bg: string; text: string; ring: string } } = {
  'Hot Lead': { bg: 'bg-red-100', text: 'text-red-800', ring: 'ring-red-600/20' },
  'Warm Lead': { bg: 'bg-yellow-100', text: 'text-yellow-800', ring: 'ring-yellow-600/20' },
  'Cold Lead': { bg: 'bg-blue-100', text: 'text-blue-800', ring: 'ring-blue-600/20' },
};

const LeadListItem: React.FC<LeadListItemProps> = ({ lead, onGenerateMessage, isLoading, activeLeadId }) => {
  const styles = statusStyles[lead.status];

  return (
    <li className="bg-white p-5 rounded-xl shadow-md transition hover:shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <p className="text-lg font-bold text-slate-800 truncate">{lead.full_name}</p>
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${styles.bg} ${styles.text} ring-1 ring-inset ${styles.ring}`}>
            {lead.status === 'Hot Lead' && <FireIcon className="w-3 h-3 me-1 text-red-500" />}
            {lead.status}
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-1">{lead.business_type} - {lead.business_name || 'بدون اسم مشروع'}</p>
        <p className="text-sm text-slate-500">{lead.phone}</p>
      </div>

      <div className="flex-shrink-0 flex flex-col sm:items-end gap-2">
         <div className="text-right">
            <p className="font-bold text-xl text-teal-600">{lead.score}</p>
            <p className="text-xs text-slate-400">نقاط</p>
         </div>
         <p className="text-sm font-medium text-slate-600 mt-1"><span className="font-semibold">الإجراء التالي:</span> {lead.next_action}</p>
      </div>
      
      <div className="border-t sm:border-t-0 sm:border-s border-slate-200 ms-0 sm:ms-4 ps-0 sm:ps-4 pt-4 sm:pt-0 flex-shrink-0">
        <button
          onClick={() => onGenerateMessage(lead)}
          disabled={isLoading && activeLeadId === lead.id}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading && activeLeadId === lead.id ? (
             <>
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <span>جاري...</span>
             </>
          ) : (
             <>
              <WhatsAppIcon className="w-5 h-5"/>
              <span>رسالة WhatsApp</span>
             </>
          )}
        </button>
      </div>
    </li>
  );
};

export default LeadListItem;
