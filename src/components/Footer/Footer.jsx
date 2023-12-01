import React, { useState } from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { db } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

function Footer() {

  const [inputEmail, setInputEmail] = useState('');
  const emailCollection = collection(db, 'emails')
  const inputHandler = (e) => {
    setInputEmail(e.target.value);
    console.log("Input value:", e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Input before submitting:", inputEmail);


    await addDoc(emailCollection, { email: inputEmail });


    document.getElementById('emailInput').value = '';


    setInputEmail('');
    toast.success('Successfully subscribed!')
  };


  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className="footer-heading mb-3">The Kid's center</h2>
              <p className="mb-5">
                Copyright © All rights reserved
              </p>
            </div>
            <div className="col-lg-8 ml-auto">
              <div className="row">
                <div className="col-xl-7 ml-auto">
                  <h2 className="footer-heading mb-4">Newsletter</h2>
                  <div><Toaster
                    position="bottom-right"
                    reverseOrder={false}
                  /></div>
                  <form className="d-flex" onSubmit={submitHandler}>

                    <input
                      type="email"
                      onChange={inputHandler}
                      id="emailInput"
                      className="form-control mr-3"
                      placeholder="Email"
                    />


                    <input
                      type="submit"
                      defaultValue="Send"
                      className="btn btn-primary"
                    />
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

