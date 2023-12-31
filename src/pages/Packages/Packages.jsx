import React, { useState } from "react";

import './Packages.css'
function Packages() {
  const [showMore, setShowMore] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [showMore3, setShowMore3] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };


  const toggleShowMore2 = () => {
    setShowMore2(!showMore2);
  };

  const toggleShowMore3 = () => {
    setShowMore3(!showMore3);
  };

  return (
    <>
      <div className="ftco-blocks-cover-1">

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
                  The funnies indoor time your kids can have
                </p>
                <div style={{ display: showMore ? "block" : "none" }}>
                  <p>
                    Games are organized in such a way, so that all children will be equally involved.
                  </p>
                  <p>
                    Spending a fun time is our primary goal. We can facilitate up to 12 kids at the same time.
                  </p>
                  <a onClick={toggleShowMore} className="btn btn-primary btn-custom-1 mt-4 btn-indicator rotate">
                    Show less
                  </a>
                </div>
                {!showMore && (
                  <a onClick={toggleShowMore} className="btn btn-primary btn-custom-1 mt-4 btn-indicator">
                    Learn More
                  </a>
                )}
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
                  Fun games and activities in the open nature
                </p>
                <div style={{ display: showMore2 ? "block" : "none" }}>
                  <p>
                    Games are held outside only if the weather permits and there is no health danger for the kids.
                  </p>
                  <p>
                    Supervised by at least two animators. Group can be up to 14 children.
                  </p>
                  <a onClick={toggleShowMore2} className="btn btn-primary btn-custom-1 mt-4 btn-indicator rotate">
                    Show less
                  </a>
                </div>
                {!showMore2 && (
                  <a onClick={toggleShowMore2} className="btn btn-primary btn-custom-1 mt-4 btn-indicator">
                    Learn More
                  </a>
                )}
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
                <h3 className="text-danger">Parties for Kids</h3>
                <p>
                  Celebration parties for different occasions
                </p>
                <div style={{ display: showMore3 ? "block" : "none" }}>
                  <p>
                    Supervised by at least two animators. Birthday parties are the parties we are the best at. Comfort and wonderful memories are inevitable.
                  </p>
                  <p>
                    Parties are organised for up to 12 children.
                  </p>
                  <a onClick={toggleShowMore3} className="btn btn-primary btn-custom-1 mt-4 btn-indicator rotate">
                    Show less
                  </a>
                </div>
                {!showMore3 && (
                  <a onClick={toggleShowMore3} className="btn btn-primary btn-custom-1 mt-4 btn-indicator">
                    Learn More
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );


}

export default Packages;
