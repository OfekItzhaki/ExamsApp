import React, {useState, useEffect} from 'react'
import styles from './Navbar.module.css';
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

    const headFunc = () => {
        showButton();
        closeMoblieMenu();
    }

    useEffect(() => {
        showButton();
    }, []);

    // Every time the window size changes
    window.addEventListener('resize', headFunc);

    return (
        <>
        <nav id={styles.navbar}>
            <div id={styles.navbar__container}>
                <Link to="/" id={styles.navbar__logo} onClick={closeMoblieMenu}>
                    <img id={styles.logo_img} src={logo} alt="logo"></img>
                </Link>
                <div id={styles.menu__icon} onClick={handleClick}>
                    <i id="icon" className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul id={click ? `${styles.nav__menu}' active'` : styles.nav__menu}>
                    <li className={styles.nav__item}>
                        <Link to='/' className={styles.nav_links} onClick={closeMoblieMenu}>
                            Home
                        </Link>
                    </li>
                    <li className={styles.nav__item}>
                        <Link to='/login' className={styles.nav_links} onClick={closeMoblieMenu}>
                            Login
                        </Link>
                    </li>
                    <li className={styles.nav__item}>
                        <Link to='/sign-up' className={styles.nav_links} onClick={closeMoblieMenu}>
                            Sign-up
                        </Link>
                    </li>
                    <li className={styles.nav__item}>
                        <Link to='/about' className={styles.nav_links} onClick={closeMoblieMenu}>
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
