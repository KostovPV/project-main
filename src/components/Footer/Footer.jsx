import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
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
                  <form action="#" className="d-flex">
                    <input
                      type="text"
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
          {/* <div className="row pt-3 text-center">
            <div className="col-md-12">
              <div className="border-top pt-5">
                <p>
                  Copyright © All rights reserved | This template is made with{" "}
                  <i className="icon-heart text-danger" aria-hidden="true" /> by{" "}
                  <a href="#" target="_blank">
                    kids Zone
                  </a>
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </footer>
    </>
  );
}

export default Footer;
