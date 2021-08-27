import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/Button/Button';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.css';

export default function ForgotPassword() {

  const [ previousPassword,   setPreviousPassword]  = useState("");
  const [ newPassword,        setNewPassword]       = useState("");
  const [ verifyNewPassword,  setVerifyNewPassword] = useState("");

  const handleSubmit = () => {
    console.log("Submit");
  }

  useEffect(() => {
      document.title = "Forgot Password";
  }, [])

  return (
    <div className="forgot_password noselect">
      <h1 className="page__header"> Forgot Password </h1>
      <form className="forgot_password__form">
        <div className="form_content_container">
          <input type="password"  placeholder="Previous password" value={previousPassword}   onChange={(e) => setPreviousPassword(e.target.value)}  />
          <input type="email"     placeholder="New password"      value={newPassword}        onChange={(e) => setNewPassword(e.target.value)}       />
          <input type="password"  placeholder="Verify Password"   value={verifyNewPassword}  onChange={(e) => setVerifyNewPassword(e.target.value)} />
          <button type="submit" onClick={handleSubmit}> Submit </button>
        </div>
      </form>
    </div>
  )
};