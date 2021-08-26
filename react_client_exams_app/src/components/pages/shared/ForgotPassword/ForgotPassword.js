import react from 'react';
import React, { useState, useEffect } from 'react';

export default function ForgotPassword() {

  useEffect(() => {
      document.title = "Forgot Password";
  })

  return (
    <div className="forgot_password noselect">
      <h1 className="page__header"> Forgot Password </h1>
    </div>
  )
};