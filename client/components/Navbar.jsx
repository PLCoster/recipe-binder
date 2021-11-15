import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => (
  <nav className="navbar navbar-expand-sm navbar-light bg-light">
    {/* {NAVBAR LEFT} */}
    <div className="container-fluid">
      <Link to="/">
        <FontAwesomeIcon id="Logo" icon={faUtensils} />
        <button type="button" className="navbar-brand">
          recipe-binder
        </button>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/">
              <button type="button" className="nav-link">
                Home
              </button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/addRecipe">
              <button type="button" className="nav-link">
                Create a New Recipe
              </button>
            </Link>
          </li>
        </ul>

        {/* {NAVBAR RIGHT} */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
