import React, { useEffect } from 'react';
import { Button } from '../Button/Button';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <div id={styles.footer__container}>
            <section id={styles.footer__subscription}>
                <p id={styles.footer__subscription_heading}>
                    Join us to get notifications on any relevant new tests coming up
                </p>

                <p id={styles.footer__subscription_text}>
                    You can unsubscribe at any time.
                </p>
                <div id={styles.input_areas}>
                    <form>
                        <input type="email" name="email" placeholder='Your email' className={styles.footer__input}/>
                        <Button buttonStyle='btn--outline'> Subscribe </Button>
                    </form>
                </div>
            </section>
            <div id={styles.footer__links}>
                <div className={styles.footer__link_wrapper}>
                    <div className={styles.footer__link_items}>
                        <h2> About Us </h2>
                        <Link to='/about'> Additional Information </Link>
                        <Link to='/terms-of-service'> Terms of Service </Link>
                    </div>
                    <div className={styles.footer__link_items}>
                        <h2> Contact Us </h2>
                        <Link to='/contact'> Contact Information </Link>
                        <Link to='https://www.paypal.com/donate?hosted_button_id=WLXFDL7PFQ7HN'> Support Us </Link>
                    </div>
                </div>
                <div className={styles.footer__link_wrapper}>
                    <div className={styles.footer__link_items}>
                        <h2> Social Media </h2>
                        <Link to='https://www.instagram.com/ofek.itzhaki/'> Instagram </Link>
                        <Link to='https://www.facebook.com/ofek.itzhaki/'> Facebook </Link>
                        <Link to='https://github.com/OfekItzhaki/'> Github </Link>
                        <Link to='https://www.linkedin.com/in/ofekitzhaki/'> Linkedin </Link>
                        <Link to='https://www.codegrepper.com/app/profile.php?id=43241/'> Grepper </Link>
                    </div>
                </div>
            </div>
            <section id={styles.social_media}>
                <div id={styles.social_media__wrap}>
                    <div id={styles.footer__logo}>
                        <Link to='/' id={styles.social_logo}>
                            OIES <i className='fab fa-typo3'></i>
                        </Link>
                    </div>
                    <small id={styles.website_rights}> OI Test System © 2021 </small>
                    <div id={styles.social_icons}>
                        <Link to="" onClick={() => SendToExternalLink('https://www.facebook.com/ofek.itzhaki/')} target='_blank' aria-label='Facebook' className={`${styles.social_icon__link} facebook`}>
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="" onClick={() => SendToExternalLink('https://www.instagram.com/ofek.itzhaki/')} target='_blank' aria-label='Instagram' className={`${styles.social_icon__link} instagram`}>
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link to="" onClick={() => SendToExternalLink('https://github.com/OfekItzhaki/')} target='_blank' aria-label='Github' className={`${styles.social_icon__link} github`}>
                            <i className="fab fa-github"></i>
                        </Link>
                        <i className="fab fa-github"></i>
                        <Link to="" onClick={() => SendToExternalLink('https://www.linkedin.com/in/ofekitzhaki/')} target='_blank' aria-label='Linkedin' className={`${styles.social_icon__link} linkedin`}>
                            <i className="fab fa-linkedin"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
};  

function SendToExternalLink(externalLink) {
    if (typeof externalLink === 'string') {
        // Open in the same window
        // window.location.href = externalLink;

        // Open in a new window
        window.open(externalLink);
    }
}
