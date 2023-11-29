import { useEffect, useState } from "react";

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

  // const { allDocs } = useCollection('parties')
  const [excludedDates, setExcludedDates] = useState("");

  useEffect(() => {
    if (document) {
      setPartyName(document.partyName);
      setDetails(document.details);
      setCanEdit(document?.author === userId);

      const timestamp = document.date;
      console.log("timestamp", timestamp);

      const milliseconds = timestamp.seconds * 1000;

      const dateT = new Date(milliseconds);

      // Extract day, month, and year
      const day = dateT.getDate();
      const month = dateT.getMonth() + 1; // Month is zero-indexed, so add 1
      const year = dateT.getFullYear();

      // Create a formatted date string
      let formattedDate = `${month}/${day}/${year}`;

      console.log("formattedDate", formattedDate); // Output: 20.11.2023

      setDate(new Date(formattedDate));

      setCategory(document.category);
    }
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
  }, [document, parties]);

  const [formError, setFormError] = useState(null);

  console.log(document);

  console.log("category", category);
  console.log("user", user);
  console.log(" date", date);
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

    const ref = doc(db, "parties", id);
    setFormError(null);
    await updateDoc(ref, newparty);
    navigate("/list");
  };

  const onExit = (e) => {
    e.preventDefault();
    navigate("/list");
  };

  const deleteParty = async (e) => {
    const ref = doc(db, "parties", id);
    e.preventDefault();
    await deleteDoc(ref);
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
                  Edit party details
                </h1>
                <p>
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                  <span className="mx-3">/</span> <strong>Edit details</strong>
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
                            value={category}
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
                          Update
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary text-white py-3 px-5"
                          onClick={onExit}
                        >
                          Return to Party's list
                        </button>
                        {canEdit && (
                          <button
                            type="submit"
                            className="btn btn-primary text-white py-3 px-5"
                            onClick={deleteParty}
                          >
                            Delete
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
