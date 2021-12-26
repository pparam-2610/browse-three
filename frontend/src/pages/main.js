import React, { useState, useRef, useEffect, Suspense } from "react";

// Styles
import "../styles/main.css";

// Componenets
import { Canva } from "../components/modal";
import { Sidebar } from "../components/sidebar";
import { Upload } from "../components/upload";

const Main = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="main-content">
        <Sidebar />
        <Upload />
      </div>
    </>
  );
};

export default Main;
