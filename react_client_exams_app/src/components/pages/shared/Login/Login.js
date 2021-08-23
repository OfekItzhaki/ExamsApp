import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/Button/Button';
import { Link } from 'react-router-dom';
import styles from './Login.module.css'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = "Login";
  }, [])

  return (
    <div className='login'>
      <h1> Login </h1>
      <form id={styles.login__form}>
        <div id={styles.form__content}>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button> 
            <Link to="/"> Submit </Link> 
          </button>
        </div>
      </form>
    </div>
  )
};