import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, MessageSquare, Clock } from 'lucide-react';

interface ContactProps {
  navigate: (path: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Wholesale Procurement Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Wholesale Procurement Inquiry',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  const faqs = [
    {
      q: 'How does AgroConnect ensure produce freshness?',
      a: 'Produce is harvested upon order confirmation and packed at the farm gate in ventilated, temperature-controlled AgroExpress logistics crates. We guarantee doorstep delivery within 24-48 hours of harvest.',
    },
    {
      q: 'How does the Escrow Payment Protection work?',
      a: 'When you place an order, your payment is held securely in an RBI-compliant Escrow account. The farmer is notified to dispatch. Once you inspect the produce at your doorstep and confirm quality within 24 hours, the funds are automatically settled to the farmer bank account.',
    },
    {
      q: 'Can restaurants and wholesale buyers order in tons or quintals?',
      a: 'Yes! AgroConnect supports bulk commodity sourcing with tiered volume discounts (50kg+, 200kg+, 1000kg+), heavy truck freight shipping, GST invoicing, and custom recurring procurement contracts.',
    },
    {
      q: 'How can a farmer get verified on AgroConnect?',
      a: 'Farmers register through our 4-step KYC wizard by uploading their 7/12 land revenue extract or Aadhaar card. Our local agri-officer conducts a field and soil verification check within 24 hours before issuing the Verified Farmer badge.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-800 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-forest-950/80 px-3 py-1 rounded-full border border-forest-700 inline-flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> 24x7 Agri Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get in Touch With AgroConnect
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have questions about farm sourcing, bulk wholesale pricing, or farmer verification? Our support agronomists are here to help.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Form + Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-earth-200 p-6 sm:p-10 shadow-soft space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>
            <p className="text-xs text-slate-500">We respond within 2 hours during market hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Mehta"
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 outline-none focus:border-forest-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 outline-none focus:border-forest-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98000 11223"
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 outline-none focus:border-forest-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Subject / Category</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 outline-none focus:border-forest-600 font-medium text-slate-900"
                >
                  <option value="Wholesale Procurement Inquiry">Wholesale Procurement Inquiry</option>
                  <option value="Farmer Registration & KYC Support">Farmer Registration & KYC Support</option>
                  <option value="Order & Logistics Tracking">Order & Logistics Tracking</option>
                  <option value="Billing & Escrow Settlement">Billing & Escrow Settlement</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Your Message / Specific Crop Requirement</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention crop varieties, target quantities (KG / Quintal), delivery location, or questions..."
                className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 outline-none focus:border-forest-600"
              />
            </div>

            <button
              type="submit"
              className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>

            {submitted && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl font-semibold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Ticket #AGC-TK-{Math.floor(1000 + Math.random() * 9000)} generated! An agronomist will contact you shortly.</span>
              </div>
            )}
          </form>
        </div>

        {/* Right: Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-forest-900 text-white rounded-3xl p-8 space-y-6 shadow-soft border border-forest-800">
            <h3 className="text-xl font-bold">AgroConnect Headquarters</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Corporate & AgriTech Campus:</strong>
                  <p className="text-slate-300 mt-0.5">
                    Sector 19, APMC Central Market Hub, Vashi, Navi Mumbai, Maharashtra 400705
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Kisan Toll-Free Helpline:</strong>
                  <p className="text-slate-300 mt-0.5">1800-420-AGRO (24 Hours • Multi-Lingual)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email Inquiries:</strong>
                  <p className="text-slate-300 mt-0.5">support@agroconnect.in / procurement@agroconnect.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Mandi Logistics Hours:</strong>
                  <p className="text-slate-300 mt-0.5">Mon - Sun: 04:00 AM - 10:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-10 space-y-6 shadow-soft">
        <div className="space-y-1 text-center max-w-xl mx-auto mb-6">
          <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
          <p className="text-xs text-slate-500">Everything you need to know about farmer direct procurement</p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="border border-earth-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:bg-earth-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-forest-700' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed bg-earth-50/50 border-t border-earth-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
