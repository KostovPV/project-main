import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";

import { useNavigate } from "react-router-dom";

import "./Profile.scss";

function Prifile() {
  const { user } = useAuthContext();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://th.bing.com/th/id/OIP.aXaaimA5JT6Lp3XYXN5FGAAAAA?pid=ImgDet&w=206&h=206&c=7"
  );
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  async function updateUserProfile(file, user, setLoading) {
    const fileRef = ref(storage, user.uid + ".png");
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const newPhotoURL = await getDownloadURL(fileRef);

    try {
      await updateProfile(user, { photoURL: newPhotoURL });
      dispatch({ type: "UPDATE", payload: { ...user, photoURL: newPhotoURL } });
      setPhotoURL(newPhotoURL);
      setLoading(false);
      alert("Uploaded file!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  function handleClick() {
    updateUserProfile(photo, user, setLoading);
  }

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

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
                  Update user profile
                </h1>
                <p>
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                  <span className="mx-3">/</span>{" "}
                  <strong>Update profile</strong>
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
              <h2>Update profile now</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto mb-5">
              <div className="updateFileImage">
                <div className="current_image">
                  <img src={photoURL} alt="Avatar" className="avatar" />
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={handleChange}
                    id="inputGroupFile01"
                  />
                  <label htmlFor="inputGroupFile01">
                    Choose file to update image{" "}
                  </label>
                </div>
              </div>
              <br />
              <div className="uploadButton">
                <p>{photo != null ? photo.name : null}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={loading || !photo}
                  onClick={handleClick}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prifile;
