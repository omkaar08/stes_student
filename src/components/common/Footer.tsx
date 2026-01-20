'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const accent = '#0A6E8A';
  const highlight = '#E91E63';

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* University Info */}
          <div>
            <h3 className="text-base font-bold mb-3" style={{ color: accent }}>
              University of Rwanda
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Building a knowledge-based society through quality education, research, and innovation.
            </p>
          </div>

          {/* Quick Links - lecturer focused */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0A6E8A] transition-colors">
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0A6E8A] transition-colors">
                  Teaching Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0A6E8A] transition-colors">
                  Faculty Handbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Lecturer Support */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Lecturer Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0A6E8A] transition-colors">
                  IT Help Desk
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0A6E8A] transition-colors">
                  Library Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#0A6E8A] transition-colors">
                  HR Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: highlight }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+250 788 123 456</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: highlight }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@ur.ac.rw</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: highlight }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>KG 7 Ave, Kigali, Rwanda</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            © {new Date().getFullYear()} University of Rwanda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
