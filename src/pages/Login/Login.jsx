import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import "./Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      {/* home page content start */}
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
                        <h4 className="text-center">Login</h4>
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
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isPending ? true : false}
                          >
                            {isPending ? "Loading..." : "Log In"}
                          </button>
                        </form>
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

export default Login;
