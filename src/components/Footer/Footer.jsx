
import { db } from '../../firebase/config';
import React, { useState } from "react";
import "./Footer.css";
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';


const emailCollection = collection(db, 'mail');



function Footer({ visitCount }) {
  const [inputEmail, setInputEmail] = useState('');


  const inputHandler = (e) => {
    setInputEmail(e.target.value);
    console.log("Input value:", e.target.value);
  };

  const isValidEmail = (email) => {
    const emaliRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emaliRegex.test(String(email).toLowerCase());
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isValidEmail(inputEmail)) {
      
      toast.error('Invalid email', {
        position: 'bottom-right',
      });
      return; 
    }

    try {
      await addDoc(emailCollection, { email: inputEmail });
      document.getElementById('emailInput').value = '';
      setInputEmail('');

    
      toast.success('Successfully subscribed!', {
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error adding document:', error);
    e
      toast.error('Error subscribing. Please try again later.', {
        position: 'bottom-right',
      });
    }
  };




  return (

    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className="footer-heading mb-3">The Kid's center</h2>

              {visitCount && visitCount !== 0 && (
                <h2 className="footer-visits">Page was visited {visitCount} times</h2>
              )}

              <p className="mb-5">
                Copyright © All rights reserved
              </p>
            </div>
            <div className="col-lg-8 ml-auto">
              <div className="row">
                <div className="col-xl-7 ml-auto">
                  <h2 className="footer-heading mb-4">Subscribe for our newsletter</h2>
                  <div>
                    <Toaster
                    />
                  </div>
                  <form className="d-flex" onSubmit={submitHandler}>
                    <input
                      type="email"
                      onChange={inputHandler}
                      id="emailInput"
                      className="form-control mr-3"
                      placeholder="Email"
                    />
                    <button type="submit" className="btn btn-primary">
                      {`Send `}
                      <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>

  );
}

export default Footer;
