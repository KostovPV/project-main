import React from "react";
import "./Home.css";
function Home() {
  return (
    <>
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
                
              </div>
              <div className="col-md-6 ml-auto align-self-end">
                <img
                  src="images/DobiHD.png"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
                Funny and entertaining games for your children in a pleasant atmosphere
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
                Organize an exciting game for your children
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block-2 teal">
                <span className="wrap-icon">
                  <span className="icon-cog" />
                </span>
                <h2>Birthday parties</h2>
                <p>
                Celebrate your kid's birthday in a friendly atmosphere
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