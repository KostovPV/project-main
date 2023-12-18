import "./Create.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useDocument } from "../../hooks/useDocument";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import "react-datepicker/dist/react-datepicker.css";
import { useCollection } from "../../hooks/useCollection";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

const categories = [
  { value: "birthday", label: "Birthday-party" },
  { value: "casual", label: "Games" },
  { value: "special", label: "Single-Program" },
  { value: "day-care", label: "Kids-day" },
];

function Creat() {
  const [partyName, setPartyName] = useState("");
  const [partyNameTouched, setPartyNameTouched] = useState(false);
  const [partyNameError, setPartyNameError] = useState(null);

  const { user } = useAuthContext();
  const [details, setDetails] = useState("");
  const [detailsTouched, setDetailsTouched] = useState(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [date, setDate] = useState(new Date());
  const { documents: parties } = useCollection("parties");
  const [excludedDates, setExcludedDates] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [dateError, setDateError] = useState(null);

  useEffect(() => {
    if (parties) {  
      const forbiddenDates = parties.map((d) => d.date);
   
      let formattedDates = forbiddenDates.map((forbiddenDate) => {
        const milliseconds = forbiddenDate.seconds * 1000;
        const dateS = new Date(milliseconds);

        const day = dateS.getDate();
        const month = dateS.getMonth() + 1;
        const year = dateS.getFullYear();

        return `${month}/${day}/${year}`;
      });
      setExcludedDates(formattedDates);
      
    }
  }, [parties]);

  const validatePartyName = () => {
    const trimmedPartyName = partyName.trim();

    if (trimmedPartyName.length < 10) {
      setTitleError("Party title must be at least 10 characters long");
    } else {
      setTitleError(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (titleError || detailsError || dateError) {
      setFormError("Please fix the validation errors before submitting.");
      return;
    }

    const ref = collection(db, "parties");
    setFormError(null);
    await addDoc(ref, {
      partyName,
      details,
      date,
      category,
      author: user.uid,
      createdBy: user.email,
    });

    toast.success('Successfully created!', {
      position: 'top-right',
    });

    setPartyName("");
    setDetails("");
    setDate("");
    setCategory("");
    navigate("/list");
  };

  const onExit = (e) => {
    e.preventDefault();
    toast.success('Changes not saved!', {
      position: 'top-right',
    });
    navigate("/list");
    navigate("/list");
  };


  return (
    <>
      <div className="ftco-blocks-cover-1">
        <div
          className="site-section-cover overlay subpageBanner"
          style={{ backgroundImage: "url('/images/deca3.jpg')" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">
                  Welcome To Our Website
                </span>
                <h1 className="mb-3 font-weight-bold text-teal">
                  Create your party
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
              <h2>Create your party now</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto mb-5">
              <Toaster
               
                reverseOrder={false}
              />
              {excludedDates && (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <div className="col-md-12 mb-4 mb-lg-0">
                        <label>Party title</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          onChange={(e) => setPartyName(e.target.value)}
                          onBlur={() => {
                            validatePartyName();
                            setPartyNameTouched(true);
                          }}
                          value={partyName}
                        />
                        {titleError && partyNameTouched && (
                          <span className="text-danger">{titleError}</span>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label>Party details</label>
                        <textarea
                          required
                          className="form-control"
                          cols={30}
                          rows={10}
                          onChange={(e) => setDetails(e.target.value)}
                          onBlur={() => {
                            validatePartyDetails();
                            setDetailsTouched(true);
                          }}
                          value={details}
                        />
                        {detailsError && detailsTouched && (
                          <span className="text-danger">{detailsError}</span>
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
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 30)}
                            selected={date}
                            onChange={(date) => {
                              setDate(date);
                              setDateError(null); 
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
                            required
                            onChange={(option) => setCategory(option)}
                            options={categories}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12 d-flex" style={{ columnGap: 10 }}>
                        <button
                          type="submit"
                          className="btn btn-primary text-white py-3 px-5"
                        >
                          {`Add `}
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary text-white py-3 px-5"
                          onClick={onExit}
                        >
                          {`Return to list `}
                          <FontAwesomeIcon icon={faRotateLeft} />
                        </button>
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

export default Creat;
