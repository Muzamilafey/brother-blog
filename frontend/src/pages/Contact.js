import React, { useState } from 'react';
import { api } from '../utils/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus('Please fill all fields');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('Invalid email address');
      return;
    }

    try {
      await api.post('/contact', formData);
      setStatus('Message sent successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('Failed to send message');
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Me</h1>

      {/* Contact Info Section */}
      <div className="contact-info">
        <div>
          <strong>Email:</strong> muzamilinc@gmail.com
        </div>
        <div>
          <strong>Phone:</strong> +254 726 151 104
        </div>
        <div>
          <strong>Location:</strong> Nairobi, Kenya
        </div>
      </div>

      {/* Status message */}
      {status && <p className="status-message">{status}</p>}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <label>Name</label>
        </div>

        <div className="form-group">
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <label>Email</label>
        </div>

        <div className="form-group">
          <textarea
            rows="5"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            required
          ></textarea>
          <label>Message</label>
        </div>

        <button type="submit" className="contact-submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
