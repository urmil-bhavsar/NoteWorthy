import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../CSS/navbar.css"
import AlertContext from "../context/alertContext/AlertContext";

export const NavBar = (props) => {
  const context = useContext(AlertContext)
  const { showAlert } = context

  let location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
    showAlert("Logged out successfully", "success")

  }


  return (
    <>


      <nav className=" navbar navbar-expand-lg navbar-dark bg-dark" data-bs-theme="dark" style={{ boxShadow: "0 0 10px 5px rgba(190,190,190, 1)" }} >
        <div className="container-fluid">
          <Link className="navbar-brand nav-anchors" to="/">
            iNotebook
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link

                  className={`nav-link nav-anchors`}
                  //  ${location.pathname === "home" ? "active" : ""}

                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link nav-anchors `}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? <form className="d-flex" role="search">
              <Link to="/login" className="btn btn-outline-light mx-1 cta-button" type="submit">Login</Link>
              <Link to="/signup" className="btn btn-outline-light mx-2 cta-button" type="submit">Signup</Link>
            </form> :

              <div className="mx-2">
                <button type="button" class="btn  mx-2"
                  data-bs-toggle="popover"
                  // data-bs-placement="bottom"
                  data-bs-title="Urmil"
                  data-bs-content="urmil@gmail.com">
                  {/* <i className="fa-solid fa-user mx-4" /> */}
                </button>
                <button className="btn btn-outline-light cta-button" onClick={handleLogout}>Logout</button>
              </div>}
          </div>
        </div>
      </nav >
    </>
  );
};
