import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./Details.css";

function Details() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const userId = user?.uid;
  let formattedDate = null;
  const { document, error } = useDocument("parties", id);

  if (document) {
    const timestamp = document.date;

    const milliseconds = timestamp.seconds * 1000;

    const date = new Date(milliseconds);

    // Extract day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
    const year = date.getFullYear();

    // Create a formatted date string
    formattedDate = `${day}.${month}.${year}`;

    console.log(formattedDate); // Output: 20.11.2023
  }

  const canEdit = document?.author === userId;

  const onExit = (e) => {
    e.preventDefault();

    navigate("/list");
  };

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
                <span className="text-cursive h5 text-red">The Kids center </span>
                <h1 className="mb-3 font-weight-bold text-teal">
                  {document != null ? document.partyName : "-"} details
                </h1>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section bg-light" id="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
            <div className="bg-white p-3 p-md-5 party-cardD-details">
        {document != null && formattedDate != null ? (
          <>
            <h3 className="text-teal mb-2">{document.partyName}</h3>
            <p className="details">{document.details}</p>
            <ul className="list-unstyled footer-link">
              <li className="d-block mb-3 created-by">
                <span className="d-block text-black">Created by: </span>
                <span>{document.createdBy}</span>
              </li>
              <li className="d-block mb-3 category-label">
                <span className="d-block text-black">Category:</span>
                <span>{document.category.label}</span>
              </li>
              <li className="d-block mb-3 date">
                <span className="d-block text-black">Date: </span>
                <span>{formattedDate}</span>
              </li>
            </ul>
            <div className="button-container">
              <button
                type="submit"
                className="btn btn-primary text-white py-3 px-5"
                onClick={onExit}
              >
                Back to list
              </button>
              {canEdit && (
                <NavLink
                  to={`/list/${id}/edit`}
                  party={document}
                  className="btn btn-primary mt-4 ml-3"
                  style={{ display: "block" }}
                >
                  Edit this
                </NavLink>
              )}
            </div>
          </>
        
        ): null}
      </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
