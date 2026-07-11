'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldAlert, Sparkles, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkAuth = () => {
      const storedToken = localStorage.getItem('clinic_token');
      const role = localStorage.getItem('clinic_role'); // ADMIN or PATIENT
      setToken(storedToken);
      setUserRole(role);
    };

    window.addEventListener('scroll', handleScroll);
    checkAuth();

    // Listen to storage events to update auth dynamically
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('clinic_token');
    localStorage.removeItem('clinic_role');
    localStorage.removeItem('clinic_user');
    setToken(null);
    setUserRole(null);
    router.push('/');
    // Trigger storage event manually to sync components
    window.dispatchEvent(new Event('storage'));
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center border border-blue-400">
              <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div className="leading-none">
              <span className="text-md font-bold tracking-widest text-slate-900 uppercase block">
                AURA
              </span>
              <span className="text-[9px] font-semibold text-blue-600 tracking-wider uppercase block">
                Dental Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-medium uppercase tracking-wider transition-colors hover:text-blue-600 ${
                  pathname === link.href ? 'text-blue-600 font-bold' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-3">
                <Link
                  href={userRole === 'ADMIN' ? '/admin/dashboard' : '/book'}
                  className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-50/50 hover:bg-blue-50 transition-colors"
                >
                  <User className="w-3.5 h-3.5" /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="text-slate-500 hover:text-slate-900 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" /> Staff
              </Link>
            )}
            
            <Link
              href="/book"
              className="px-4.5 py-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:shadow-[0_4px_15px_rgba(37,99,235,0.2)] hover:scale-[1.02] transition-all"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-lg z-50 flex flex-col justify-between p-8 md:hidden"
          >
            {/* Top row */}
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center border border-blue-400">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold tracking-widest text-slate-900 uppercase block">
                    AURA
                  </span>
                  <span className="text-[8px] font-semibold text-blue-600 tracking-wider uppercase block">
                    Dental Clinic
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links Stack */}
            <div className="flex flex-col gap-6 my-auto items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium uppercase tracking-widest hover:text-blue-600 ${
                    pathname === link.href ? 'text-blue-600 font-bold' : 'text-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="w-full max-w-[280px] text-center mt-4 px-6 py-3 font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full"
              >
                Book Appointment
              </Link>
            </div>

            {/* Footer row */}
            <div className="flex flex-col items-center gap-4">
              {token ? (
                <div className="flex items-center gap-4">
                  <Link
                    href={userRole === 'ADMIN' ? '/admin/dashboard' : '/book'}
                    onClick={() => setIsOpen(false)}
                    className="text-blue-600 text-sm font-semibold hover:underline"
                  >
                    User Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-rose-600 text-sm font-semibold cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Staff Login
                </Link>
              )}
              <p className="text-[10px] text-slate-500">© 2026 Aura Dental Clinic. All Rights Reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
