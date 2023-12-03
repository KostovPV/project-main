import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errors, setErrors] = useState({});
  const { error, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setErrors({ password: "Passwords don't match!" });
      return;
    }
    setErrors({});
    signup(email, password);
  };

  return (
    <>
      <div className="ftco-blocks-cover-1">
        <div
          className="site-section-cover overlay"
          style={{ backgroundImage: "url('/images/hero_1.jpg')" }}
        >
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-xl-6 mx-auto">
                <div className="authFormCard">
                  <div className="card">
                    <div className="card-body">
                      <div className="authTitle">
                        <h4 className="text-center">Sign up</h4>
                      </div>
                      <div className="formBox">
                        <form onSubmit={handleSubmit}>
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control"
                              placeholder="Enter email id / username"
                              required
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="password"
                              class="form-control"
                              placeholder="Enter password"
                              required
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="password"
                              class="form-control"
                              placeholder="Repet password"
                              required
                              onChange={(e) => setRepassword(e.target.value)}
                              value={repassword}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Sign up
                          </button>
                        </form>
                        {/* Display errors for specific fields */}
                        {errors.password && <div className="error">{errors.password}</div>}

                        {error && (
                          <div className="error">
                            {error.code === "auth/invalid-email"
                              ? "Invalid email address. Please enter a valid email (e.g., example@example.com)."
                              : `Error: ${error.message}`}
                          </div>
                        )}
                        {/* Log the error object to the console for debugging */}
                        {console.log("Error object:", error)}

                        {/* Display generic error */}
                        {error && <div className="error">{error}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
