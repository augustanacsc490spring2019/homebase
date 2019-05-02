import React, { Component } from 'react';

export default class PropertyInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
          ...this.props.location.state.info
        }
    }
  render() {
    return (
      <div>
        <h1>Test</h1>
        <h1>{this.state.name}</h1>
        <h2>{this.state.desc}</h2>
        <p><strong>Status: </strong>{this.state.status}</p>
        <p><strong>Number of Rooms: </strong>{this.state.rooms}</p>
        <p><strong>Type: </strong>{this.state.type}</p>
        <p><strong>Rules: </strong>{this.state.rules}</p>
        <p><strong>Price: </strong>{this.state.price}</p>
      </div>
    )
  }
}
