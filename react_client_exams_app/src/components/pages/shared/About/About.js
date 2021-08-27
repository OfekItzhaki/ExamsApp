import react from 'react';
import React, { useState, useEffect } from 'react';

export default function About() {

  useEffect(() => {
      document.title = "About";
  }, []);

  return (
    <div className="about noselect">
      <h1 className="page__header"> About </h1>
    </div>
  )
};