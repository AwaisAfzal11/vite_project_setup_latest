import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    file: null,
  });

  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example connection to the PHP backend
    // const formData = new FormData();
    // Object.keys(form).forEach(key => formData.append(key, form[key]));
    
    // try {
    //   const response = await fetch('/send_email.php', { method: 'POST', body: formData });
    //   const result = await response.json();
    //   console.log(result);
    // } catch (error) {
    //   console.error("Error submitting form", error);
    // }

    console.log("Form Data Ready for Submission:", form);
    alert("Form Submitted! (Check console for data)");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Get in Touch
        </h2>

        {/* FIRST + LAST NAME */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">First Name</label>
            <input type="text" name="firstName" required value={form.firstName} onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="First Name" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input type="text" name="lastName" required value={form.lastName} onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Last Name" />
          </div>
        </div>

        {/* EMAIL + PHONE */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input type="email" name="email" required value={form.email} onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="+1 234 567 890" />
          </div>
        </div>

        {/* SERVICE DROPDOWN */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Inquiry Type</label>
          <select name="service" required value={form.service} onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none">
            <option value="">-- Select an Option --</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* MESSAGE */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Your Message</label>
          <textarea name="message" required rows="5" value={form.message} onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            placeholder="How can we help you today?"></textarea>
        </div>

        {/* FILE UPLOAD */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Upload File (Optional)</label>
          <div className="flex items-center gap-4">
            <label htmlFor="fileInput"
              className="px-5 py-3 bg-blue-600 text-white rounded-lg cursor-pointer shadow hover:bg-blue-700 transition">
              Choose File
            </label>
            <input id="fileInput" type="file" className="hidden" onChange={handleFileUpload} />
            <span className="text-gray-600 text-sm truncate max-w-xs">{fileName || "No file selected"}</span>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit"
          className="w-full py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;