import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";

function Details() {
  const { id } = useParams();
  const { user } = useAuthContext();
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
                <h1 className="mb-3 font-weight-bold text-teal">
                  {document != null ? document.partyName : "-"}
                </h1>
                <p>
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                  <span className="mx-3">/</span>
                  <NavLink to="/list" className="text-white">
                    Party's list
                  </NavLink>
                  <span className="mx-3">/</span> <strong>Details</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section bg-light" id="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="bg-white p-3 p-md-5">
                {document != null && formattedDate != null ? (
                  <>
                    <h3 className="text-black mb-2">{document.partyName}</h3>
                    <p>{document.details} to make.</p>
                    <ul className="list-unstyled footer-link">
                      <li className="d-block mb-3">
                        <span className="d-block text-black">Created by</span>
                        <span>{document.createdBy}</span>
                      </li>
                      <li className="d-block mb-3">
                        <span className="d-block text-black">Category:</span>
                        <span>{document.category.label}</span>
                      </li>
                      <li className="d-block mb-3">
                        <span className="d-block text-black">Date</span>
                        <span>{formattedDate}</span>
                      </li>
                    </ul>
                    {canEdit && (
                      <NavLink
                        to={`/list/${id}/edit`}
                        party={document}
                        className="btn btn-primary mt-4"
                        style={{ display: "block" }}
                      >
                        Edit this
                      </NavLink>
                    )}
                  </>
                ) : (
                  <>
                    <div class="text-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                      <p>Loading party details</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
