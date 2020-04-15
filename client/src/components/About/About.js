import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import '../tcowebstyle.css';
import {CLIENT_TEAM_NAME} from "../Constants";
import Axel from "./Resources/Axel.jpg";
import Ethan from "./Resources/ethanAboutPhoto.jpg";
import Brandon from "./Resources/brandon.jpg";
import Moise from "./Resources/moise.jpg";
import Winter from "./Resources/Winter.jpg";

export default class About extends Component {

    render() {
        return (
            <Container id="about">
                {this.renderTeamName()}
                {this.renderTeamMotto()}
                <Row>
                    <Col>
                        <h5><strong>Meet the team:</strong></h5>
                    </Col>
                </Row>
                <Row>
                    {this.renderBio("Profile picture for Axel Wahlstrom", "Axel Wahlstrom", "I am a Junior Computer Science major, who is also working on a minor in mathematics at CSU. In my free time, I enjoy lifting weights and playing video games.", Axel)}
                    {this.renderBio("Profile picture for Brandon Vasquez", "Brandon Vasquez", "I am currently a student at CSU majoring in Applied Computing Technology with a minor in Business Administration. I am Colorado born and raised and enjoy hiking, sports and spending time in the gym.", Brandon)}
                    {this.renderBio("This photo has Ethan looking his best, don't expect much", "Ethan Liem", "I am a second Bachelor's Computer Science major at CSU. My other degrees are in Journalism and Liberal Arts, which I also got at CSU (I just really like giving Tony Frank). I work at the climbing wall on campus and I enjoy Magic: The Gathering.", Ethan)}
                    {this.renderBio("Profile picture for Moise Lacrete", "Moise Lacrete", "I am a Computer Science major at CSU. I grew up on the east coast, from a small town on Long Island, New York. I'm an advocate for fitness and enjoy spending what little free time I have outdoors enjoying Colorado's beautiful sunny weather. Skill toys are another passion of mine so I usually have something to play with in my backpack.", Moise)}
                    {this.renderBio("Profile picture for Winter Meng", "Winter Meng", "I am a second-bachelor student majoring in computer science. Before coming to CSU, I completed my first degree in physics at the University of Washington-Seattle. For my spare time I enjoy hiking in the wilds and watching old movies.", Winter)}
                </Row>
            </Container>
        )
    }

    renderTeamName() {
        return(
            <Row>
                <Col>
                    <h2 className="font-weight-bold" >
                        {CLIENT_TEAM_NAME}
                    </h2>
                </Col>
                <Col id="closeAbout" xs='auto' >
                    <Button className='btn-csu w-100' onClick={this.props.closePage} xs={1}>
                        Close
                    </Button>
                </Col>
            </Row>
        )
    }

    renderTeamMotto() {
        return(
            <Row>
                <Col>
                    <h5><strong>Our Values:</strong></h5>
                    <p><em><strong>
                        “Hugh-Lit Pack-Herd earns Dave Matthew's respect and loyalty by consistently providing the most average quality and value. We achieve sufficient-enough grades to finance growth, create value for our class mates and achieve our corporate objectives.”
                    </strong> -The Hugh-Lit Pack-Herd team (2020)</em></p>
                </Col>
            </Row>
        )
    }

    renderBio(altTag, fullName, bio, imageSRC){
        return(
            <Col sm={6}>
                <Card>
                    <CardImg top width="100%" src={imageSRC} alt={altTag} />
                    <CardBody>
                        <CardTitle className={"text-center lead"}>{fullName}</CardTitle>
                        <CardText>{bio}</CardText>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
