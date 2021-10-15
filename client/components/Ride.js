import React, { Component } from 'react';

class Ride extends Component {
  constructor(props){
    super(props);
    this.state = {
      queue: {},
      status: '',
      lastUpdated: '',
    };

    this.getWait = this.getWait.bind(this);
    this.queueRead = this.queueRead.bind(this);
  }
  // get wait time
  // send request to server to fetch live queue
  getWait() {
    console.log('clicked getWait');
    fetch('/api/ride/' + this.props.rideInfo.id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({...data});
      })
      .catch('could not get wait')
  }

  // make queue string nicer
  queueRead(queue) {
    let result = '';
    for (const key of Object.keys(queue)) {
      result += String(key) + ': ';

      for (const subKey of Object.keys(queue[key])) {
        result += String(subKey) + ': ' + String(queue[key][subKey]) + '\n';
      }
    }
    return result;
  }

  render() {

    return (
      <div className='ride'>

        <div className='rideName'>
          <span>{this.props.rideInfo.name}</span>
        </div>


        <div className='rideInfo'>
          <div>
            <span>
              status: {this.state.status}
            </span>
          </div>

          <div>
            <span>
              last updated: {this.state.lastUpdated}
            </span>
          </div>

          <div>
            <span>
              queue:
            </span>
            <span className="wait-time">
              {this.queueRead(this.state.queue)}
            </span>
          </div>
        </div>

        <button onClick={this.getWait}>&#8635;</button>

      </div>
    )
  }
}

export default Ride;
