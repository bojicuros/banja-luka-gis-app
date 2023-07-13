import React, { useState } from "react";
import ModuleBar from "./ModuleBar";
import { IoMdArrowRoundDown } from "react-icons/io";
import { MdMap } from "react-icons/md";
import Buttons from "./Buttons";
import "./LeftMenu.css";

function LeftMenu(props) {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const arrowIcon = <IoMdArrowRoundDown />;
  return (
    <div className="left-menu">
      <div className="bar-container bar-container-top">
        <div className="top-logo-container">
          <MdMap size={30} color="#414141"/>
        </div>
        <p className="divider">|</p>
        <div className="text-container">
          <h6 className="main-title">Layers</h6>
        </div>
        <Buttons
          type={arrowIcon}
          isCollapsed={isCollapsed}
          onClick={handleCollapse}
        />
      </div>
      <div className={`expand-container ${isCollapsed ? "show" : "hide"}`}>
        <div className="collapse-div">
          <ModuleBar
            isBuildingLayerVisible={props.isBuildingLayerVisible}
            setBuildingLayerVisible={props.setBuildingLayerVisible}
            buildingLayerDrawingMode={props.buildingLayerDrawingMode}
            setBuildingLayerDrawingMode={props.setBuildingLayerDrawingMode}
            buildingLayerEditMode={props.buildingLayerEditMode}
            setBuildingLayerEditMode={props.setBuildingLayerEditMode}
            isSchoolLayerVisible={props.isSchoolLayerVisible}
            setSchoolLayerVisible={props.setSchoolLayerVisible}
            schoolLayerDrawingMode={props.schoolLayerDrawingMode}
            setSchoolLayerDrawingMode={props.setSchoolLayerDrawingMode}
            schoolLayerEditMode={props.schoolLayerEditMode}
            setSchoolLayerEditMode={props.setSchoolLayerEditMode}
            layers="panels" />
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
