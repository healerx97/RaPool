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
        <div class="sidebar-container" style={{'font-family': "Nunito"}}>
            <div class="sidebar-logo">
                RaPool
            </div>
            <ul class="sidebar-navigation">
                <li class="header">Main</li>
                <li>
                <Link to="/">
                    <i class="fa fa-list" aria-hidden="true"></i> Raffles
                </Link>
                </li>
                <li>
                <Link to="/browse">
                    <i class="fa fa-search" aria-hidden="true"></i>Browse Products
                </Link>
                </li>
                <li class="header">{`Account ${user?user.username:null}`} </li>
                <li>
                <Link to="/wins">
                    <i class="fa fa-trophy" aria-hidden="true"></i> Wins
                </Link>
                </li>
                <li>
                <Link to="/login" onClick = {handleLogout}>
                    <i class="fa fa-cog" aria-hidden="true"></i> {user? "Logout": "Login"}
                </Link>
                </li>
            </ul>
        
        {/* <header>
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
        </header> */}


        </div>
    )
}

export default NavBar