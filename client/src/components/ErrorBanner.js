import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export default class ErrorBanner extends Component {

  render() {
    return (
      <Alert className='bg-csu-canyon text-white font-weight-extrabold'>
          {this.props.statusText} ({this.props.statusCode}): {this.props.message}
      </Alert>
    );
  }

}
