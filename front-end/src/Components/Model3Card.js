import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Highlighter from "react-highlight-words";

function Model3Card( props ) {
    const information = props.information;
    // const genericInformation = props.genericInformation;
    // console.log("before");
    // console.log(information);
    // console.log("after");
    // console.log("information.year", information.year);

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
        <Card.Header style={{color: 'white', fontWeight: 'bolder'}}>{highlightText(information.year)} {highlightText(information.brand_name)} {highlightText(information.model_name)}</Card.Header>
        {/* <Card.Img variant="top" src={genericInformation.VehiclePicture} /> */}
        <Card.Body>
            <Card.Title style={{color: '#29a8ab', fontWeight: 'bold'}}> </Card.Title>
            <Card.Subtitle style={{margin: '2px'}}>Ask Price: ${highlightText(information.ask_price)} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Condition: {highlightText(information.is_new?"New":"Used")} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Mileage: {highlightText(information.mileage)} miles </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Color: {highlightText(information.color!=null?information.color:"N/A")} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Interior Color: {highlightText(information.interior_color!=""?information.interior_color:"N/A")} </Card.Subtitle>
            
            {/* <Button variant="primary" href={'/listings/' + information.id} >See More Information</Button> */}
        </Card.Body>
        <Card.Footer className="text-muted">
            <Button variant="primary" href={'/listings/' + information.id} >See More Information</Button>
        </Card.Footer>
        </Card>
    );
}

export default Model3Card;