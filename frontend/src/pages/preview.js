import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canva } from "../components/modal";
import { useParams } from "react-router";

import eventServices from "../services/eventServices";

// Styles
import "../styles/main.css";

// Componenets
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { Upload } from "../components/upload";

const Preview = () => {
  const [loading, setLoading] = useState(true);
  const [previewModal, setPreviewModal] = useState(null);

  const { name } = useParams();
  console.log("The name is: ", name);

  useEffect(async () => {
    const data = await eventServices.getSingleModal(name);
    console.log("The data is: ", data);
    if (!data.data) {
      console.log("Single");
      return;
    }
    console.log("data:", data);

    setPreviewModal(data.data);
  }, [name]);

  return (
    // <div className="main_wrapper">
    //   Hi
    //   {modal &&
    //     modal.map((item) => {
    //       return <>{item.name}</>;
    //     })}
    //   <div className="main-container">
    //     <div className="model-box">
    //       {/* {loading && <CustomLoader />} */}
    //       {/* <ThreeContainer loading={loading} setLoading={setLoading} /> */}
    //       {/* <Canva /> */}
    //     </div>
    //   </div>
    //   {/* {window.innerWidth > 720 ? <Footer /> : <></>} */}
    // </div>
    <>
      <div className="main-content">
        <Sidebar />
        {/* <Upload /> */}
        <div className="right-preview-div">
          <div className="right-preview-header">
            <h1>{previewModal ? previewModal.name : "Please Wait"}</h1>
          </div>
          <div className="right-preview-content">
            {previewModal && <Canva modalData={previewModal} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
