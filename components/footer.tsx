'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="mt-24 pt-16 pb-8 border-t border-black/5 dark:border-white/10 glass rounded-t-[40px] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 flex items-center justify-center relative rounded-xl overflow-hidden">
                <Image 
                  src="/logo.png?v=3" 
                  alt="HSTU Research Society Logo" 
                  width={48}
                  height={48}
                  unoptimized
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-xl tracking-tight">HSTU Research Society</span>
            </div>
            <p className="text-primary-light/70 dark:text-primary/70 max-w-xs">
              Analyze, Strategize, Improvise. Empowering the next generation of researchers through community, innovation, and action.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, rotate: 12, y: -2 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-info-light transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">Quick Links</h4>
            {[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about/leadership/executive' },
              { label: 'Gallery', href: '/content/gallery' },
              { label: 'Events', href: '/events/upcoming' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-primary-light/70 dark:text-primary/70 hover:text-info-light transition-colors flex items-center gap-2 group">
                <span className="w-0 h-[2px] bg-info-light transition-all duration-300 group-hover:w-4"></span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">Resources</h4>
            {[
              { label: 'Constitution', href: '/about/constitution' },
              { label: 'History', href: '/about/history' },
              { label: 'Magazine', href: '/content/magazine' },
              { label: 'Certificate Verification', href: '/verification/certificate' },
              { label: 'FAQ', href: '/contact/faq' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-primary-light/70 dark:text-primary/70 hover:text-info-light transition-colors flex items-center gap-2 group">
                <span className="w-0 h-[2px] bg-info-light transition-all duration-300 group-hover:w-4"></span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">Contact Info</h4>
            <div className="flex items-start gap-3 text-primary-light/70 dark:text-primary/70">
              <MapPin className="w-5 h-5 shrink-0 mt-1 text-info-light" />
              <p>Dr. Muhammad Qudrat-I- Khuda Academic building, Level 2 <br />Dinajpur, Bangladesh</p>
            </div>
            <div className="flex items-center gap-3 text-primary-light/70 dark:text-primary/70 mt-2">
              <Mail className="w-5 h-5 shrink-0 text-info-light" />
              <p>hstu.rs@gmail.com</p>
            </div>
            <motion.a 
              href="https://forms.gle/3NG63JDYm9Qmgg379"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex items-center justify-between px-6 py-4 glass rounded-2xl hover:bg-white/80 dark:hover:bg-white/15 transition-colors cursor-pointer group"
            >
              <span className="font-semibold text-sm group-hover:text-info-light transition-colors">Join our Newsletter</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/5 dark:border-white/10 gap-4 text-sm text-primary-light/60 dark:text-primary/60">
          <p>© {new Date().getFullYear()} HSTU Research Society. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-info-light transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-info-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
