import react from 'react';
import React, { useState, useEffect } from 'react';

export default function ForgotPassword() {

  useEffect(() => {
      document.title = "Forgot Password";
  })

  return (
    <div>
      <h1 className='forgot-password'> Forgot Password </h1>
    </div>
  )
};