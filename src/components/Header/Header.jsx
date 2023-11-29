import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Header.css";

function Header() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  console.log(user);

  return (
    <>
      {/* mobile menu */}
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle" />
          </div>
        </div>
        <div className="site-mobile-menu-body">
          <ul className="site-nav-wrap">
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/packages">
                    Packages
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/list">
                    Party's list
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/create">
                    Create party
                  </NavLink>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/signup">
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* header code start */}
      <header className="site-navbar site-navbar-target" role="banner">
        <div className="container mb-3">
          <div className="d-flex align-items-center">
            <div className="site-logo mr-auto">
              <a href="/">
                The Kid's Center<span className="text-primary"></span>
              </a>
            </div>
            <div className="site-quick-contact d-none d-lg-flex ml-auto ">
              <div className="d-flex site-info align-items-center mr-5">
                <span className="block-icon mr-3">
                  <span className="icon-map-marker text-yellow" />
                </span>
                <span>
                  Burgas, Izgrev, bl 4, floor <br /> Bulgaria
                </span>
              </div>
              <div className="d-flex site-info align-items-center">
                <span className="block-icon mr-3">
                  <span className="icon-clock-o" />
                </span>
                <span>
                  Monday - Friday 10:00AM - 19:30 <br /> Saturday - Sunday 10:00 - 14:00
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="menu-wrap d-flex align-items-center">
            <span className="d-inline-block d-lg-none">
              <a
                href="#"
                className="text-black site-menu-toggle js-menu-toggle py-5"
              >
                <span className="icon-menu h3 text-black" />
              </a>
            </span>
            <nav
              className="site-navigation text-left mr-auto d-none d-lg-block"
              role="navigation"
            >
              <ul className="site-menu main-menu js-clone-nav mr-auto ">
                <li>
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/findus" className="nav-link">
                    Find us
                  </NavLink>
                </li>
                {user && (
                  <>
                    <li>
                      <NavLink className="nav-link" to="/about">
                        About
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/packages">
                        Packages
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/list">
                        Party's list
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/create">
                        Create party
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            {user && (
              <div className="userDrop ml-auto">
                <div className="btn-group">
                  <button
                    type="button"
                    className="rounded-pill btn btn-link"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ padding: 0 }}
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="rounded-pill"
                        style={{ height: 45, width: 45 }}
                      />
                    ) : (
                      <img
                        src={`https://ui-avatars.com/api/?name=${user.email}`}
                        alt=""
                        className="rounded-pill"
                        style={{ height: 45, width: 45 }}
                      />
                    )}
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <NavLink to="/profile" className="dropdown-item">
                      Update Profile
                    </NavLink>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
            {!user && (
              <div className="ml-auto">
                <nav
                  className="site-navigation text-left mr-auto d-none d-lg-block"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav mr-auto ">
                    <li>
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/signup">
                        Signup
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            )}

            <div className="top-social">
              <a href="#">
                <span className="icon-facebook text-teal" />
              </a>
              <a href="#">
                <span className="icon-twitter text-success" />
              </a>
              <a href="#">
                <span className="icon-linkedin text-yellow" />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
