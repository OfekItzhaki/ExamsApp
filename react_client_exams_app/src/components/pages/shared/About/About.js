import react from 'react';
import React, { useState, useEffect } from 'react';

export default function About() {

  useEffect(() => {
      document.title = "About";
  }, []);

  return (
    <div>
      <h1 className='about'> About </h1>
    </div>
  )
};