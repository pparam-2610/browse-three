import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/main";
import { Navbar } from "./components/navbar";
import React, { useState, useRef, useEffect, Suspense } from "react";
import eventServices from "./services/eventServices";
import Preview from "./pages/preview";

function App() {
  const [modal, setModal] = useState(null);
  const [modalName, setModalName] = useState(null);

  useEffect(async () => {
    const modalData = await eventServices.getModal();
    setModal(modalData.data);
    setModalName(modalData.data.map((item) => item.name));
  }, []);

  const fetchModal = async () => {
    const modalData = await eventServices.getModal();
    setModal(modalData.data);
    setModalName(modalData.data.map((item) => item.name));
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar modalName={modalName} />
            <Main fetchModal={fetchModal} />
          </Route>
          <Route exact path="/preview/:name">
            <Navbar modalName={modalName} />
            <Preview />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
