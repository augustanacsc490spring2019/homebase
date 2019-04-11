import React, { Component } from 'react';

export default class PropertyInfo extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <div>
        {this.props.match.params.id}
      </div>
    )
  }
}
