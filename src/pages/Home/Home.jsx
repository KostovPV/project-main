import React from "react";
import "./Home.css";
function Home() {
  return (
    <>
      {/* home page content start */}
      <div className="ftco-blocks-cover-1">
        <div className="site-section-cover overlay" id="homeBanner">
          <div className="home-container">
            <div className="row align-items-center ">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">
                  Welcome To Our Website
                </span>
                <h1 className="mb-3 font-weight-bold text-teal">
                  Bring Fun Life To Your Kids
                </h1>
                <p>Amazing Playground for your kids</p>
                <p className="mt-5">
                  <a href="#" className="btn btn-primary py-4 btn-custom-1">
                    Learn More
                  </a>
                </p>
              </div>
              <div className="col-md-6 ml-auto align-self-end">
                <img
                  src="images/kid_transparent.png"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* bottom cotent */}
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="block-2 red">
                <span className="wrap-icon">
                  <span className="icon-home" />
                </span>
                <h2>Indoor Games</h2>
                <p>
                  Funny and entertaing games for your children in a pleasant atmosphere
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block-2 yellow">
                <span className="wrap-icon">
                  <span className="icon-person" />
                </span>
                <h2>Outdoor Game And Event</h2>
                <p>
                  Organize an exited games for your children
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block-2 teal">
                <span className="wrap-icon">
                  <span className="icon-cog" />
                </span>
                <h2>Birghday parties</h2>
                <p>
                 Celebrate your kid's birghday in a frendly atmpsphere
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;