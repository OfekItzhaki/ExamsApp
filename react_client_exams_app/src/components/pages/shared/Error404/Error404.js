import react from 'react';
import React, { useState, useEffect } from 'react';
import styles from './Error404.module.css';

export default function Error404() {

  useEffect(() => {
      document.title = "Page not found!";
  }, []);

  return (
      <>
      <div className="error404 noselect">
        <div id={styles.clouds}>
            <div className={`${styles.cloud} ${styles.x1}`}   ></div>
            <div className={`${styles.cloud} ${styles.x1_5}`} ></div>
            <div className={`${styles.cloud} ${styles.x2}`}   ></div>
            <div className={`${styles.cloud} ${styles.x3}`}   ></div>
            <div className={`${styles.cloud} ${styles.x4}`}   ></div>
            <div className={`${styles.cloud} ${styles.x5}`}   ></div>
        </div>
        <div className= {`${styles.c}`}>
            <div className={styles._404}  >404</div>
            <hr/>
            <div className={styles._1}    >THE PAGE</div>
            <div className={styles._2}    >WAS NOT FOUND</div>
        </div>
      </div>
      </>
  )
};