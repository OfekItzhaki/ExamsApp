import React, {useState, useEffect} from 'react'
import './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/components/Logo_v1.png';
import { Button } from '../Button/Button';

export default function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMoblieMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    // Every time the window size changes
    window.addEventListener('resize', showButton);

    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMoblieMenu}>
                    <img className="logo-img" src={logo} alt="logo"></img>
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i id="icon" className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMoblieMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-links' onClick={closeMoblieMenu}>
                            Login
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/sign-up' className='nav-links' onClick={closeMoblieMenu}>
                            Sign-up
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/about' className='nav-links' onClick={closeMoblieMenu}>
                            About
                        </Link>
                    </li>
                </ul>
                {/* {button && <Button link='/sign-up' buttonStyle='btn--outline'> Sign Up </Button>} */}
            </div>
        </nav>
        </>
    )
}
