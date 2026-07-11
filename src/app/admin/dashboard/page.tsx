'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Calendar, DollarSign, Users, UserRound, ArrowRightLeft, ShieldAlert, CheckCircle, XCircle, MailCheck, Loader2 } from 'lucide-react';
import api from '../../../utils/api';

interface Analytics {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  totalPatients: number;
  totalDoctors: number;
  totalRevenue: number;
}

interface Appointment {
  id: string;
  patient: { name: string; email: string; phone: string };
  doctor: { name: string; specialization: string };
  service: { name: string; price: number; duration: number };
  dateTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'UNREAD' | 'READ';
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'messages'>('appointments');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('clinic_token');
      const role = localStorage.getItem('clinic_role');
      
      if (!token || role !== 'ADMIN') {
        router.push('/admin/login');
        return;
      }

      try {
        const [analyticsData, apptData, msgData] = await Promise.all([
          api.getAnalytics(),
          api.getAppointments(),
          api.getContactMessages(),
        ]);

        setAnalytics(analyticsData.analytics);
        setAppointments(apptData.appointments);
        setMessages(msgData.messages);
      } catch (err) {
        console.error('Failed to load administrative logs:', err);
        // If unauthorized token, clear and redirect
        localStorage.removeItem('clinic_token');
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      await api.updateAppointment(id, { status: newStatus });
      // Update local state
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus as Appointment['status'] } : app))
      );
      // Refresh analytics
      const updatedAnalytics = await api.getAnalytics();
      setAnalytics(updatedAnalytics.analytics);
    } catch (err) {
      alert('Failed to update appointment: ' + (err as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await api.updateContactStatus(id, { status: 'READ' });
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: 'READ' } : msg))
      );
    } catch (err) {
      alert('Failed to update message: ' + (err as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-6 flex-wrap gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/20">
            <Sparkles className="w-3.5 h-3.5" /> Staff Control Room
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-1">Analytics Dashboard</h1>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('clinic_token');
            localStorage.removeItem('clinic_role');
            window.dispatchEvent(new Event('storage'));
            router.push('/');
          }}
          className="px-4.5 py-2 border border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
        >
          Sign Out Staff
        </button>
      </div>

      {/* Aggregate stats */}
      {analytics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-900 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Clinical Earnings</span>
              <p className="text-xl md:text-2xl font-extrabold text-white">${analytics.totalRevenue}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-950/20 border border-teal-800/20 flex items-center justify-center text-teal-400 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          {/* Appointments */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-900 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Bookings</span>
              <p className="text-xl md:text-2xl font-extrabold text-white">{analytics.totalAppointments}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-950/20 border border-cyan-800/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          {/* Patients */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-900 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Patients</span>
              <p className="text-xl md:text-2xl font-extrabold text-white">{analytics.totalPatients}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-950/20 border border-cyan-800/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Doctors */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-900 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Surgical Staff</span>
              <p className="text-xl md:text-2xl font-extrabold text-white">{analytics.totalDoctors}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-950/20 border border-teal-800/20 flex items-center justify-center text-teal-400 shrink-0">
              <UserRound className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-900 pb-2">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-2 px-1 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
            activeTab === 'appointments' ? 'border-cyan-500 text-white' : 'border-transparent text-slate-500 hover:text-white'
          }`}
        >
          Appointments ({appointments.length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-2 px-1 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
            activeTab === 'messages' ? 'border-cyan-500 text-white' : 'border-transparent text-slate-500 hover:text-white'
          }`}
        >
          Inbound Messages ({messages.length})
        </button>
      </div>

      {/* Content Panels */}
      <div className="glass-panel rounded-2xl border border-slate-900 overflow-x-auto min-h-[250px]">
        {activeTab === 'appointments' ? (
          appointments.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/60 text-slate-500 uppercase tracking-widest text-[10px] border-b border-slate-900">
                  <th className="p-4">Patient</th>
                  <th className="p-4">Doctor</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Scheduled Date</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-white">{app.patient.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{app.patient.email}</p>
                    </td>
                    <td className="p-4 text-slate-300 font-medium">{app.doctor.name}</td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-300">{app.service.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">${app.service.price}</p>
                    </td>
                    <td className="p-4 text-slate-300 font-medium">
                      {new Date(app.dateTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        app.status === 'CONFIRMED' ? 'bg-teal-950/40 text-teal-400 border border-teal-800/30' :
                        app.status === 'COMPLETED' ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/30' :
                        app.status === 'CANCELLED' ? 'bg-rose-950/40 text-rose-400 border border-rose-800/30' :
                        'bg-amber-950/40 text-amber-400 border border-amber-800/30'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        {app.status === 'PENDING' && (
                          <>
                            <button
                              disabled={actionLoading === app.id}
                              onClick={() => handleUpdateStatus(app.id, 'CONFIRMED')}
                              className="w-7 h-7 rounded bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center cursor-pointer transition-colors"
                              title="Confirm Appointment"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              disabled={actionLoading === app.id}
                              onClick={() => handleUpdateStatus(app.id, 'CANCELLED')}
                              className="w-7 h-7 rounded bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center cursor-pointer transition-colors"
                              title="Cancel Appointment"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {app.status === 'CONFIRMED' && (
                          <button
                            disabled={actionLoading === app.id}
                            onClick={() => handleUpdateStatus(app.id, 'COMPLETED')}
                            className="px-2 py-1 rounded bg-cyan-500 hover:bg-cyan-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Complete
                          </button>
                        )}
                        {app.status === 'COMPLETED' && <span className="text-[10px] text-slate-500 font-medium">Session Done</span>}
                        {app.status === 'CANCELLED' && <span className="text-[10px] text-rose-500 font-medium">Cancelled</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <ShieldAlert className="w-8 h-8 mx-auto text-slate-700" />
              <p className="text-xs">No clinic appointments booked yet.</p>
            </div>
          )
        ) : (
          messages.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/60 text-slate-500 uppercase tracking-widest text-[10px] border-b border-slate-900">
                  <th className="p-4">Contact</th>
                  <th className="p-4">Message Details</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-white">{msg.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{msg.email}</p>
                      <p className="text-[9px] text-slate-500">{msg.phone}</p>
                    </td>
                    <td className="p-4 text-slate-300 font-medium max-w-sm whitespace-pre-wrap">{msg.message}</td>
                    <td className="p-4 text-slate-400">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        msg.status === 'READ' ? 'bg-slate-950 text-slate-500 border border-slate-900' : 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/30'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {msg.status === 'UNREAD' && (
                        <button
                          onClick={() => handleMarkRead(msg.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer mx-auto transition-colors"
                        >
                          <MailCheck className="w-3.5 h-3.5" /> Read
                        </button>
                      )}
                      {msg.status === 'READ' && <span className="text-[10px] text-slate-600">Archived</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <ShieldAlert className="w-8 h-8 mx-auto text-slate-700" />
              <p className="text-xs">No client inquiries received.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
