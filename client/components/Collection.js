import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Ride from './Ride'

// displays a list of rides
class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disneylandId: '',
      parkData: {},
      rides: [],
    };
  }

  componentDidMount() {
    console.log('in componentDidMount')
    fetch('/api/collection')
      .then(res => res.json())
      .then(result => {
        console.log('in fetch, result:', result);
        return this.setState({
          ...result
        })
      })
      .catch('error in App componentDidMount')
  }

  render() {
    // get ride list
    const rideComponents = [];
    console.log(this.state.rides)
    for (const ride of this.state.rides) {
      if (ride.type === 'ATTRACTION') {
        rideComponents.push(<Ride key={ride.id} rideInfo={ride}/>);
      }
    }

    //  make a Ride component for each
    return (
      <div className="collection">
        <h2>Attractions</h2>
        {rideComponents}
      </div>
    );
  }
}

export default Collection;
