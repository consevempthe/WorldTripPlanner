import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import '../tcowebstyle.css';

export default class About extends Component {

    render() {
      return (
        <Container id="about">
          <Row>
            <Col>
              <h2 className="font-weight-bold" >
                Hugh-Lit Pack-Herd
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
                <p><strong>Our Values:</strong></p>
            </Col>
          </Row>
          <Row>
            <Col>
            <p><em><strong>
                “Hugh-Lit Pack-Herd earns Dave Matthew's respect and loyalty by consistently providing the most average quality and value. We achieve sufficient-enough grades to finance growth, create value for our class mates and achieve our corporate objectives.”
            </strong>-The Hugh-Lit Pack-Herd team (2020)</em></p>
            </Col>
          </Row>


        </Container>
      )
    }
}
