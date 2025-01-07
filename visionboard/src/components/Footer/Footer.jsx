import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="py-12 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-gray-300 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* Logo and Copyright */}
          <div className="w-full md:w-1/2 lg:w-4/12 px-4 mb-8 md:mb-0">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-6">
                <Link to="/">
                  <Logo width="100px" />
                </Link>
              </div>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 px-4 mb-8 md:mb-0">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-6">Company</h3>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-base font-medium hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 px-4 mb-8 md:mb-0">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-6">Support</h3>
            <ul className="space-y-4">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-base font-medium hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 px-4">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-6">Legals</h3>
            <ul className="space-y-4">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-base font-medium hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
