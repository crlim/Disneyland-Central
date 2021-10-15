import React, { Component } from 'react';
import Iframe from 'react-iframe';

class Shows extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="shows">
        <div className ="shows-background">
          <h2>Shows</h2>

          <div className="video">

            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Fantasmic%21_Logo.svg/1200px-Fantasmic%21_Logo.svg.png"/>

            <Iframe url="https://www.youtube.com/embed/PJ_aYIV4mPk"
              allowFullScreen
              allow="fullscreen"
              id="youtubevid"
              height="500px"
              width="900px"
            />
          </div>

          <div className="video">

            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/World_of_color_logo.svg/250px-World_of_color_logo.svg.png" />

            <Iframe url="https://www.youtube.com/embed/KhUPzPcAO1w"
              allowFullScreen
              allow="fullscreen"
              id="youtubevid"
              height="500px"
              width="900px"
            />
          </div>
        </div>
      </div>
    )
  }

}

export default Shows;
