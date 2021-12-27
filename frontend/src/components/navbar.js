import React, { Suspense } from "react";

//Styles
import "../styles/navbar.css";

//Assets
import Logo from "../assets/three.png";

//Components
import { SearchBar } from "./searchbar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export function Navbar({ modalName }) {
  const history = useHistory();
  console.log("The history is in Navbar: ", history, modalName);

  return (
    <div className="top-navbar-div">
      <div className="nav-div-start">
        <div className="nav-logo-img-div">
          <img src={Logo} />
        </div>
      </div>
      <div className="nav-div-middle">
        <div className="nav-middle-search-div">
          <SearchBar modalName={modalName} history={history} />
        </div>
      </div>
      <div className="nav-div-end">
        <div className="nav-div-upload-btn">
          <Button
            variant="primary"
            onClick={() => {
              history.push("/");
            }}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
