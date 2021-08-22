import React, { useState, useEffect } from 'react';

export default function SignUp() {

  useEffect(() => {
      document.title = "Sign-up";
  }, [])

  return (
    <div>
      <h1 className='sign-up'> Sign-up page </h1>
    </div>
  )
};