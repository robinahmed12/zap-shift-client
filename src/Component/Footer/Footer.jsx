import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Package,
  Truck,
  Shield,
  CreditCard,
  Star,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        {
          name: "Track Package",
          path: "/track",
          icon: <Package className="w-4 h-4" />,
        },
        {
          name: "Send Parcel",
          path: "/send",
          icon: <Truck className="w-4 h-4" />,
        },
        {
          name: "Pricing",
          path: "/pricing",
          icon: <CreditCard className="w-4 h-4" />,
        },
        {
          name: "Coverage Area",
          path: "/coverage",
          icon: <MapPin className="w-4 h-4" />,
        },
        {
          name: "Support",
          path: "/support",
          icon: <Shield className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Same Day Delivery", path: "/same-day" },
        { name: "Express Delivery", path: "/express" },
        { name: "Standard Delivery", path: "/standard" },
        { name: "International Shipping", path: "/international" },
        { name: "Bulk Orders", path: "/bulk" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press & Media", path: "/press" },
        { name: "Partner With Us", path: "/partner" },
        { name: "Franchise", path: "/franchise" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Refund Policy", path: "/refund" },
        { name: "Shipping Policy", path: "/shipping-policy" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, url: "#" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "#" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, url: "#" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "#" },
  ];

  const trustIndicators = [
    { icon: <Shield className="w-6 h-6" />, text: "Secure & Insured" },
    { icon: <Star className="w-6 h-6" />, text: "5-Star Rated" },
    { icon: <Clock className="w-6 h-6" />, text: "24/7 Support" },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Trust Indicators Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {trustIndicators.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2 text-white"
              >
                <div className="text-yellow-400">{item.icon}</div>
                <span className="font-semibold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand & Contact Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-red-600 mb-2">
                <Package className="inline w-8 h-8 mr-2" />
                ParcelExpress
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted partner for fast, secure, and reliable parcel
                delivery services. We connect people and businesses across the
                globe with efficient shipping solutions.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="text-sm">
                  123 Delivery Street, Logistics City, LC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                <Phone className="w-5 h-5 text-red-600" />
                <span className="text-sm">+1 (555) 123-PARCEL</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                <Mail className="w-5 h-5 text-red-600" />
                <span className="text-sm">support@parcelexpress.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="text-sm">24/7 Customer Support</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-white border-b border-red-600 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.path}
                      className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-all duration-300 text-sm group"
                    >
                      {link.icon && (
                        <span className="text-red-600 group-hover:text-yellow-400">
                          {link.icon}
                        </span>
                      )}
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Stay Updated with Delivery News
              </h4>
              <p className="text-gray-300 text-sm">
                Get the latest updates on shipping rates, new services, and
                exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="p-3 bg-gray-800 rounded-full text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-300">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>System Status: Online</span>
              </span>
              <span>API Status: Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} ParcelExpress. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Trusted by over 50,000+ customers worldwide
              </p>
            </div>

            <div className="flex flex-wrap items-center space-x-6 text-xs text-gray-400">
              <span>Made with ❤️ for better deliveries</span>
              <span className="hidden md:inline">|</span>
              <span>Version 2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
