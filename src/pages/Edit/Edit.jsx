import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRotateLeft, faPen } from '@fortawesome/free-solid-svg-icons';


import { db } from "../../firebase/config";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import Select from "react-select";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useCollection } from "../../hooks/useCollection";

import "./Edit.css";

const categories = [
  { value: "birthday", label: "Birthday-party" },
  { value: "casual", label: "Games" },
  { value: "special", label: "Single-Program" },
  { value: "day-care", label: "Kids-day" },
];

function Edit() {
  const { documents: parties } = useCollection("parties");
  const [partyName, setPartyName] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState("");
  const { user } = useAuthContext();
  const { id } = useParams();
  const userId = user?.uid;
  const [canEdit, setCanEdit] = useState();
  const navigate = useNavigate();
  const { document, error } = useDocument("parties", id);
  const [partyNameTouched, setPartyNameTouched] = useState(false);
  const [detailsTouched, setDetailsTouched] = useState(false);

  const [partyNameError, setPartyNameError] = useState(null);
  const [dateError, setDateError] = useState(null);

  const [detailsError, setDetailsError] = useState(null);
  // const { allDocs } = useCollection('parties')
  const [excludedDates, setExcludedDates] = useState("");
  const [formError, setFormError] = useState(null);


  useEffect(() => {
    if (document) {
      setPartyName(document.partyName);
      setDetails(document.details);
      setCanEdit(document?.author === userId);

      const timestamp = document.date;
  

      const milliseconds = timestamp.seconds * 1000;

      const dateT = new Date(milliseconds);

      // Extract day, month, and year
      const day = dateT.getDate();
      const month = dateT.getMonth() + 1; // Month is zero-indexed, so add 1
      const year = dateT.getFullYear();

      // Create a formatted date string
      let formattedDate = `${month}/${day}/${year}`;

    

      setDate(new Date(formattedDate));

      setCategory(document.category);
    }
    if (parties) {
      
      const forbidenDates = parties.map((d) => d.date);
     

      let formattedDates = forbidenDates.map((forbidenDate) => {
        const milliseconds = forbidenDate.seconds * 1000;
        const dateS = new Date(milliseconds);

        const day = dateS.getDate();
        const month = dateS.getMonth() + 1;
        const year = dateS.getFullYear();

        return `${month}/${day}/${year}`;
      });
      setExcludedDates(formattedDates);
      
    }
  }, [document, parties]);


  const validatePartyName = () => {
    const trimmedPartyName = partyName.trim();

    if (trimmedPartyName.length < 10) {
      setPartyNameError("Party title must be at least 10 characters long");
    } else {
      setPartyNameError(null);
    }
  };

  const validatePartyDetails = () => {
    if (details.trim().length < 15) {
      setDetailsError("Party details must be at least 15 characters long");
    } else {
      setDetailsError(null);
    }
  };

  const validateDate = () => {
    const currentDate = new Date();

    if (date < currentDate) {
      setDateError("Please select a future date");
    } else {
      setDateError(null);
    }
  };

  useEffect(() => {
    validatePartyName();
    validatePartyDetails();
    validateDate();
  }, [partyName, details, date]);


  const newparty = {
    partyName,
    details,
    date,
    category,
    author: user.uid,
    createdBy: user.email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for any validation errors before proceeding
    if (partyNameError || detailsError || dateError) {
      setFormError("Please fix the validation errors before submitting.");
      return;
    }

    const ref = doc(db, "parties", id);
    setFormError(null);
    await updateDoc(ref, newparty);

    toast.success('Successfully updated!', {
      position: 'top-center',
    });
    navigate("/list");
  };


  const onExit = (e) => {
    e.preventDefault();
    toast.success('Update was cancelled', {
      position: 'top-right',
    });
    navigate("/list");
  };

  const deleteParty = async (e) => {
    const ref = doc(db, "parties", id);
    e.preventDefault();
    const hasConfirmed = window.confirm("Are you sure you want to delete this party?");
    if (hasConfirmed) {
      await deleteDoc(ref);
      toast.success('Successfully deleted!', {
        position: 'top-center',
      });
      navigate("/list");
    }
    else {
      return
    }
  }
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
                  Edit party details
                </h1>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section bg-light" id="contact-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-7 text-center mb-5">
              <h2>Update party details</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto mb-5">
              {excludedDates && excludedDates && (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <div className="col-md-12 mb-4 mb-lg-0">
                        <label>Party title</label>
                        <input
                          type="text"
                          className={`form-control ${partyNameError ? "partyName-error" : ""
                            }`}
                          required
                          onChange={(e) => setPartyName(e.target.value)}
                          onBlur={() => setPartyNameTouched(true)}
                          value={partyName}
                        />
                        {partyNameError && partyNameTouched && (
                          <div className="error-message">{partyNameError}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label>Party details</label>
                        <textarea
                          required
                          className={`form-control ${detailsError ? "details-error" : ""
                            }`}
                          cols={30}
                          rows={10}
                          onChange={(e) => setDetails(e.target.value)}
                          onBlur={() => setDetailsTouched(true)}
                          value={details}
                        />
                        {detailsError && detailsTouched && (
                          <div className="error-message">{detailsError}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label>Set due date</label>
                        <div className="singleBox">
                          <DatePicker
                            className={`form-control ${dateError ? "date-error" : ""}`}
                            excludeDates={excludedDates.map((d) => new Date(d))}
                            selected={date}
                            onChange={(date) => {
                              setDate(date);
                              setDateError(null); // Clear the error on change
                            }}
                          />
                          {dateError && (
                            <span className="text-danger">{dateError}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label>Party category</label>
                        <div className="singleBox">
                          <Select
                            className="form-control"
                            onChange={(option) => setCategory(option)}
                            options={categories}
                            value={category}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12 d-flex flex-btn-items" style={{ columnGap: 10 }}>
                        <button
                          type="submit"
                          className="btn btn-primary text-white py-3 px-5"
                        >
                          {`Edit `}
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary text-white py-3 px-5"
                          onClick={onExit}
                        >
                          {`Return `}
                          <FontAwesomeIcon icon={faRotateLeft} />
                        </button>
                        {canEdit && (
                          <button
                            type="submit"
                            className="btn btn-primary text-white py-3 px-5"
                            onClick={deleteParty}
                          >
                            {`Delete `} 
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
