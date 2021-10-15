import React, { Component } from 'react';
import Iframe from 'react-iframe';
import Calendar from 'react-calendar';


// getting blockout date info
class BlockoutDates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dates: {},
      showBlockouts: true,
      showAvailability: true
    }
    this.showBlockoutDates = this.showBlockoutDates.bind(this);
    this.showAvailability = this.showAvailability.bind(this);

    this.assignTiles = this.assignTiles.bind(this);
  }

  // write a function to show dates with background certain color


  assignTiles({ date, view }) {
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const convertedDate = year + '-' + (month + 1) + '-' + day;

    if (view === 'month') {
      const store = this.state.dates[convertedDate];

      if (this.state.showBlockouts || this.state.showAvailability) {
        let result = '';

        // check blocked
        if (this.state.showBlockouts) {
          if (store && store.blocked) {
            result += 'blocked';
          }
        }

        // check available
        if (this.state.showAvailability) {
          if (store && store.available) {
            result += 'available';
          }
        }
        return result;
      }


    }
  }


  showBlockoutDates() {
    console.log('showBlockoutDates');
    return this.setState({
      ...this.state,
      showBlockouts: !this.state.showBlockouts,
    })
  }

  showAvailability() {
    console.log('showAvailability');
    return this.setState({
      ...this.state,
      showAvailability: !this.state.showAvailability
    })
  }

  componentDidMount () {
    console.log('this should run once');
    fetch('/api/blockout/')
      .then(res => res.json())
      .then(data => {
        console.log('data from fetching blockout:', data)
        return this.setState({...data})
      })
      .catch('error in BlockoutDates fetch')
  }

  render() {
    // change the function to pass in based on the buttons clicked
    let calendar;

    // when both are true, it gets into this block but doesn't go into assignTiles!!
    if (this.state.showBlockouts) {
      console.log('new Calendar with');
      console.log('showBlockouts', this.state.showBlockouts);
      console.log('showAvailability', this.state.showAvailability);
      calendar = <Calendar tileClassName={this.assignTiles} />;
    }
    else if (this.state.showAvailability) {
      calendar = <Calendar tileClassName={this.assignTiles} showAvailability="true"/>;
    }
    else {
      calendar = <Calendar />;
    }

    return (
      <div className="blockout">

        <div className="title">
          <h2>Blockout Dates</h2>
        </div>

        <div className="options">
          <button className="blockoutBtn" onClick={this.showBlockoutDates}>BlockoutDates</button>
          <button className="availabilityBtn" onClick={this.showAvailability}>Reservation Availability</button>
        </div>

        <div className="calendar">
          {calendar}
        </div>



      </div>


    )
  }
}

export default BlockoutDates;
