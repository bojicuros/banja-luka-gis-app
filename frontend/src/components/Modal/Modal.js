import React from "react";
import ReactDOM from "react-dom";
import SchoolForm from "../Forms/SchoolForm";
import BuildingForm from "../Forms/BuildingForm";
import "./Modal.css";

const Modal = ({ onClose, type, id, setId, coordinates, setIsModalOpen, data, isDrawingMode, isEditMode, setAreSchoolsUpdated, setAreBuildingsUpdated }) => {

  const components = {
    "School Layer": SchoolForm,
    "Building Layer": BuildingForm,
  };

  const Component = components[type];

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modalContainer">
        {Component && 
          <Component 
            id={id} 
            setId={setId}
            coordinates={coordinates} 
            setIsModalOpen={setIsModalOpen}
            data={data}
            isDrawingMode={isDrawingMode}
            isEditMode={isEditMode}
            setAreSchoolsUpdated={setAreSchoolsUpdated}
            setAreBuildingsUpdated={setAreBuildingsUpdated} />
        }
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
