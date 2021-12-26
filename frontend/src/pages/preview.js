import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canva } from "../components/modal";

import eventServices from "../services/eventServices";
// Componenets
import { Navbar } from "../components/navbar";
import { useParams } from "react-router";

const Preview = () => {
  const [loading, setLoading] = useState(true);
  const [previewModal, setPreviewModal] = useState(null);

  const { name } = useParams();
  console.log("The name is: ", name);

  useEffect(async () => {
    const data = await eventServices.getSingleModal(name);
    console.log("The data is: ", data);
    if (!data.data) {
      console.log("SIngle");
      return;
    }
    console.log("data:", data);

    setPreviewModal(data.data);
  }, []);

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
    <>{previewModal && <Canva modalData={previewModal} />}</>
  );
};

export default Preview;
