import Card from 'react-bootstrap/Card';
import stationPic from '../Assets/tesla.jpeg'
import { Link } from 'react-router-dom';

function SplashCard3() {
    
    return (
        <Link to ="/listings" style={{ textDecoration: 'none' }}>
            <Card style={{ width: '18rem', margin: '12px' }}>
            <Card.Img variant="top" src={stationPic} />
            <Card.Body>
                <Card.Title> Listings </Card.Title>
            </Card.Body>
            </Card>
        </Link>
    );
}

export default SplashCard3;