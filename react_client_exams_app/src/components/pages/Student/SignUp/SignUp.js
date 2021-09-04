
import React, { useState, useEffect } from 'react';
import        { useHistory          } from 'react-router-dom';
import styles                         from './SignUp.css';

export default function SignUp() {

  const [ students,         setStudents       ] = useState(null);

  const [ name,             setName           ] = useState("");
  const [ userName,         setUserName       ] = useState("");
  const [ email,            setEmail          ] = useState("");
  const [ password,         setPassword       ] = useState("");

  const [ allBeenFilled,    setAllBeenFilled  ] = useState(false);

  const history = useHistory();

  const userRegister = () => {

    if (allBeenFilled) {

      let today = new Date();
      let date = today.getFullYear() + '-' +(today.getMonth()+1) + '-' + today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + ' ' + time;

        fetch('http://localhost:8000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: name,
                email: email,
                password: password,
                lastActivity: dateTime
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                history.push("/");
            })
            .catch((err) => {
                console.log(`error ${err}`)
                console.log("registration failed - show kind of message");
            });
    }
  }

  const handleSubmit = (event) => {
    console.log("handle submit");
    event.preventDefault();

    userRegister();
  }

  const fetchStudents =() => {
    fetch("http://localhost:8000/students", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
        setStudents(data);
    })
    .catch((err) => console.log('error fetching students:' + err))
  }

  useEffect(() => {
      document.title = "Sign up";
  }, [])

  useEffect(() => {
    if ((name, email, password) !== "") setAllBeenFilled(true);
    else setAllBeenFilled(false);

  }, [name, email, password])
  
  useEffect(() => {
    let isMounted = true;           // note mutable flag

    if (isMounted) {                // add conditional check 
        fetchStudents();
    }

    return () => { isMounted = false }; // cleanup toggles value, if unmounted
}, [])

  return (
    <div className="sign_up noselect">
      <h1 className="page__header"> Sign-up </h1>
      <form className="sign_up__form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form_content__container">
          <input type="name"      placeholder="Name"      value={name}      onChange={(e) => setName(e.target.value)}       required/>
          <input type="username"  placeholder="Username"  value={userName}  onChange={(e) => setUserName(e.target.value)}   required/>
          <input type="email"     placeholder="Email"     value={email}     onChange={(e) => setEmail(e.target.value)}      required/>
          <input type="password"  placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)}   required/>
          <button id="submit__button" type="submit"> Submit </button>
        </div>
      </form>
    </div>
  )
};