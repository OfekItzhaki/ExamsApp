import React            from 'react';
import styles           from './HeroSection.css';
import { Button }       from '../Button/Button';

export default function HeroSection() {
    return (
        <div className='hero__container noselect'>
            <video src="/videos/video-1.mp4" autoPlay loop muted />
            <h1>    OI Exam System                          </h1>
            <p>     It appears you are not logged in.       </p>
            <div className='hero__btns'>
                <Button className='btns' link='/login'      buttonStyle='btn--outline' buttonSize='btn--large'> Login   </Button>
                <Button className='btns' link='/sign-up'    buttonStyle='btn--primary' buttonSize='btn--large'> Sign Up </Button>
            </div>
        </div>
    )
}
