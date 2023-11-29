import React from "react";
import "./Create.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

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

const categories = [
  { value: "birthday", label: "Birthday-party" },
  { value: "casual", label: "Games" },
  { value: "special", label: "Single-Program" },
  { value: "day-care", label: "Kids-day" },
];

function Creat() {
  const { documents: parties } = useCollection("parties");
  const [excludedDates, setExcludedDates] = useState("");

  useEffect(() => {
    if (parties) {
      console.log("parties", parties);
      const forbidenDates = parties.map((d) => d.date);
      console.log(forbidenDates);

      let formattedDates = forbidenDates.map((forbidenDate) => {
        const milliseconds = forbidenDate.seconds * 1000;
        const dateS = new Date(milliseconds);

        const day = dateS.getDate();
        const month = dateS.getMonth() + 1;
        const year = dateS.getFullYear();

        return `${month}/${day}/${year}`;
      });
      setExcludedDates(formattedDates);
      console.log(formattedDates);
    }
  }, [parties]);

  const [partyName, setPartyName] = useState("");
  const { user } = useAuthContext();
  const [details, setDetails] = useState("");
  // const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [date, setDate] = useState(new Date());
  console.log("user", user);
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

    const ref = collection(db, "parties");
    setFormError(null);
    await addDoc(ref, newparty);
    setPartyName("");
    setDetails("");
    setDate("");
    setCategory("");
    navigate("/list");
  };

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
                <span className="text-cursive h5 text-red">
                  Welcome To Our Website
                </span>
                <h1 className="mb-3 font-weight-bold text-teal">
                  Create your party
                </h1>
                <p>
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                  <span className="mx-3">/</span> <strong>Create party</strong>
                </p>
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
                          value={partyName}
                        />
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
                          value={details}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label>Set due date</label>
                        <div className="singleBox">
                          <DatePicker
                            className="form-control"
                            excludeDates={excludedDates.map((d) => new Date(d))}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 30)}
                            selected={date}
                            onChange={(date) => setDate(date)}
                          />
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
                          Add
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary text-white py-3 px-5"
                          onClick={onExit}
                        >
                          Return to Party's list
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
