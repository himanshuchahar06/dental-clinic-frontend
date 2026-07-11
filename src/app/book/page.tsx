'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, UserRound, Stethoscope, BadgeCheck, Loader2 } from 'lucide-react';
import api from '../../utils/api';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  category: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
}

function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedDocId = searchParams.get('doctorId');

  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected values
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // Patient details (if guest or custom login)
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    password: 'guestpass2026', // Auto-generated for guest patient booking
  });

  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch services and doctors on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, doctorsData] = await Promise.all([
          api.getServices(),
          api.getDoctors(),
        ]);
        setServices(servicesData.services);
        setDoctors(doctorsData.doctors);
        
        // Auto-select doctor if passed in query params
        if (preselectedDocId) {
          const matchedDoc = doctorsData.doctors.find((d: Doctor) => d.id === preselectedDocId);
          if (matchedDoc) setSelectedDoctor(matchedDoc);
        }
      } catch (err) {
        console.error('Failed to load scheduling catalogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [preselectedDocId]);

  // Generate general clinical hours list
  const hoursList = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleBooking = async () => {
    if (!selectedService || !selectedDoctor || !selectedDate || !selectedTime) {
      setError('Please complete all wizard steps.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // 1. Check if patient is authenticated
      let token = localStorage.getItem('clinic_token');
      
      // If not logged in, auto-register/login patient in background
      if (!token) {
        try {
          const authRes = await api.register({
            name: patientInfo.name,
            email: patientInfo.email,
            phone: patientInfo.phone,
            password: patientInfo.password,
          });
          token = authRes.token;
          localStorage.setItem('clinic_token', authRes.token);
          localStorage.setItem('clinic_role', 'PATIENT');
          localStorage.setItem('clinic_user', JSON.stringify(authRes.user));
          // Notify navbar to refresh auth states
          window.dispatchEvent(new Event('storage'));
        } catch (authErr) {
          // If already registered, attempt login
          const loginRes = await api.login({
            email: patientInfo.email,
            password: patientInfo.password,
          });
          token = loginRes.token;
          localStorage.setItem('clinic_token', loginRes.token);
          localStorage.setItem('clinic_role', 'PATIENT');
          localStorage.setItem('clinic_user', JSON.stringify(loginRes.user));
          window.dispatchEvent(new Event('storage'));
        }
      }

      // 2. Create the appointment ISO datetime string
      const [year, month, day] = selectedDate.split('-');
      const [hour, min] = selectedTime.split(':');
      // Create local date object then convert to ISO
      const appointmentDateTime = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(min)
      ).toISOString();

      // 3. Post booking to server
      await api.createAppointment({
        doctorId: selectedDoctor.id,
        serviceId: selectedService.id,
        dateTime: appointmentDateTime,
        notes: notes || `Symptom booking: ${selectedService.name}`,
      });

      // 4. Trigger simulated checkout
      setBookingSuccess(true);
    } catch (err) {
      setError((err as Error).message || 'This scheduling slot is currently unavailable. Please select another time.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Success View */}
      {bookingSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-10 rounded-3xl border-teal-500/30 text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />
          <div className="w-16 h-16 bg-teal-950/20 border border-teal-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            <BadgeCheck className="w-8 h-8 text-teal-400" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Appointment Scheduled!</h1>
          
          <div className="max-w-md mx-auto bg-slate-950/40 p-5 rounded-2xl border border-slate-900 text-xs text-left space-y-3 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Service:</span>
              <span className="font-semibold text-slate-100">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between border-t border-slate-900 pt-3">
              <span className="text-slate-500 font-medium">Doctor:</span>
              <span className="font-semibold text-slate-100">{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between border-t border-slate-900 pt-3">
              <span className="text-slate-500 font-medium">Scheduled:</span>
              <span className="font-semibold text-teal-400">{selectedDate} at {selectedTime}</span>
            </div>
            <div className="flex justify-between border-t border-slate-900 pt-3 text-[10px] text-slate-500">
              <span>Status:</span>
              <span className="uppercase tracking-wider font-bold text-amber-500 animate-pulse">Awaiting Confirmation</span>
            </div>
          </div>

          <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
            A copy of this reservation has been registered to your profile. A medical coordinator will reach out via SMS/Gmail shortly to confirm your booking.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 rounded-full text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors"
            >
              Return Home
            </button>
            <button
              onClick={() => {
                setBookingSuccess(false);
                setStep(1);
                setSelectedService(null);
                setSelectedDate('');
                setSelectedTime('');
              }}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              Book Another
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/20">
              <Sparkles className="w-3.5 h-3.5" /> Aura Smart Booking
            </span>
            <h1 className="text-2xl md:text-4xl font-light text-white">
              Schedule Your <span className="font-extrabold text-gradient-primary">Consultation</span>
            </h1>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-between items-center max-w-md mx-auto text-xs text-slate-500 font-semibold mb-6">
            {['Service', 'Doctor', 'Date', 'Verify'].map((name, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                  step >= idx + 1 ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500' : 'border-slate-800'
                }`}>
                  {idx + 1}
                </span>
                <span className={step === idx + 1 ? 'text-cyan-400' : ''}>{name}</span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-900 min-h-[300px]">
            <AnimatePresence mode="wait">
              {/* Step 1: Select Service */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Stethoscope className="w-4.5 h-4.5 text-cyan-400" /> Select Treatment Catalog
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => setSelectedService(svc)}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between h-[110px] cursor-pointer transition-all ${
                          selectedService?.id === svc.id
                            ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                            : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'
                        }`}
                      >
                        <div>
                          <span className="text-[9px] uppercase font-bold text-teal-400 tracking-wider block">{svc.category}</span>
                          <span className="text-sm font-bold text-white block mt-0.5">{svc.name}</span>
                        </div>
                        <div className="flex justify-between items-center w-full text-[10px] text-slate-400 pt-2 border-t border-slate-900/50">
                          <span>{svc.duration} mins</span>
                          <span className="font-semibold text-slate-200">${svc.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      disabled={!selectedService}
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                    >
                      Next: Choose Doctor
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Choose Doctor */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <UserRound className="w-4.5 h-4.5 text-cyan-400" /> Select Specialist Doctor
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {doctors.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDoctor(doc)}
                        className={`p-4 rounded-xl border text-center flex flex-col items-center gap-3 cursor-pointer transition-all ${
                          selectedDoctor?.id === doc.id
                            ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                            : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'
                        }`}
                      >
                        <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover border border-slate-900 shadow-md" />
                        <div>
                          <span className="text-xs font-bold text-white block">{doc.name}</span>
                          <span className="text-[9px] text-slate-500 block mt-0.5">{doc.specialization}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-2.5 border border-slate-800 text-slate-300 hover:bg-slate-900 text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                    >
                      Back
                    </button>
                    <button
                      disabled={!selectedDoctor}
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                    >
                      Next: Choose Schedule
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Calendar className="w-4.5 h-4.5 text-cyan-400" /> Choose Appointment Schedule
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date select */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Select Date</label>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                      />
                    </div>

                    {/* Time select */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 font-medium">Select Time Slot</label>
                      <div className="grid grid-cols-3 gap-2">
                        {hoursList.map((hour) => (
                          <button
                            key={hour}
                            type="button"
                            onClick={() => setSelectedTime(hour)}
                            className={`py-2 rounded-lg border text-center text-xs font-semibold cursor-pointer transition-all ${
                              selectedTime === hour
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500'
                                : 'bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-300'
                            }`}
                          >
                            {hour}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 border border-slate-800 text-slate-300 hover:bg-slate-900 text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                    >
                      Back
                    </button>
                    <button
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setStep(4)}
                      className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                    >
                      Next: Patient Info
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Patient Info & Verify */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Clock className="w-4.5 h-4.5 text-cyan-400" /> Patient Details & Verification
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={patientInfo.name}
                        onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                        placeholder="e.g. Victoria Sterling"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={patientInfo.email}
                        onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                        placeholder="e.g. victoria@sterling.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={patientInfo.phone}
                        onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                        placeholder="e.g. +1 (310) 555-0199"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Medical Symptoms or Notes</label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                        placeholder="Describe tooth pain, sensitivity, alignment goals, etc."
                      />
                    </div>
                  </div>

                  {/* Review box */}
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-900 space-y-2.5 text-xs text-slate-400">
                    <h3 className="font-bold text-slate-200 text-xs mb-2">Review Reservation Details</h3>
                    <div className="flex justify-between">
                      <span>Selected Treatment:</span>
                      <span className="font-semibold text-slate-200">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-900/60 pt-2.5">
                      <span>Doctor Specialist:</span>
                      <span className="font-semibold text-slate-200">{selectedDoctor?.name}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-900/60 pt-2.5">
                      <span>Appointment Time:</span>
                      <span className="font-semibold text-cyan-400">{selectedDate} at {selectedTime}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-900/60 pt-2.5">
                      <span>Estimated Duration:</span>
                      <span className="font-semibold text-slate-200">{selectedService?.duration} minutes</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-900/60 pt-2.5">
                      <span>Initial Consultation Fee:</span>
                      <span className="font-semibold text-teal-400">${selectedService?.price}</span>
                    </div>
                  </div>

                  {error && <p className="text-rose-400 text-[11px] font-medium animate-pulse">{error}</p>}

                  <div className="pt-6 flex justify-between">
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 border border-slate-800 text-slate-300 hover:bg-slate-900 text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                    >
                      Back
                    </button>
                    <button
                      disabled={submitting || !patientInfo.name || !patientInfo.email}
                      onClick={handleBooking}
                      className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                    >
                      {submitting ? 'Confirming...' : 'Book Appointment'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
