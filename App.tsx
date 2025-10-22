
import React, { useState } from 'react';
import type { FormData, Lead } from './types';
import Header from './components/Header';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';
import GeneratedMessageModal from './components/GeneratedMessageModal';
import { calculateScore } from './services/leadService';
import { generateWhatsAppMessage } from './services/geminiService';

const App: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');

  const handleFormSubmit = (data: FormData) => {
    const { score, status, next_action } = calculateScore(data);
    const newLead: Lead = {
      ...data,
      id: `L-${Date.now()}`,
      createdAt: new Date().toISOString(),
      score,
      status,
      next_action,
    };
    setLeads(prevLeads => [newLead, ...prevLeads]);
  };

  const handleGenerateMessage = async (lead: Lead) => {
    setIsLoading(true);
    setActiveLeadId(lead.id);
    try {
      const message = await generateWhatsAppMessage(lead);
      setGeneratedMessage(message);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      setGeneratedMessage('حدث خطأ أثناء إنشاء الرسالة. يرجى المحاولة مرة أخرى.');
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
      setActiveLeadId(null);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <Header />
      <main>
        <LeadForm onSubmit={handleFormSubmit} isSubmitting={false} />
        <LeadList 
          leads={leads}
          onGenerateMessage={handleGenerateMessage}
          isLoading={isLoading}
          activeLeadId={activeLeadId}
        />
      </main>
      <GeneratedMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={generatedMessage}
        title="رسالة WhatsApp المقترحة"
      />
      <footer className="text-center mt-12 text-sm text-slate-400">
        <p>تأكد من احترام قوانين المغرب المتعلقة بالاتصال والتسويق والخصوصية.</p>
      </footer>
    </div>
  );
};

export default App;
