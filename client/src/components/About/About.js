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
                  <img src={'src/components/About/resources/Empty.jpg'} alt={'src/components/About/resources/Empty.jpg'}/>
                  <p><strong>My name is Axel Wahlstrom, I am a Junior Computer Science major at Colorado State University. I am also working on a minor in mathematics. In my free time I enjoy lifting weights and playing video games.</strong></p>
              </Col>
              <Col>
                  <h6><strong>Ethan Liem</strong></h6>
                  <img src={'src/components/About/resources/Empty.jpg'} alt={'src/components/About/resources/Empty.jpg'}/>
                  <p><strong>Bio Here</strong></p>
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
                    <img src={'src/components/About/resources/Empty.jpg'} alt={'src/components/About/resources/Empty.jpg'}/>
                    <p><strong>Bio Here</strong></p>
                </Col>
                <Col>
                    <h6><strong>Moise Lacrete</strong></h6>
                    <img src={'src/components/About/resources/Empty.jpg'} alt={'src/components/About/resources/Empty.jpg'}/>
                    <p><strong>Bio Here</strong></p>
                </Col>
          </Row>


        </Container>
      )
    }
}
