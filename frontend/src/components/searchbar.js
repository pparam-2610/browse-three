/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
const ref = React.createRef();

export const SearchBar = ({ modalName, history }) => {
  const [name, setName] = useState("");

  console.log("Inside searchbar: ", modalName);
  const handleChange = (selectedOptions) => {
    console.log("checking for changes: ", selectedOptions[0]);
    if (!selectedOptions.length) handleInputChange(name);
    else {
      setName(selectedOptions[0]);
      //   checkname(selectedOptions[0]);
    }
  };

  const handleInputChange = (input, e) => {
    console.log("value: ", input);
    setName(input);
    // checkname(input);
  };

  const checkname = (name1) => {
    if (name1 === "") {
      //   props.searchName(props.list);
      return;
    } else {
      let newValues = modalName.filter((info) => {
        if (info.toLowerCase().includes(name1.toLowerCase().trim())) {
          return info;
        }
      })[0];
      //   props.searchName(newValues);
      console.log("The searched name is: ", newValues);
      // if (newValues) history.push(`/preview/${newValues}`);
      if (newValues) window.location.href = `/preview/${newValues}`;
      setName("");
    }
  };

  return (
    <div className="jumbotron searchBar" style={{ backgroundColor: "#D4DADF" }}>
      <div className="input-group mb-3">
        <Typeahead
          id="typeaheadBar"
          options={modalName}
          minLength={1}
          placeholder={`Search A Modal`}
          onChange={handleChange}
          onInputChange={handleInputChange}
          ref={ref}
        />
        <div className="input-group-prepend ml-1">
          <span className="input-group-text border-0 bg-transparent">
            <i
              className="fa fa-search search-hover"
              onClick={() => {
                checkname(name);
                ref.current.clear();
              }}
            >
              Search
            </i>
          </span>
        </div>
      </div>
    </div>
  );
};

export const Progress = () => {
  return (
    <div className="progress mb-4">
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow="70"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: "70%" }}
      >
        <span className="sr-only">70% Complete</span>
      </div>
    </div>
  );
};

export const multiSelectStyles = {
  searchBox: { borderRadius: "20px" },
  chips: { borderRadius: "20px" },
  optionContainer: { borderRadius: "20px" },
};
