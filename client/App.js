import React, { Component } from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';

import Home from './components/Home';
import Collection from './components/Collection';
import BlockoutDates from './components/BlockoutDates';
import Shows from './components/Shows';

const fetch = require('node-fetch');

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="router">
        <main>

            <div className='navBar'>
              <NavLink to='/home' activeClassName='active'>
                Home
              </NavLink>

              <NavLink to='/blockout' activeClassName='active'>
                Blockout Dates
              </NavLink>

              <NavLink to='/rides' activeClassName='active'>
                Rides
              </NavLink>

              <NavLink to='/shows' activeClassName='active'>
                Shows
              </NavLink>
            </div>

            <div className="page-container">
              <Switch>
                <Route
                  exact
                  path="/home"
                  component={
                    () => <Home />
                  }
                />
                <Route
                  exact
                  path="/rides"
                  component={
                    () => <Collection />
                  }

                />

                <Route
                  exact
                  path="/blockout"
                  component={
                    () => <BlockoutDates />
                  }
                />

                <Route
                  exact
                  path="/shows"
                  component={
                    () => <Shows />
                  }
                />
              </Switch>
            </div>

        </main>
      </div>
    )
  }
}

export default App;
