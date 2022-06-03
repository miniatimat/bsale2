import React from "react";
import {Link, useHistory} from "react-router-dom";
import FilterCategories from "../../FilterCategories/FilterCategories";
import SearchBar from "../../SearchBar/SearchBar";
import "./LoggedNavBar.css";
import {useAuth} from "../../../context/authContext";
export default function LoggedNavBar() {

  const {logout} = useAuth()
  const history = useHistory();
  const logoutSesion = async () => {
    // let user = JSON.parse(localStorage.getItem("myUser"))
    await logout
    localStorage.removeItem("myUser");
  };
  return (
    <div className="header-nav">
      {/* <Link to="/">Home</Link> */}
      <div className="container-actions-user">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <a className="dropbtn">Categories</a>
          <div className="dropdown-content-categories">
            <FilterCategories />
          </div>
        </div>
      </div>

      <SearchBar />

      <div className="container-actions-user">
        <div className="dropdown">
          <a className="dropbtn">Profile</a>
          <div className="dropdown-content">
            <Link to="/accountDetails"> Account Details </Link>
            <Link to="/favorites">Favorites</Link>
            <Link onClick={logoutSesion} to="/">
              Log Out
            </Link>
          </div>
        </div>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}
