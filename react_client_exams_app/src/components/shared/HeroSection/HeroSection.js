import React from 'react'
// import '../../App.css';
import { Button } from '../Button/Button';
import './HeroSection.css';

export default function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/video-1.mp4" autoPlay loop muted />
            <h1> OI Exam System </h1>
            <p> It appears you are not logged in. </p>
            <div className='hero-btns'>
                <Button className='btns' link='/login' buttonStyle='btn--outline' buttonSize='btn--large'>
                    Login
                </Button>
                <Button className='btns' link='/sign-up' buttonStyle='btn--primary' buttonSize='btn--large'>
                    Sign Up 
                    {/* <i className='far fa-play-circle' /> */}
                </Button>
            </div>
        </div>
    )
}
