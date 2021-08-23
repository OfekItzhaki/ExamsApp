import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/Button/Button';
import { Link } from 'react-router-dom';
import signup_styles from './SignUp.css';

export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
      document.title = "Sign up";
  }, [])

  return (
    <div className='sign_up'>
      <h1> Sign-up </h1>
      <form className='sign-up__form'>
        <div className='form-content'>
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