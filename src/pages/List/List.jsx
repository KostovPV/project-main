import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

function List() {
  const { documents: parties } = useCollection("parties");
  const navigate = useNavigate()
  return (
    <>
      <div className="ftco-blocks-cover-1">
        <div
          className="site-section-cover overlay subpageBanner"
          style={{ backgroundImage: "url('/images/dobi-koleda.jpg')" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">
                  Welcome To Our Website
                </span>
                <h1 className="mb-3 font-weight-bold text-teal">
                  Party's list
                </h1>
                {/* <p>
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                  <span className="mx-3">/</span> <strong>Party's list</strong>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <span className="text-cursive h5 text-red d-block">
                All part list
              </span>
              <h2 className="text-black">Party's list</h2>
            </div>
          </div>
           <p>
           <p>
                        <NavLink
                          to={`/create`}
                          className="btn btn-primary btn-custom-1 mt-4"
                        >
                          Create your oun party
                        </NavLink>
                      </p>
                  {/* <button
                          type="button"
                          className="btn btn-primary text-white py-3 px-5"
                          onClick={()=> navigate('/create')}
                        >
                          Create
                        </button> */}
                 
                </p>
          <div className="row">
            {parties != null ? (
              <>
                {parties.map((party, index) => (
                  <div className="col-lg-4" key={index}>
                    <div className="package text-center bg-white mb-4">
                      <h3 className="text-teal">{party.partyName}</h3>
                      <p>{party.details} to make.</p>
                      <p>
                        <NavLink
                          to={`/list/${party.id}`}
                          className="btn btn-primary btn-custom-1 mt-4"
                        >
                          Learn More
                        </NavLink>
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="col-12">
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p>Loading party list</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
