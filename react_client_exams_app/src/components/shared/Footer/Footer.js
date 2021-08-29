
import React, { useEffect } from 'react';
import        { Button }    from '../Button/Button';
import        { Link }      from 'react-router-dom';
import styles               from './Footer.css';

export default function Footer({ logo, rights }) {

    const handelIconClick = (externalLink) => {
        if (typeof externalLink === 'string') {
            // Open in the same window
            // window.location.href = externalLink;
    
            // Open in a new window
            window.open(externalLink);
        }
    }

    return (
        <div className='footer-container'>
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join us to get notifications on any relevant new tests coming up
                </p>

                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input type="email" name="email" placeholder='Your email' className='footer-input'/>
                        <Button buttonStyle='btn--outline'> Subscribe </Button>
                    </form>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2> About Us </h2>
                        <Link to='/about'           > Additional Information    </Link>
                        <Link to='/terms-of-service'> Terms of Service          </Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2> Contact Us </h2>
                        <Link to='/contact'                                                     > Contact Information   </Link>
                        <Link to='https://www.paypal.com/donate?hosted_button_id=WLXFDL7PFQ7HN' > Support Us            </Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2> Social Media </h2>
                        <Link to="" onClick={() => handelIconClick("https://www.instagram.com/ofek.itzhaki/")}                target='_blank' aria-label='Instagram'        > Instagram     </Link>
                        <Link to="" onClick={() => handelIconClick("https://www.facebook.com/ofek.itzhaki/")}                 target='_blank' aria-label='Facebook'         > Facebook      </Link>
                        <Link to="" onClick={() => handelIconClick("https://github.com/OfekItzhaki/")}                        target='_blank' aria-label='Github'           > Github        </Link>
                        <Link to="" onClick={() => handelIconClick("https://www.linkedin.com/in/ofekitzhaki/")}               target='_blank' aria-label='Linkedin'         > Linkedin      </Link>
                        <Link to="" onClick={() => handelIconClick("https://www.codegrepper.com/app/profile.php?id=43241/")}  target='_blank' aria-label='Grepper'          > Grepper       </Link>
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to="/" className="social-logo">
                            {logo} {logo && <i className="fab fa-typo3"></i>}
                        </Link>
                    </div>
                    <small className="website-rights"> {rights} </small>
                    <div className="social-icons">
                        <Link to="" onClick={() => handelIconClick("https://www.facebook.com/ofek.itzhaki/")}   target='_blank' aria-label='Facebook'   className="social-icon-link facebook"   >
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="" onClick={() => handelIconClick("https://www.instagram.com/ofek.itzhaki/")}  target='_blank' aria-label='Instagram'  className="social-icon-link instagram"  >
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link to="" onClick={() => handelIconClick("https://github.com/OfekItzhaki/")}          target='_blank' aria-label='Github'     className="social-icon-link github"     >
                            <i className="fab fa-github"></i>
                        </Link>
                        <Link to="" onClick={() => handelIconClick("https://www.linkedin.com/in/ofekitzhaki/")} target='_blank' aria-label='Linkedin'   className="social-icon-link linkedin"   >
                            <i className="fab fa-linkedin"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
};  