import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdSchool } from "react-icons/io";
import Buttons from "./Buttons";
import LookForSchool from "../Forms/LookForSchoolForm";
import "./BottomMenu.css";

function BottomMenu({isAnalysisDone, setIsAnalysisDone, setAnalysisResults}) {

  const [isAnalysActive, setIsAnalysisActive] = useState(false);

  const handleCollapse = () => {
    setIsAnalysisActive(!isAnalysActive);
  };

  const searchIcon = <AiOutlineSearch />;
  return (
    <div className="botton-menu">
      <div className="bar-container bar-container-top">
        <div className="top-logo-container">
          <IoMdSchool size={30} color="#414141"/>
        </div>
        <p className="divider">|</p>
        <div className="text-container">
          <h6 className="main-title">Analysis</h6>
        </div>
        <Buttons
          type={searchIcon}
          onClick={handleCollapse}
        />
      </div>
      <div className={`modalContainer ${isAnalysActive ? "show" : "hide"}`}>
            <LookForSchool 
              setIsAnalysisActive={setIsAnalysisActive}
              isAnalysisDone={isAnalysisDone}
              setIsAnalysisDone={setIsAnalysisDone}
              setAnalysisResults={setAnalysisResults}
            />
      </div>
    </div>
  );
}

export default BottomMenu;
