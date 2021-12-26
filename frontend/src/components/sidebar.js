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
      {modal.map((item) => {
        return (
          <Link to={`/preview/${item.name}`}>
            <div className="">{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
