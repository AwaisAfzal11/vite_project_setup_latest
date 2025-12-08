import React from 'react';
import SEO from 'Components/Seo/Seo';
import { useContactForm } from 'src/Hooks/useContactForm'; // Import the logic

const Contact = () => {
  // 1. Get logic from Custom Hook
  const { formData, status, loading, handleChange, handleSubmit } = useContactForm();

  return (
    <>
      {/* 2. SEO Configuration */}
      <SEO 
        title="Contact Us" 
        description="Get in touch with Digiopt Consulting for your digital growth needs." 
        url="https://yourdomain.com/contact" 
      />

      {/* 3. UI Layout */}
      <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          
          <div className="p-8 md:p-10">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Get in Touch</h1>
            <p className="text-gray-500 text-center mb-8">Fill out the form below and we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name Input */}
              <div className="relative">
                <input 
                  type="text" 
                  name="fullName" 
                  required 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 py-2 transition-colors"
                  placeholder="John Doe"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Full Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 py-2 transition-colors"
                  placeholder="john@example.com"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Email Address
                </label>
              </div>

              {/* Message Input */}
              <div className="relative">
                <textarea 
                  name="message" 
                  rows="4" 
                  required 
                  value={formData.message} 
                  onChange={handleChange} 
                  className="peer w-full border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 p-3 mt-1 transition-colors resize-none"
                  placeholder="How can we help you?"
                />
                <label className="text-sm text-gray-600 block mb-1">Message</label>
              </div>

              {/* 🛡️ HONEYPOT FIELD (Spam Protection) - Must remain hidden */}
              <input 
                type="text" 
                name="_honey" 
                value={formData._honey} 
                onChange={handleChange} 
                style={{ display: 'none' }} 
                tabIndex="-1"
                autoComplete="off"
              />

              {/* Status Notifications */}
              {status.message && (
                <div className={`p-4 rounded-md text-sm font-medium ${
                  status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {status.message}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg tracking-wide transition-all transform hover:-translate-y-1 shadow-lg ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800 hover:shadow-xl'
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;