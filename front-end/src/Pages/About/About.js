import React, { useEffect, useState } from 'react'
import {Row, Col, Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import teamInfo from "./TeamInfo.js"
import toolInfo from "./ToolInfo.js"
import APIInfo from "./APIInfo.js"
import NavBar from '../../Components/NavBar.js'

// get the gitlab info 
const getGitLabInfo = async () => {
    let totalCommits = 0, totalIssues = 0, totalTests = 0
    teamInfo.forEach((member) => {
        member.issues = 0;
        member.commits = 0;
    });

    let commits = await fetch("https://gitlab.com/api/v4/projects/39589269/repository/commits?per_page=500")
    commits = await commits.json()
    commits.forEach((commit) => {

        const{author_name} = commit
        teamInfo.forEach((member) => {
            if (commit.author_name === member.name || commit.author_email === member.email || member.username === author_name) {
                member.commits++;
                totalCommits++;
            }
        })
    })

    let issues = await fetch("https://gitlab.com/api/v4/projects/39589269/issues?per_page=500")
    issues = await issues.json()
    issues.forEach((issue) => {
        teamInfo.forEach((member) => {
            if (issue.author.username === member.username) {
                member.issues++;
                totalIssues++;
            }
        })
    })

    return {
        totalCommits,
        totalIssues,
        totalTests,
        teamInfo
    }
    
}



const About = () => {
    const [gitLabInfo, setGitLabInfo] = useState({})
    useEffect(() => {
        getGitLabInfo().then((info) => {
            setGitLabInfo(info)
        })
    }, [])






    return (
        <div data-testid="abtPage" className="about">
            <NavBar/>
                <h1>About</h1>
                <p> FindaCarFor.me is a comprehensive source for consumers that provides location-based analysis so that car buyers can make an informed decision with their purchase. The website aims to compare car models and listings based on a variety of factors, such as: powertrain type, safety ratings, average MSRP, and more. In addition to aggregating information by car, it’s designed to help advise consumers on whether an electric car or an internal combustion engine is better suited to their needs and their geographic location. After the consumer uses our platform for research, they can comb through the car listings that we have aggregated.</p>

                <p>Whats interesting with integrating these various data sources is that we are able to answer questions that could help people who are searching for cars. The data we have integrated is able to show our users the best car options based on location, which cars are the most financially stable/efficient, and which manufacturer, models, specifications, and listings that they would be interested in. </p>
            <Row>
            <Col>
                <Card>
                    <Card.Header as="h5">Team</Card.Header>
                    <Card.Body>
                        <ListGroup>
                            {teamInfo.map((member) => (
                                <ListGroupItem key={member.name}>
                                    <Row>
                                        <Col xs={4}>
                                            <img src={member.image} alt={member.name} style={{width: "100%"}}/>
                                        </Col>
                                        <Col xs={8}>
                                            <h5>{member.name}</h5>
                                            {member.role} <br/>
                                            {member.bio} <br/>
                                            Commits: {member.commits} <br/>
                                            Issues: {member.issues} <br/>
                                            Unit Tests: {member.tests}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col>
                                <p>Total Commits: {gitLabInfo.totalCommits}</p>
                                <p>Total Issues: {gitLabInfo.totalIssues}</p>
                                <p>Total Tests: {gitLabInfo.totalTests}</p>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header as="h5">Tools</Card.Header>
                    <Card.Body>
                        <ListGroup>
                            {toolInfo.map((tool) => (
                                <ListGroupItem key={tool.name}>
                                    <a href={tool.link}>
                                        <Row>
                                            <Col xs={4}>
                                                <img src={tool.image} alt={tool.name} style={{width: "100%"}}/>
                                            </Col>
                                            <Col xs={8}>
                                                <h5>{tool.name}</h5>
                                                {tool.description}
                                            </Col>
                                        </Row>
                                    </a>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header as="h5">APIs</Card.Header>
                    <Card.Body>
                        <ListGroup>
                            {APIInfo.map((api) => (
                                
                                <ListGroupItem key={api.name}>
                                    <Row>
                                        
                                        <Col xs={4}>
                                            <img src={api.image} alt={api.name} style={{width: "100%"}}/>
                                        </Col>
                                        <Col xs={8}>
                                    
                                            <h5>{api.name}</h5>
                                            {api.description}
                                            
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </div>
    )
}


                                

export default About
