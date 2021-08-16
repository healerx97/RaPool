import { Link, NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, NavItem } from "react-bootstrap"
import { useHistory } from 'react-router-dom'

function NavBar() {

    return (
        <header>
            <Navbar className="navbar"  variant="primary" sticky = "top" >
                <Container className="container-fluid" id="navbar">
                <Navbar.Brand> RaPool </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className="link" as={Link} to="/">
                        Home
                        </Nav.Link>
                        <Nav.Link className="link" as={Link} to="/browse">
                        Browse Products
                        </Nav.Link>
                        <Nav.Link className="link" as={Link} to="/wins">
                        Wins
                        </Nav.Link>
                        <Nav.Link className="link" as={Link} to="/login">
                        Login
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar