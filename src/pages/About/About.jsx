import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./About.css";
function About() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div className="ftco-blocks-cover-1">
        <div
          className="site-section-cover overlay subpageBanner"
          style={{ backgroundImage: "url('/images/deca1.jpg')" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">
                  Welcome To Our Website
                </span>
                <h1 className="mb-3 font-weight-bold text-teal">Contact Us</h1>
                <p>
                  {/* <NavLink to="/" className="text-white">
                    Home
                  </NavLink> */}
                  <span className="mx-3"><strong>Telephone: 0897011667</strong></span><br/>
                  <span className="mx-3"><strong>Email: kidscenter.burgas@gmail.com</strong></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src="/images/img_1.jpg" alt="Image" className="img-fluid" />
            </div>
            <div className="col-md-5 ml-auto pl-md-5">
              <span className="text-cursive h5 text-red">About Us</span>
              <h3 className="text-black">Bring Fun Life To Your Kids</h3>
              <p>
                <span>
                  The Kid's center core idea is to create a pleasant atmosphere which will help the children to have a quality time together.
                </span>
                <span>
                  We will provide the best serivice for you kid's party.
                </span>
              </p>
              <p className="mt-5">
                {/* <a href="#" className="btn btn-warning py-4 btn-custom-1">
                  More About Us
                </a> */}
                <div style={{ display: showMore ? "block" : "none" }}>
                  <p>
                  Since April 2023 we have been trying to create the best memories for you and your children. The kids smiles and happy look is what we aim at. You can find is at Izgrev bl 4, or simply follow the link:
                    <span >     <NavLink to="/findus" >
                      Find us
                    </NavLink></span>

                  </p>

                  <a onClick={toggleShowMore} className="btn btn-primary btn-custom-1 mt-4">
                    Show less
                  </a>
                </div>
                {!showMore && (
                  <a onClick={toggleShowMore} className="btn btn-primary btn-custom-1 mt-4">
                    More About Us
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
