// List.jsx

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';

import "./List.css"; 
function List() {
  const { documents: parties } = useCollection("parties");

  const hasParties = parties && parties.length > 0;

  return (
    <>
      <div className="ftco-blocks-cover-1">
        <div className="site-section-cover overlay subpageBanner" style={{ backgroundImage: "url('/images/dobi-koleda.jpg')" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">
                  Welcome To Our Website
                </span>
                <h1 className="mb-3 font-weight-bold text-teal">
                  Party's list
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <span className="text-cursive h5 text-red d-block welcome-msg">
                All party list
              </span>
              <h2 className="text-black">Party's list</h2>
            </div>
          </div>

          

          <div className="row">
            {hasParties ? (
              parties.map((party, index) => (
                <div className="col-lg-4" key={index}>
                  <div className="party-cardD">
                    <h3 className="text-teal">{party.partyName}</h3>
                    <p className="details">{party.details}</p>
                    <p>
                      <NavLink to={`/list/${party.id}`} className="btn btn-primary btn-custom-1 mt-4 learn-more">
                        {`Details `}
                        <FontAwesomeIcon icon={faBookOpenReader} />
                      </NavLink>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                {parties === null ? (
                  <div>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p>Loading party list...</p>
                  </div>
                ) : (
                  <h1>There are no parties yet in the list. Be the first one to create a new party.</h1>
                )}
                
              </div>
            )}
            
          </div>
          <p>
            <NavLink to={`/create`} className="btn btn-primary btn-custom-1 mt-4 create-btn">
              Create party
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default List;

