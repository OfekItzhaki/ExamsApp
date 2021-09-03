import react from 'react';
import React, { useState, useEffect } from 'react';

export default function About() {

  useEffect(() => {
      document.title = "About";
  }, []);

  return (
    <div className="about noselect">
      <h1 className="page__header"> About Us </h1>
      <div id="additional_information__container">
        <h2> Exam Management System </h2>
        <h2> This personal project aims to implement and answer the definition of a real-world exam management site </h2>
      </div>
    </div>
  )
};