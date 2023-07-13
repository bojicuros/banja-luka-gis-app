import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import compass from "../../assets/images/compass.png";
import classes from "./NotFound.module.css";


const NotFound = () => {

    return (
        <Container fluid className="h-100">
            <Row className="h-100">
                <Col md={12} className={classes.background}>
                    <div className={classes.titleContainer}>
                        <h3>Oops! The page you were looking for was not found.</h3>
                        <h5>Try clicking on the home page or map to explore other options.</h5>
                    </div>
                    <img src={compass} alt="compass" className={classes.compass} />
                </Col>
            </Row>
        </Container>
    );
};
export default NotFound;
