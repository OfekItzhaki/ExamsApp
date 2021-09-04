import React, { useState, useEffect }   from 'react';
import        { useHistory, Link    }   from 'react-router-dom';
import styles                           from './Login.css'

export default function Login() {

  const [ students,         setStudents       ] = useState(null);

  const [email,             setEmail          ] = useState("");
  const [password,          setPassword       ] = useState("");

  const [ allBeenFilled,    setAllBeenFilled  ] = useState(false);

  const history = useHistory();

  const userLogin = () => {

    if (allBeenFilled) {
      students.map((student) => {
        if (student.email === email && student.password === password) {
          console.log("admin credentials are correct");
          history.push("/admin/main-page");
        }
      })
    }
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
    document.title = "Login";
  }, [])

  useEffect(() => {
    if ((email, password) !== "") setAllBeenFilled(true);
    else setAllBeenFilled(false);

  }, [email, password])

  useEffect(() => {
    let isMounted = true;           // note mutable flag

    if (isMounted) {                // add conditional check 
        fetchStudents();
    }

    return () => { isMounted = false }; // cleanup toggles value, if unmounted
}, [])

  return (
    <div className="login noselect">
      <h1 className="page__header"> Login </h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="form_content__container">
          <input type="email"     placeholder="Email"     value={email}     onChange={(e) => setEmail(e.target.value)}    required/>
          <input type="password"  placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)} required/>
          <Link to="/forgot-password"> Forgot your password? </Link>
        </div>
        <button id="submit__button" type="submit"> Submit </button>
      </form>
    </div>
  )
};