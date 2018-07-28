import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'src/laboral_rut_selection/reducers';
import RutSelection from 'src/laboral_rut_selection/containers/rut_selection';

document.addEventListener('DOMContentLoaded', () => {
  const store = createStore(
    reducers,
    applyMiddleware(thunk),
  );
  render(
    <Provider store={store}>
      <RutSelection users_emails={ emails } />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
});
