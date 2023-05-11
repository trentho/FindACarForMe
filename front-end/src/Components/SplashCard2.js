import Card from 'react-bootstrap/Card';
import stationPic from '../Assets/crashDumDum.jpeg'
import { Link } from 'react-router-dom';

function SplashCard2() {
    
    return (
        <Link to ="/specs" style={{ textDecoration: 'none' }}> 
            <Card style={{ width: '18rem', margin: '12px' }}>
            <Card.Img variant="top" src={stationPic} />
            <Card.Body>
                <Card.Title> Model Safety Specs </Card.Title>
            </Card.Body>
            </Card>
        </Link>
    );
}

export default SplashCard2;