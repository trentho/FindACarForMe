import Card from 'react-bootstrap/Card';
import stationPic from '../Assets/splashGas.jpeg'
import { Link } from 'react-router-dom';

function SplashCard1() {
    
    return (
        <Link to ="/fuel_stations" style={{ textDecoration: 'none' }}>
            <Card style={{ width: '18rem', margin: '12px' }}>
            <Card.Img variant="top" src={stationPic} />
            <Card.Body>
                <Card.Title> Gas and Charging Stations </Card.Title>
                {/* <Button variant="primary"> View </Button> */}
            </Card.Body>
            </Card>
        </Link>
    );
}

export default SplashCard1;