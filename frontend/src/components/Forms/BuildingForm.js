import InputGroup from "../InputGroup/InputGroup";
import classes from "../../components/InputGroup/InputGroup.module.css";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";

const BuildingForm = (props) => {

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    if (props.coordinates !== null) {
      setLat(props.coordinates[0]);
      setLng(props.coordinates[1]);
    }
  }, [props.coordinates]);

  const deleteHandler = () => {
    deleteBuilding(props.id);
    props.setIsModalOpen(false);
  };

  const deleteBuilding = (id) => {
    buildingDelete(id);
    props.setId(null);
    props.setAreBuildingsUpdated(true);
  };

  const buildingDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/buildings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Building deleted successfully');
      } else {
        console.error('Error deleting building:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting building:', error);
    }
  };

  const createBuilding = (features) => {
    buildingCreate(features);
    props.setAreBuildingsUpdated(true);
  };

  const buildingCreate = async (buildingData) => {
    try {
      const response = await fetch('http://localhost:8080/buildings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildingData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Building created successfully:', data);
      } else {
        console.error('Error creating building:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating building:', error);
    }
  };


  const updateBuilding = (data) => {
    buildingUpdate(data.id, data.data);
    props.setId(null);
    props.setAreBuildingsUpdated(true);
  };

  const buildingUpdate = async (id, buildingData) => {
    try {
      const response = await fetch(`http://localhost:8080/buildings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildingData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Building updated successfully:', data);
      } else {
        console.error('Error updating building:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating building:', error);
    }
  };

  const defaultValues = useMemo(
    () => ({
      type: "",
      date: "",
      geom: `POINT(${lat} ${lng})`,
    }),
    [lat, lng]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });


  useEffect(() => {
    if (props.id) {
      const filteredBuilding = props.data.buildings.find((building) => building.id === props.id);

      const updatedDefaultValues = {
        type: filteredBuilding?.type || "",
        date: filteredBuilding?.date || "",
        geom: `POINT(${lat} ${lng})`,
      };

      reset(updatedDefaultValues);
    } else {
      reset(defaultValues);
    }
  }, [props.id, defaultValues, lat, lng, props.data, reset]);


  const handlePanel = (data) => {
    const features = {
      geometry: `POINT(${lat} ${lng})`,
      type: data.type,
      date: data.date
    };

    if (props.isDrawingMode) {
      createBuilding(features);
    }
    if (props.isEditMode) {
      updateBuilding({ id: props.id, data: features });
    }
    reset();
    props.setIsModalOpen(false);
  };

  return (
    <Container className="h-100">
      <div className="d-flex my-3 align-items-center justify-content-center flex-column my-xl-0 h-100 ">
        <Form
          onSubmit={handleSubmit(handlePanel)}
          className={`${classes.boxShadow} w-100 position-relative p-4 p-md-5 rounded-4 bg-white`}
        >
          <div className="text-center mb-4">
            {!props.id ? (
              <h3>Create new Building</h3>
            ) : (
              <h3>Details for Building</h3>
            )}
            <span className="text-muted my-4 lh-lg">
              {!props.id
                ? "Please add details for new Building"
                : "Check details for Building"}
            </span>
            <Button
              className="position-absolute top-0 end-0 m-3"
              variant="dark"
              size="sm"
              onClick={() => props.setIsModalOpen(false)}
            >
              ✕
            </Button>
          </div>
          <Row>
            <Col xs={6} md={7}>
              <InputGroup
                name="Type of Building"
                placeholder="Type of Building"
                type="text"
                nameValue="type"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Type of Building is required!",
                  },
                }}
                error={errors.type?.message}
              />
            </Col>

            <Col xs={6} md={5}>
              <InputGroup
                name="Date of entry"
                placeholder="Date of entry"
                type="text"
                nameValue="date"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Date of entry is required!",
                  },
                }}
                error={errors.date?.message}
              />
            </Col>
          </Row>

          {!props.id ? (
            <Button className="w-100 mt-4" variant="dark" type="submit">
              Create
            </Button>
          ) : (
            <Col className="mt-4 d-flex justify-content-end">
              <Button variant="danger" className="me-3" onClick={deleteHandler}>
                Remove
              </Button>
              <Button variant="success" className="px-5" type="submit">
                Submit
              </Button>
            </Col>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default BuildingForm;
