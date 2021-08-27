import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/Button/Button';
import { Link } from 'react-router-dom';
import styles from './SignUp.css';

export default function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Submit");
  }

  useEffect(() => {
      document.title = "Sign up";
  }, [])

  return (
    <div className="sign_up noselect">
      <h1 className="page__header"> Sign-up </h1>
      <form className="sign_up__form">
        <div className="form-content">
          <input type="name"      placeholder="Name"      value={name}      onChange={(e) => setName(e.target.value)}     />
          <input type="email"     placeholder="Email"     value={email}     onChange={(e) => setEmail(e.target.value)}    />
          <input type="password"  placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={handleSubmit}> Submit </button>
        </div>
      </form>
    </div>
  )
};