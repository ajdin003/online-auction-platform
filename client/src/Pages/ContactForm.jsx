/*import React from "react";*/
import React, { useRef } from 'react';
import "../css/cont.css";
import emailjs from '@emailjs/browser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faLocationDot,faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFontAwesome } from '@fortawesome/free-brands-svg-icons'


const ContactForm = () => {




    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_ar3euws', 'template_d2ebwci', form.current, {
        publicKey: '_8WgXh5y8ohoGEqkM',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };



    return (
    <div class="sve">
        <div class="container">
            
            <div class="form-container">
                <div class="left-container">
                    <div class="left-inner-container">
                        <h2>Social Media</h2>
                        <p><FontAwesomeIcon icon={faInstagram} />  Instagram</p>
                        <br />
                        <p><FontAwesomeIcon icon={faEnvelope} />  E-mail</p>
                        <br />
                        <p><FontAwesomeIcon icon={faLocationDot} />  Lokacija</p>
                        <br />
                        <p><FontAwesomeIcon icon={faMapLocation} />  Google maps</p>
                        <i class="fa fa-youtube-play" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="right-container">
                    <div class="right-inner-container">
                        <form action="#" ref={form} onSubmit={sendEmail}>
                            <h2 class="lg-view">Contact</h2>
                            <h2 class="sm-view">Let's Chat</h2>
                            <p>* Required</p>
                            <div class="social-container">
                                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                            <input type="text" name="user_name" placeholder="Name *" />
                            <input type="email" name="user_email" placeholder="Email *" />
                            
                            <textarea rows="5" name="message" placeholder="Message"></textarea>
                            <input type="submit" value="Send" class="button"/>
                        </form>
                    </div>
                </div></div>
            </div>
        </div>
    );
};

export default ContactForm;