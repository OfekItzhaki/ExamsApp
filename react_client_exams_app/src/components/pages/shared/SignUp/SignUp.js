import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/Button/Button';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';

export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
      document.title = "Sign-up";
  }, [])

  return (
    <div className='sign_up'>
      <h1> Sign-up </h1>
      <form id={styles.sign_up__form}>
        <div id={styles.form__content}>
          <input type='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button> 
            <Link to="/login"> Submit </Link> 
          </button>
        </div>
      </form>
    </div>
  )
};