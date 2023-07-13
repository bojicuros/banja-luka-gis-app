import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

const MainNavigation = () => {

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <Nav.Link>Home Page</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/map">
              <Nav.Link>Map</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
