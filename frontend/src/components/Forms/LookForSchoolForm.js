import InputGroup from "../InputGroup/InputGroup";
import classes from "../../components/InputGroup/InputGroup.module.css";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";

const LookForSchool = ({ isAnalysisDone, setIsAnalysisActive, setIsAnalysisDone, setAnalysisResults }) => {

  const [features, setFeatures] = useState(null);

  const defaultValues = useMemo(
    () => ({
      distance1: 300,
      distance2: 500,
      distance3: 500,
      count: 50
    }), []
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

  const handlePanel = (data) => {
    setFeatures({
      distance1: data.distance1,
      distance2: data.distance2,
      distance3: data.distance3,
      count: data.count
    });

    handleClose();
    reset();
  };

  const handleClose = () => {
    setIsAnalysisActive(false);
  }


  useEffect(() => {
    const getNewSchool = async () => {
      if (features != null) {
        try {
          // Construct the URL with query parameters
          const url = new URL('http://localhost:8080/buildings/school');
          url.searchParams.append('param1', features.distance1);
          url.searchParams.append('param2', features.distance2);
          url.searchParams.append('param3', features.distance3);
          url.searchParams.append('param4', features.count);

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setAnalysisResults(data);
          } 
        } catch (error) {
          console.error('Error getting school:', error);
        }
      }
    };

    const delay = 500;
    const timeout = setTimeout(() => {
      getNewSchool();
      setIsAnalysisDone(false);
    }, delay);

    return () => clearTimeout(timeout);

  }, [setAnalysisResults, setIsAnalysisDone, features]);



  return (
    <Container className="h-100">
      <div className="d-flex my-3 align-items-center justify-content-center flex-column my-xl-0 h-100 ">
        <Form
          onSubmit={handleSubmit(handlePanel)}
          className={`${classes.boxShadow} w-100 position-relative p-4 p-md-5 rounded-4 bg-white`}
        >
          <div className="text-center mb-4">
            <h3>New school location</h3>
            <span className="text-muted my-4 lh-lg">
              Fill fields to find location for new school
            </span>
            <Button
              className="position-absolute top-0 end-0 m-3"
              variant="dark"
              size="sm"
              onClick={handleClose}
            >
              ✕
            </Button>
          </div>
          <Row>
            <Col xs={6} md={6}>
              <InputGroup
                name="Distance from road"
                placeholder="300"
                type="number"
                nameValue="distance1"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Distance from road is required!",
                  },
                }}
                error={errors.distance1?.message}
              />
            </Col>

            <Col xs={6} md={6}>
              <InputGroup
                name="Distance from nearest school"
                placeholder="500"
                type="number"
                nameValue="distance2"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Distance from nearest school is required!",
                  },
                }}
                error={errors.distance2?.message}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <InputGroup
                name="Radius for surrounding buildings"
                placeholder="500"
                type="number"
                nameValue="distance3"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Radius for surrounding buildings is required!",
                  },
                }}
                error={errors.distance3?.message}
              />
            </Col>

            <Col xs={6} md={6}>
              <InputGroup
                name="Number of residential building"
                placeholder="50"
                type="number"
                nameValue="count"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Number of residential building is required!",
                  },
                }}
                error={errors.count?.message}
              />
            </Col>
          </Row>

          <Col className="mt-4 d-flex justify-content-end">
            <Button variant="success" className="px-5" type="submit">
              Search
            </Button>
          </Col>

        </Form>
      </div>
    </Container>
  );
};

export default LookForSchool;
