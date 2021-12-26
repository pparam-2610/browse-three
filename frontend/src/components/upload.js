import React, { Suspense, useState } from "react";

//Styles
import "../styles/main.css";

//Assets
import Logo from "../assets/three.png";

//Components
import { SearchBar } from "./searchbar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import eventServices from "../services/eventServices";

export function Upload({}) {
  const history = useHistory();
  //   console.log("The history is: ", history);

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);
  const [newModal, setNewModal] = useState(null);

  const submitForm = async () => {
    setLoad(true);
    const formData = new FormData();

    // Update the formData object
    formData.append("images", file);
    formData.append("name", name);

    const data = await eventServices.addModal(formData, name);
    console.log("Newly added modal: ", data);
    if (!data.error) {
      setNewModal(data.details.modal);
      setSuccess(true);
    } else {
      setMessage(data.details?.message);
    }
    setLoad(false);
  };

  return (
    <div className="upload-div">
      <div className="form-upload-div">
        <div className="form-upload-header">
          <h1>UPLOAD</h1>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("The naem is: ", name, file);
            submitForm();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <Form.Text className="text-muted">
              Enter a name for the modal, it must be unique.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              placeholder="Select file"
              onChange={(e) => {
                console.log("The file is: ", e.target.files[0]);
                setFile(e.target.files[0]);
              }}
              required
            />
            <Form.Text className="text-muted">
              Select only a .glb file
            </Form.Text>
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <div className="bottom-upload-btn-div">
            {!load ? (
              <Button variant="primary" type="submit" className="m-2">
                Submit
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="m-2"
                style={{ opacity: 0.5 }}
                disabled
              >
                Submit
              </Button>
            )}

            {success ? (
              <Button
                variant="success"
                type="button"
                className="m-2"
                onClick={() => {
                  history.push(`/preview/${newModal.name}`);
                }}
              >
                Preview
              </Button>
            ) : (
              <Button
                variant="success"
                type="button"
                className="m-2"
                style={{ opacity: 0.5 }}
                disabled
              >
                Preview
              </Button>
            )}
          </div>
        </Form>
        <span style={{ color: success ? "green" : "red" }}>{message}</span>
      </div>
    </div>
  );
}
