import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../bootstrap.min.css';

function NavBar() {
  return (
    <>
      <Navbar data-testid="navBar" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand data-testid="navBarTitle" href="/" id='NavHome'>Find A Car For Me</Navbar.Brand>
          <Nav data-testid="navBarLinks" className="me-auto">
            <Nav.Link  eventKey="1" href="/fuel_stations" id='NavFuelStations'>Fuel Stations</Nav.Link>
            <Nav.Link href="/specs" id='NavSafety'>Safety and Specifications</Nav.Link>
            <Nav.Link href="/listings" id='NavListings'>Listings</Nav.Link>
            <Nav.Link href="/search" id='NavSearchPage'>Search Page</Nav.Link>
            <Nav.Link href="/about" id='NavAbout'>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;