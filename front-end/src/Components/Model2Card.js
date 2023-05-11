import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Highlighter from "react-highlight-words";

function Model2Card( props ) {
    const information = props.information;
    // console.log("information:", information);
    // console.log("vehicle description:", information.VehicleDescription);
    // console.log("vehicle picture:", information.VehiclePicture);

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
        <Card.Header style={{color: 'white', fontWeight: 'bolder'}}>{highlightText(information.VehicleDescription)}</Card.Header> {/*use vehicle descriptor for more accurate naming*/}
        <Card.Img variant="top" src={information.VehiclePicture!=null?information.VehiclePicture:information.FrontCrashPicture} />
        <Card.Body>
            <Card.Title style={{color: '#29a8ab', fontWeight: 'bold'}}>Safety ratings</Card.Title>
            <Card.Subtitle style={{margin: '2px'}}>Overall Safety Rating: {highlightText(information.OverallRating)} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Overall Side Crash Rating: {highlightText(information.OverallSideCrashRating)} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Side Poll Crash Rating: {highlightText(information.SidePoleCrashRating)} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Number of Complaints: {highlightText(information.ComplaintsCount)} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Number of Recalls: {highlightText(information.RecallsCount)} </Card.Subtitle>
            <Card.Subtitle style={{margin: '2px'}}>Number of Investigations: {highlightText(information.InvestigationCount)} </Card.Subtitle>
        </Card.Body>
        <Card.Footer className="text-muted">
            <Button variant="primary" href={'/specs/' + information.id} >See More Information</Button>
        </Card.Footer>
        </Card>
    );
}

export default Model2Card;