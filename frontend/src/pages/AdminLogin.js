import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-circle">M</div>
        <h1>Muzamilafey Admin</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={formData.username}
              onChange={e => setFormData({...formData, username: e.target.value})}
              required
              placeholder=" "
            />
            <label>Username</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
              placeholder=" "
            />
            <label>Password</label>
          </div>
          <button type="submit" className="login-btn">Login</button>
          <p className="forgot"><a href="/forgot-password">Forgot password?</a></p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
