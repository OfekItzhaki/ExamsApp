import React, { useState, useEffect } from 'react';

export default function Login() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = "Login";
  }, [])

  return (
    <div className='login'>
      <form className='login__form'>
        <h1> Login </h1>
        <input type='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </form>
    </div>
  )
};