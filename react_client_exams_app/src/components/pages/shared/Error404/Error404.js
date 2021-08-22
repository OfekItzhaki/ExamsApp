import react from 'react';
import React, { useState, useEffect } from 'react';
// import styles from './Error404.css';

export default function Error404() {

  useEffect(() => {
      document.title = "Page not found!";
  }, []);

  return (
      <>
        <div id="clouds">
            <div class="styles.cloud x1"></div>
            <div class="styles.cloud x1_5"></div>
            <div class="styles.cloud x2"></div>
            <div class="styles.cloud x3"></div>
            <div class="styles.cloud x4"></div>
            <div class="styles.cloud x5"></div>
        </div>
        <div class='styles.c'>
            <div class='styles._404'>404</div>
            <div class='styles._1'>THE PAGE</div>
            <div class='styles._2'>WAS NOT FOUND</div>
        </div>
      </>
  )
};