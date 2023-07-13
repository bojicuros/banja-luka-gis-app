import InputGroup from "../InputGroup/InputGroup";
import classes from "../../components/InputGroup/InputGroup.module.css";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";

const SchoolForm = (props) => {

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    if (props.coordinates !== null) {
      setLat(props.coordinates[0]);
      setLng(props.coordinates[1]);
    }
  }, [props.coordinates]);

  const deleteHandler = () => {
    deleteSchool(props.id);
    props.setIsModalOpen(false);
  };

  const deleteSchool = (id) => {
    schoolDelete(id);
    props.setId(null);
    props.setAreSchoolsUpdated(true);
  };

  const schoolDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/schools/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('School deleted successfully');
      } else {
        console.error('Error deleting school:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting school:', error);
    }
  };

  const createSchool = (features) => {
    schoolCreate(features);
    props.setAreSchoolsUpdated(true);
  };

  const schoolCreate = async (schoolData) => {
    try {
      const response = await fetch('http://localhost:8080/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('School created successfully:', data);
      } else {
        console.error('Error creating school:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating school:', error);
    }
  };

  const updateSchool = (data) => {
    schoolUpdate(data.id, data.data);
    props.setId(null);
    props.setAreSchoolsUpdated(true);
  };

  const schoolUpdate = async (id, schoolData) => {
    try {
      const response = await fetch(`http://localhost:8080/schools/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('School updated successfully:', data);
      } else {
        console.error('Error updating school:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating school:', error);
    }
  };



  const defaultValues = useMemo(
    () => ({
      name: "",
      addr_street: "",
      addr_house: "",
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
      const filteredSchool = props.data.schools.find((school) => school.id === props.id);

      const updatedDefaultValues = {
        name: filteredSchool?.name || "",
        addr_street: filteredSchool?.addr_street || "",
        addr_house: filteredSchool?.addr_house || "",
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
      name: data.name,
      addr_street: data.addr_street,
      addr_house: data.addr_house,
    };

    if (props.isDrawingMode) {
      createSchool(features);
    }
    else if (props.isEditMode) {
      updateSchool({ id: props.id, data: features });
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
              <h3>Create new School</h3>
            ) : (
              <h3>Details for School</h3>
            )}
            <span className="text-muted my-4 lh-lg">
              {!props.id
                ? "Please add details for new School"
                : "Check details for School"}
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
            <Col xs={6} md={4}>
              <InputGroup
                name="School Name"
                placeholder="School Name"
                type="text"
                nameValue="name"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "School Name is required!",
                  },
                }}
                error={errors.name?.message}
              />
            </Col>

            <Col xs={6} md={4}>
              <InputGroup
                name="Street Address"
                placeholder="Street Address"
                type="text"
                nameValue="addr_street"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Street Address is required!",
                  },
                }}
                error={errors.addr_street?.message}
              />
            </Col>

            <Col xs={6} md={4}>
              <InputGroup
                name="House Address"
                placeholder="House Address"
                type="text"
                nameValue="addr_house"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "House Address is required!",
                  },
                }}
                error={errors.addr_house?.message}
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

export default SchoolForm;
