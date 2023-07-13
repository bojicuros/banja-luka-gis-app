import { GoPlus } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import Buttons from "./Buttons";

const BuildingsLayer = (props) => {

  const handleVisible = () => {
    if(props.isBuildingLayerVisible){
      props.setBuildingLayerVisible(false);
    }else{
      props.setBuildingLayerVisible(true);
    }
  };

  const plusIcon = <GoPlus />;
  const pencilIcon = <HiOutlinePencil />;

  const handleEdit = () => {
    if(props.isBuildingLayerVisible && !props.buildingLayerEditMode){
      props.setBuildingLayerEditMode(true);
    }else if(props.isBuildingLayerVisible && props.buildingLayerEditMode){
      props.setBuildingLayerEditMode(false);
    }
  };

  const handleDrawing = () => {
    if(props.isBuildingLayerVisible && !props.buildingLayerDrawingMode){
      props.setBuildingLayerDrawingMode(true);
    }else if(props.isBuildingLayerVisible && props.buildingLayerDrawingMode){ 
      props.setBuildingLayerDrawingMode(false);
    }
  };

  return (
    <>
      <div className="collapsed-container">
        <div className={`bar-container bar-container-individual building ${
              props.isBuildingLayerVisible ? "active" : ""
            }`}>
          <button
            className={`logo-container logo-container-individual building ${
              props.isBuildingLayerVisible ? "active" : ""
            }`}
            onClick={handleVisible}
          >
            <div className="module-eye-icon">
              <FiEye />
            </div>
          </button>
          <div className="text-container container-individual">
            <h2>Building Layer</h2>
            <p>Model</p>
          </div>
            <Buttons
              type={plusIcon}
              onClick={handleDrawing}
              active={props.buildingLayerDrawingMode}
            />
            <Buttons
              type={pencilIcon}
              onClick={handleEdit}
              active={props.buildingLayerEditMode}
            />
        </div>        
      </div>
    </>
  );
};

export default BuildingsLayer;
