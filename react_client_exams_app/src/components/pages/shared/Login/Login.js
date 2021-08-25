import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/Button/Button';
import { Link } from 'react-router-dom';
import login_styles from './Login.css'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = "Login";
  }, [])

  return (
    <div className='login'>
      <h1> Login </h1>
      <form className='login__form'>
        <div className='form-content'>
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

function Submit() {
  
}