import React, { useState } from "react";
import { api } from "../utils/api"; // axios instance
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("Please enter your registered email");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setStatus(res.data.message);
      setEmail("");
      setLoading(false);
    } catch (err) {
      setStatus(err.response?.data?.message || "Error resetting password");
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h1>Forgot Password</h1>
        <p>Enter your registered email to receive a temporary password.</p>

        {status && <p className="status">{status}</p>}

        <form className="forgot-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <label>Email Address</label>
          </div>
          <button type="submit" disabled={loading} className="forgot-btn">
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <p className="back-login">
          <a href="/admin/login">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
