import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/Button/Button';
import { Link } from 'react-router-dom';
import styles from './Login.css'

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("submit");
  }

  useEffect(() => {
    document.title = "Login";
  }, [])

  return (
    <div className="login noselect">
      <h1 className="page__header"> Login </h1>
      <form className="login__form">
        <div className="form_content__container">
          <input type="email"     placeholder="Email"     value={email}     onChange={(e) => setEmail(e.target.value)}    />
          <input type="password"  placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)} />
          <Link to="/forgot-password"> Forgot your password? </Link>
        </div>
        <button id="submit__button" type="submit"   onClick={handleSubmit}> Submit </button>
      </form>
    </div>
  )
};