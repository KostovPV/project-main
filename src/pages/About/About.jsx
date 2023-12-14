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
                <h1 className="mb-3 font-weight-bold text-teal contact-info">Contact Us</h1>
                <div>
                  <span className="mx-3 contact-info">
                    <strong>Telephone: 0897011667</strong>
                  </span>
                  <br />
                  <span className="mx-3 contact-info">
                    <strong>Email: kidscenter.burgas@gmail.com</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src="/images/img_1.jpg" alt="Image" className="img-fluid" />
            </div>
            <div className="col-md-5 ml-auto pl-md-5">
              <span className="text-cursive h5 text-red">About Us</span>
              <h3 className="text-black">Bring Fun Life To Your Kids</h3>
              <div>
                <div>
                  <span>
                    The Kid's center core idea is to create a pleasant atmosphere
                    which will help the children to have a quality time together.
                  </span>
                  <span>
                    We will provide the best service for your kid's party.
                  </span>
                </div>
                <div className="mt-5">
                  <div>
                    <a
                      onClick={toggleShowMore}
                      className="btn btn-primary btn-custom-1 mt-4"
                    >
                      {showMore ? "Show less" : "More About Us"}
                    </a>
                  </div>
                  {showMore && (
                    <div>
                      <p>
                        Since April 2023, we have been trying to create the best
                        memories for you and your children. The kids' smiles and
                        happy look are what we aim at. You can find us at Izgrev bl
                        4, or simply follow the link:
                        <span>
                          <NavLink to="/findus">Find us</NavLink>
                        </span>
                      </p>
                      <a
                        onClick={toggleShowMore}
                        className="btn btn-primary btn-custom-1 mt-4"
                      >
                        Show less
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src="/images/img_1.jpg" alt="Image" className="img-fluid" />
            </div>
            <div className="col-md-5 ml-auto pl-md-5">
              <span className="text-cursive h5 text-red">About Us</span>
              <h3 className="text-black">Bring Fun Life To Your Kids</h3>
              <div>
                <div>
                  <span>
                    The Kid's center core idea is to create a pleasant atmosphere
                    which will help the children to have a quality time together.
                  </span>
                  <span>
                    We will provide the best service for your kid's party.
                  </span>
                </div>
                {showMore && (
                  <div className="mt-5">
                  <p>
                    Since April 2023, we have been trying to create the best
                    memories for you and your children. The kids' smiles and
                    happy look are what we aim at. You can find us at Izgrev bl
                    4, or simply follow the link:{"  "}
                    <NavLink to="/findus" className="link-style">Find us</NavLink>
                  </p>
                </div>
                )}
                <div className="mt-5">
                  <a
                    onClick={toggleShowMore}
                    className="btn btn-primary btn-custom-1 mt-4"
                  >
                    {showMore ? "Show less" : "More About Us"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
