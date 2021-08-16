import { Link, NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, NavItem } from "react-bootstrap"
import { useHistory } from 'react-router-dom'

function NavBar({logOut, user}) {
    function handleLogout(e) {
        if (user) {
            logOut()
        }
    }
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
                        <Nav.Link className="link" as={Link} onClick = {handleLogout} to="/login">
                        {user? "Logout": "Login"}
                        </Nav.Link>
                    </Nav>
                </Container>
                <div>
                <h3 style={{'fontSize': 'medium'}}>
                    {user ? `Welcome, ${user.username}` : null}
                </h3>
            </div>
            </Navbar>
        </header>
    )
}

export default NavBar