import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import mapImage from "../../assets/images/map.svg";
import classes from "./Home.module.css";


const Home = () => {

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={12} md={12} className={classes.background}>
          <div className={classes.titleContainer}>
            <h2>Welcome to Home Page</h2>
          </div>
          <img src={mapImage} alt="worldmap" className={classes.worldMap} />
          <div className={classes.homeButtonContainer}>
              <Link to="/map">
                  <Button
                    variant="secondary"
                    size="lg"
                    className={classes.button}                      
                  >
                    Open map
                  </Button>
              </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
