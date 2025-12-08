// src/Hooks/useContactForm.jsx
import { useState } from 'react';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
    _honey: '' // Honeypot field for spam protection
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Client-side spam check: if honeypot is filled, return fake success
    if (formData._honey) {
      setLoading(false);
      setStatus({ type: 'success', message: 'Message sent successfully.' });
      setFormData({ fullName: '', email: '', message: '', _honey: '' });
      return;
    }

    try {
      // Prepare form data for PHP
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('message', formData.message);
      data.append('_honey', formData._honey);

      // Send to the PHP script in the public folder
      const response = await fetch('/send_email.php', {
        method: 'POST',
        body: data,
      });

      // Try to parse JSON response
      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus({ type: 'success', message: result.message });
        setFormData({ fullName: '', email: '', message: '', _honey: '' });
      } else {
        setStatus({ type: 'error', message: result.message || 'Something went wrong.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return { formData, status, loading, handleChange, handleSubmit };
};