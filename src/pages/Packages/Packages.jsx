import React from "react";
import { NavLink } from "react-router-dom";

function Packages() {
  return (
    <>
      <div className="ftco-blocks-cover-1">
        <div
          className="site-section-cover overlay subpageBanner"
          style={{ backgroundImage: "url('/images/hero_1.jpg')" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">
                  Welcome To Our Website
                </span>
                <h1 className="mb-3 font-weight-bold text-teal">Packages</h1>
                <p>
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                  <span className="mx-3">/</span> <strong>Packages</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section bg-info">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <span className="text-cursive h5 text-red d-block">
                Packages You Like
              </span>
              <h2 className="text-white">Our Packages</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="package text-center bg-white">
                <span className="img-wrap">
                  <img
                    src="images/flaticon/svg/001-jigsaw.svg"
                    alt="Image"
                    className="img-fluid"
                  />
                </span>
                <h3 className="text-teal">Indoor Games</h3>
                <p>
                  Lorem ipsum dolor sit amet. Consequatur aliquam, fuga maiores
                  amet quo corporis distinctio soluta recusandae?
                </p>
                <p>
                  <a href="#" className="btn btn-primary btn-custom-1 mt-4">
                    Learn More
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="package text-center bg-white">
                <span className="img-wrap">
                  <img
                    src="images/flaticon/svg/002-target.svg"
                    alt="Image"
                    className="img-fluid"
                  />
                </span>
                <h3 className="text-success">Outdoor Game and Event</h3>
                <p>
                  Lorem ipsum dolor sit amet. Consequatur aliquam, fuga maiores
                  amet quo corporis distinctio soluta recusandae?
                </p>
                <p>
                  <a href="#" className="btn btn-warning btn-custom-1 mt-4">
                    Learn More
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="package text-center bg-white">
                <span className="img-wrap">
                  <img
                    src="images/flaticon/svg/003-mission.svg"
                    alt="Image"
                    className="img-fluid"
                  />
                </span>
                <h3 className="text-danger">Camping for Kids</h3>
                <p>
                  Lorem ipsum dolor sit amet. Consequatur aliquam, fuga maiores
                  amet quo corporis distinctio soluta recusandae?
                </p>
                <p>
                  <a href="#" className="btn btn-success btn-custom-1 mt-4">
                    Learn More
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Packages;
