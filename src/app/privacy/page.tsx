import { Sparkles, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-cyan-950/20 border border-cyan-800/10 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Effective date: July 10, 2026</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-900 text-xs text-slate-400 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">1. Medical Records & HIPAA Compliance</h2>
          <p>
            At Aura Dental Clinic, we treat your medical charts and scheduling logs with the highest security. We operate under strict compliance with the Health Insurance Portability and Accountability Act (HIPAA). All intraoral scan files, digital smile models, and patient health history entries are encrypted both in transit and at rest.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">2. Information Collection & Booking Data</h2>
          <p>
            When scheduling consultations on our wizard, we collect demographic data (name, email, phone number) and description logs of symptoms. This metadata assists our clinical directors in preparing surgery rooms and matching your request with qualified orthodontists.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">3. Third Party Integrations & Processing</h2>
          <p>
            Payment transactions are secured via Razorpay sandbox and merchant frameworks. We do not store raw credit card numbers on our Express server. Diagnostic descriptions passed to the AI chatbot are processed on secure internal scripts with zero external data sharing.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">4. Contact Rights & Updates</h2>
          <p>
            Patients retain rights to review, correct, or request deletion of account credentials. If you have questions about data processing, contact our privacy director at <span className="text-cyan-400">privacy@auradental.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
