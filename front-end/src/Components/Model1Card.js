import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Highlighter from "react-highlight-words";

function Model2Card( props ) {
    const information = props.information;

    function highlightText (input) {
        if (props.wordArr.length != 0) {
            return <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={props.wordArr}
                autoEscape={true}
                textToHighlight={input}
            />
        }
        return input
    }
    
    return (
        <Card style={{ width: '18rem', margin: '12px' }}>
        <Card.Header style={{color: 'white', fontWeight: 'bolder'}}>{highlightText(information.name)}</Card.Header>
        <Card.Img variant="top" src={information.icon} />
        <Card.Body>
            <Card.Title style={{color: '#29a8ab', fontWeight: 'bold'}}></Card.Title>
            <Card.Subtitle style={{margin: '2px'}}>Address: {highlightText(information.address)} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Currently {highlightText(information.open_now?"Open":"Closed")} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Rating: {highlightText(information.rating)} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Total Ratings: {highlightText(information.user_ratings_total)} </Card.Subtitle>
        </Card.Body>
        <Card.Footer className="text-muted">
            <Button variant="primary" href={'/fuel_stations/' + information.id}>See More Information</Button>
            {/* <Button variant="primary" href={'/fuel_stations/' + information.geometry.location.lat + '%20' + information.geometry.location.lng} >See More Information</Button> */}
        </Card.Footer>
        </Card>
    );
}

export default Model2Card;