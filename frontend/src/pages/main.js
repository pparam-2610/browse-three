import React, { useState, useRef, useEffect, Suspense } from "react";

// Styles
import "../styles/main.css";

// Componenets
import { Canva } from "../components/modal";
import { Sidebar } from "../components/sidebar";
import { Upload } from "../components/upload";

const Main = ({ fetchModal }) => {
  const [loading, setLoading] = useState(true);
  console.log("The function is: ", fetchModal);
  return (
    <>
      <div className="main-content">
        <Sidebar />
        <Upload fetchModal={fetchModal} />
      </div>
    </>
  );
};

export default Main;
