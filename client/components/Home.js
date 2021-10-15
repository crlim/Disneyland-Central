import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div className='home'>

        <div className='welcomeBox'>
          <h1>Welcome</h1>
          <img src="https://i.pinimg.com/originals/54/3c/96/543c9608d267ff320e78681c3faf824f.gif" loop="-1"/>
        </div>

      </div>
    )
  }

}

export default Home;
