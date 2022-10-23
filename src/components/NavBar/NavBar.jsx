import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { GiBookshelf } from "react-icons/gi";
import { BsBookshelf } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
const NavBar = ({ user, handleLogout }) => {
  return (
    <div className={styles.navBarMainBody}>
      <div>
        {user ? (
          <Navbar expand="lg" className={styles.navBar}>
            <Container fluid>
              <GiBookshelf />
              <Navbar.Brand href="/">Book Store</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "40rem" }}
                  navbarScroll
                >
                  <Nav.Link href="/profiles">View Other Profiles</Nav.Link>
                  <Nav.Link href={`/profileDetail/${user.profile}`}>
                    <BsBookshelf />
                    {user.name} Books
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#deets">More deets</Nav.Link>
                  <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                  </Nav.Link>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <CgLogOut /> Log out
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : (
          <nav>
            <ul>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default NavBar;
