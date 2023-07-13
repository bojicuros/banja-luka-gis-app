import React, { useState } from "react";
import { IoMdArrowRoundDown } from "react-icons/io";
import { FiEye } from "react-icons/fi";
import Buttons from "./Buttons";
import SchoolLayer from "./SchoolsLayer";
import BuildingLayer from "./BuildingsLayer";

const ModuleBar = (props) => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="collapsed-container">
      <div className="bar-container bar-container-down">
        <div className="logo-container logo-container-main">
          <button className="module-eye-icon">
            <FiEye color={`${isCollapsed ? "white" : "black"}`} />
          </button>
        </div>
        <div className="text-container">
          <h2>Base Map</h2>
          <p>Module</p>
        </div>
        <Buttons
          type={<IoMdArrowRoundDown />}
          isCollapsed={isCollapsed}
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      </div>
      <div className={`expand-container ${isCollapsed ? "show" : "hide"}`}>
        <SchoolLayer
          isSchoolLayerVisible={props.isSchoolLayerVisible}
          setSchoolLayerVisible={props.setSchoolLayerVisible}
          schoolLayerDrawingMode={props.schoolLayerDrawingMode}
          setSchoolLayerDrawingMode={props.setSchoolLayerDrawingMode}
          schoolLayerEditMode={props.schoolLayerEditMode}
          setSchoolLayerEditMode={props.setSchoolLayerEditMode}
         />
        <BuildingLayer 
         isBuildingLayerVisible={props.isBuildingLayerVisible}
         setBuildingLayerVisible={props.setBuildingLayerVisible}
         buildingLayerDrawingMode={props.buildingLayerDrawingMode}
         setBuildingLayerDrawingMode={props.setBuildingLayerDrawingMode}
         buildingLayerEditMode={props.buildingLayerEditMode}
         setBuildingLayerEditMode={props.setBuildingLayerEditMode}
         />
      </div>
    </div>
  );
};

export default ModuleBar;
