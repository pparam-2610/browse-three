import React, { useState, useRef, useEffect, Suspense } from "react";

//Styles
import "../styles/navbar.css";

//Assets
import Logo from "../assets/three.png";

//Components
import { SearchBar } from "./searchbar";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import eventServices from "../services/eventServices";

export function Sidebar({}) {
  const history = useHistory();
  console.log("The history is in sidebar: ", history);

  const [modal, setModal] = useState([]);

  useEffect(async () => {
    const modalData = await eventServices.getRecentModal();
    console.log("The modal datais: ", modalData);
    setModal(modalData.data);
    // setModalName(modalData.data.map((item) => item.name));
  }, []);

  return (
    <div className="sidebar-div">
      <div className="sidebar-main-div">
        {modal.map((item) => {
          return (
            <a
              style={{
                textDecoration: "none",
                color: "white",
                fontStyle: "italic",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = `/preview/${item.name}`;
              }}
            >
              <div className="sidebar-content-div">{item.name}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
