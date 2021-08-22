import React from "react";
import Navbar from "./components/shared/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/shared/Home/Home';
import About from './components/pages/shared/About/About';
import Login from "./components/pages/shared/Login/Login";
import SignUp from "./components/pages/shared/SignUp/SignUp";
import ForgotPassword from "./components/pages/shared/ForgotPassword/ForgotPassword";
import Error404 from "./components/pages/shared/Error404/Error404";

import Footer from "./components/shared/Footer/Footer";
import MainPage from "./components/pages/Admin/MainPage/MainPage";


export default function App() {
  return (
      <>
        <Router>
          <Navbar/>
          <Switch>

            {/* Shared */}
            <Route path='/' exact component={Home} />
            <Route path='/home' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/forgot-password' component={ForgotPassword} />
            <Route path='/about' exact component={About} />

            {/* Admin */}
            <Route path='/admin/mainpage' exact component={MainPage} />

            <Route path='/error404' exact component={Error404} />
          </Switch>
        </Router>
        <Footer/>
      </>
  )
};