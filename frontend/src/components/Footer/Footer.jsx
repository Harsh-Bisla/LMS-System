import React from 'react';
import "./Footer.css";;

function Footer() {
    return (
        <section className='footer-section'>
            <div className='footer'>
                <div className='col-1'>
                    <h2>E-Learning</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aut earum debitis, necessitatibus rem, temporibu.</p>
                </div>

                <div className='col-1'>
                    <h4>Company</h4>
                    <p>Home</p>
                    <p>About Us</p>
                    <p>Contact Us</p>
                    <p>Privacy Policy</p>
                </div>
                <div className='col-3'>
                    <h4>Subscribe to our newsletter</h4>
                    <p>The latest news, arfticles, sent to inbox weekly</p>
                    <div className='mail-input'>
                        <input type="email" placeholder='Enter your email' />
                        <button className='subscribe-btn'>Subscribe</button>
                    </div>
                </div>
            </div>
            <p id='copyright'>Copyright 2024 © Harsh Bisla. All Right Reserved.</p>
        </section>
    )
}

export default Footer
