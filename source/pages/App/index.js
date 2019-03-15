// Core
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import Scheduler from 'components/Scheduler';

// Instruments
import { store } from '../../init/store';

@hot(module)
export default class App extends Component {
    render () {
      return (
          <Provider store = { store }>
              <Scheduler />;
          </Provider>
      )
    }
}
