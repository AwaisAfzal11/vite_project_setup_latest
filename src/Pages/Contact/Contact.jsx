import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        package: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const services = [
        'Electrical Works',

    ];

    const packages = [
        'Basic Plan — PKR 5,000 / Year',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePhone(formData.phone)) {
            setSubmitStatus({
                type: 'error',
                message: "Oops! That phone number doesn't look right. Please enter a valid 11-digit number."
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null); // Clear previous status messages

        try {
            const response = await fetch('/send_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setSubmitStatus({ type: 'success', message: result.message });
                // Reset form on success
                setFormData({
                    name: '', email: '', phone: '', service: '', package: '', message: ''
                });
            } else {
                // Handle server-side errors
                setSubmitStatus({ type: 'error', message: result.message || 'An unexpected server error occurred.' });
            }
        } catch (error) {
            // Handle network errors
            console.error('Submission error:', error);
            setSubmitStatus({ type: 'error', message: 'Could not connect to the server. Please check your connection and try again.' });
        } finally {
            setIsSubmitting(false);
            // Hide the status message after 6 seconds
            setTimeout(() => setSubmitStatus(null), 6000);
        }
    };



    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section */}




            {/* Contact Form Section */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Send Us a Message
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Fill out the form below and our team will respond within 24 hours
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all text-gray-900 text-lg"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email and Phone */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all text-gray-900 text-lg"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all text-gray-900 text-lg"
                                        placeholder="03001234567"
                                    />
                                </div>
                            </div>

                            {/* Service Dropdown */}
                            <div>
                                <label htmlFor="service" className="block text-sm font-bold text-gray-900 mb-2">
                                    Select Service
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    required
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl bg-white text-gray-900 text-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all"
                                >
                                    <option value="">-- Choose a Service --</option>
                                    {services.map((service, index) => (
                                        service === '---'
                                            ? <option key={index} disabled>──────────</option>
                                            : <option key={index} value={service}>{service}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Membership Package Dropdown */}
                            <div>
                                <label htmlFor="package" className="block text-sm font-bold text-gray-900 mb-2">
                                    Select a Membership Package (Optional)
                                </label>
                                <select
                                    id="package"
                                    name="package"
                                    value={formData.package}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl bg-white text-gray-900 text-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all"
                                >
                                    <option value="">-- Not Interested / Just Booking a Service --</option>
                                    {packages.map((pkg, index) => (
                                        <option key={index} value={pkg}>
                                            {pkg}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all text-gray-900 text-lg resize-none"
                                    placeholder="Tell us about your maintenance needs..."
                                ></textarea>
                            </div>

                            {/* Status Message */}
                            {submitStatus && (
                                <div className={`p-5 rounded-2xl flex items-start gap-4 ${submitStatus.type === 'success'
                                        ? 'bg-green-50 border-2 border-green-200'
                                        : 'bg-red-50 border-2 border-red-200'
                                    }`}>
                                    <div className="flex-shrink-0">
                                        {submitStatus.type === 'success' ? (
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <p className={`font-semibold ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                                        }`}>
                                        {submitStatus.message}
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none flex items-center justify-center group"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending Message...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Contact;