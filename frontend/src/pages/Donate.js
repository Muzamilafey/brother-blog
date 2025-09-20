import React, { useState } from "react";
// import { FiCopy } from "react-icons/fi"; // copy icon
import "./Donate.css";

const Donate = () => {
  const [copied, setCopied] = useState(false);
  const tillNumber = "6774375";

  const handleCopy = () => {
    navigator.clipboard.writeText(tillNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  return (
    <div className="donate-container">
      <h1>Support Us with M-PESA</h1>
      <p>
        You can support the blog by sending your contribution via M-PESA.  
        Use the Till Number below to make a payment.
      </p>

      <div className="till-container">
        <span className="till-label">Till Number:</span>
        <span className="till-number">{tillNumber}</span>
        <button className="copy-btn" onClick={handleCopy}>
          Click here to copy Till
        </button>
      </div>

      {copied && <p className="status">Till number copied to clipboard!</p>}

      <p className="donation-note">
        Thank you for supporting us! Your contribution keeps the blog running and delivering quality content.
      </p>
    </div>
  );
};

export default Donate;
