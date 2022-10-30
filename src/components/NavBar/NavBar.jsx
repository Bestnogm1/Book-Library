import styles from "./NavBar.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
                  <Nav.Link href="/profiles"> Other Profiles</Nav.Link>
                  <Nav.Link href={`/profileDetail/${user.profile}`}>
                    <BsBookshelf />
                    {user.name} Books
                  </Nav.Link>
                </Nav>
                <Nav>
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
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">signup</Nav.Link>
                </Nav>
                <Nav></Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          // <nav>
          //   <ul>
          //     <li>
          //       <Link to="/login">Log In</Link>
          //     </li>
          //     <li>
          //       <Link to="/signup">Sign Up</Link>
          //     </li>
          //   </ul>
          // </nav>
        )}
      </div>
    </div>
  );
};

export default NavBar;
