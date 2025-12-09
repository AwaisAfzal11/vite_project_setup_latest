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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you will submit using fetch or axios
    console.log("Form Data:", form);

    alert("Form Submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Contact Us
        </h2>

        {/* FIRST + LAST NAME */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter last name"
            />
          </div>
        </div>

        {/* EMAIL + PHONE */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="03001234567"
            />
          </div>
        </div>

        {/* SERVICE DROPDOWN */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Service
          </label>
          <select
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className="
              w-full px-4 py-3 border rounded-lg bg-white
              focus:ring-2 focus:ring-orange-400 outline-none
            "
          >
            <option value="">-- Choose Service --</option>
            <option value="Electrical Works">Electrical Works</option>
            <option value="Cleaning Services">Cleaning Services</option>
            <option value="AC Repair">AC Repair</option>
            <option value="Painting">Painting</option>
          </select>
        </div>

        {/* MESSAGE */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Your Message
          </label>
          <textarea
            name="message"
            required
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none resize-none"
            placeholder="Write your message..."
          ></textarea>
        </div>

        {/* FILE UPLOAD */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload File (Optional)
          </label>

          <div className="flex items-center gap-4">
            <label
              htmlFor="fileInput"
              className="
                px-5 py-3 bg-orange-600 text-white rounded-lg
                cursor-pointer shadow hover:bg-orange-700 transition
              "
            >
              Choose File
            </label>

            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />

            <span className="text-gray-600">
              {fileName || "No file selected"}
            </span>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="
            w-full py-4 text-lg font-semibold text-white
            bg-orange-600 rounded-lg shadow-lg
            hover:bg-orange-700 transition
          "
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
