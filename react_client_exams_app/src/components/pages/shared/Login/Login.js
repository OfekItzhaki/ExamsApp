import React, { useState, useEffect }   from 'react';
import        { useHistory, Link    }   from 'react-router-dom';
import styles                           from './Login.css'

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const userLogin = () => {

  }

  const handleSubmit = (event) => {
    console.log("handle submit");
    event.preventDefault();

    if (userLogin()) {
      history.push("/");
    } else {
      console.log("login failed - show kind of message");
    }
}

  useEffect(() => {
    document.title = "Login";
  }, [])

  return (
    <div className="login noselect">
      <h1 className="page__header"> Login </h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="form_content__container">
          <input type="email"     placeholder="Email"     value={email}     onChange={(e) => setEmail(e.target.value)}    />
          <input type="password"  placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)} />
          <Link to="/forgot-password"> Forgot your password? </Link>
        </div>
        <button id="submit__button" type="submit"> Submit </button>
      </form>
    </div>
  )
};