import { GoPlus } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import Buttons from "./Buttons";

const SchoolsLayer = (props) => {

  const handleVisible = () => {
    if(props.isSchoolLayerVisible){
      props.setSchoolLayerVisible(false);
    }else{
      props.setSchoolLayerVisible(true);
    }
  };

  const plusIcon = <GoPlus />;
  const pencilIcon = <HiOutlinePencil />;

  const handleEdit = () => {
    if(props.isSchoolLayerVisible && props.schoolLayerEditMode === false){
      props.setSchoolLayerEditMode(true);
    }else{
      props.setSchoolLayerEditMode(false);
    }
  };

  const handleDrawing = () => {
    if(props.isSchoolLayerVisible && props.schoolLayerDrawingMode === false){
      props.setSchoolLayerDrawingMode(true);
    }else{
      props.setSchoolLayerDrawingMode(false);
    }
  };

  return (
    <>
      <div className="collapsed-container">
        <div
          className={`bar-container bar-container-individual school ${
            props.isSchoolLayerVisible ? "active" : ""
          }`}
        >
          <button
            className={`logo-container logo-container-individual school ${
              props.isSchoolLayerVisible ? "active" : ""
            }`}
            onClick={handleVisible}
          >
            <div className="module-eye-icon">
              <FiEye />
            </div>
          </button>
          <div className="text-container container-individual">
            <h2>School layer</h2>
            <p>Model</p>
          </div>
            <Buttons
              type={plusIcon}
              onClick={handleDrawing}
              active={props.schoolLayerDrawingMode}
            />
            <Buttons
              type={pencilIcon}
              onClick={handleEdit}
              active={props.schoolLayerEditMode}
            />
        </div>
      </div>
    </>
  );
};

export default SchoolsLayer;
