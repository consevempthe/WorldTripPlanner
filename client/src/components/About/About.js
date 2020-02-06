import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import '../tcowebstyle.css';
import {CLIENT_TEAM_NAME} from "../Constants";

export default class About extends Component {

    render() {
      return (
        <Container id="about">
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
          <Row>
            <Col>
                <h5><strong>Our Values:</strong></h5>
            </Col>
          </Row>
          <Row>
            <Col>
            <p><em><strong>
                “Hugh-Lit Pack-Herd earns Dave Matthew's respect and loyalty by consistently providing the most average quality and value. We achieve sufficient-enough grades to finance growth, create value for our class mates and achieve our corporate objectives.”
            </strong> -The Hugh-Lit Pack-Herd team (2020)</em></p>
            </Col>
          </Row>
          <Row>
              <Col>
                  <h5><strong>Meet the team:</strong></h5>
                  <p>___________________________________</p>
              </Col>
          </Row>
          <Row>
              <Col>
                  <h6><strong>Axel Wahlstrom</strong></h6>
<<<<<<< Updated upstream
                  <img src={'src/components/About/resources/Empty.jpg'} alt={'src/components/About/resources/Empty.jpg'}/>
=======
                  <img src={'src/components/About/Resources/Axel.jpg'} alt={'profile picture for Axel Wahlstrom'}/>
>>>>>>> Stashed changes
                  <p><strong>My name is Axel Wahlstrom, I am a Junior Computer Science major at Colorado State University. I am also working on a minor in mathematics. In my free time I enjoy lifting weights and playing video games.</strong></p>
              </Col>
              <Col>
                  <h6><strong>Ethan Liem</strong></h6>
<<<<<<< Updated upstream
                  <img src={'aboutPhotos/ethanAboutPhoto.jpg'} alt={"This photo has Ethan looking his best, don't expect much"}/>
=======
                  <img src={'src/components/About/Resources/ethanAboutPhoto.jpg'} alt={"This photo has Ethan looking his best, don't expect much"}/>
>>>>>>> Stashed changes
                  <p><strong>I am a second Bachelor's Computer Science major at CSU. My other degrees are in Journalism & Media Communications and Liberal Arts, which I also got at CSU (I just really like giving Tony Frank). I work at the climbing wall on campus and I enjoy Magic: The Gathering.</strong></p>
              </Col>
          </Row>
          <Row>
              <Col>
                <p>___________________________________</p>
              </Col>
          </Row>
          <Row>
                <Col>
                    <h6><strong>Brandon Vasquez</strong></h6>
<<<<<<< Updated upstream
                    <img src={'src/components/About/resources/Empty.jpg'} alt={'src/components/About/resources/Empty.jpg'}/>
=======
                    <img src={'src/components/About/Resources/brandon.jpeg'} alt={'profile picture for Brandon Vasquez'}/>
>>>>>>> Stashed changes
                    <p><strong>I'm currently a student at Colorado State University studying Applied Computing Technology in Computer Science with a minor in Business Administration. I am Colorado born and raised and enjoy hiking, sports and spending time in the gym.</strong></p>
                </Col>
                <Col>
                    <h6><strong>Moise Lacrete</strong></h6>
<<<<<<< Updated upstream
                    <img src={"aboutPhotos/moise.JPG"} alt={"unfortunately, Moise's photo could not be displayed. Replace programmers and try again."}/>
=======
                    <img src={"src/components/About/Resources/moise.JPG"} alt={"unfortunately, Moise's photo could not be displayed. Replace programmers and try again."}/>
>>>>>>> Stashed changes
                    <p><strong>I am a Computer Science major at Colorado State University. I grew up on the east coast, from a small town on Long Island, New york. I'm an advocate for fitness and enjoy spending what little free time I have outdoors enjoying Colorado's beautiful sunny weather. Skill toys are another passion of mine so I usually have something to play with in my backpack.</strong></p>
                </Col>
          </Row>


        </Container>
      )
    }
}
