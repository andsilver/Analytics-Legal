import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'src/cases_laboral_my_cases/reducers';
import LaboralMyCases from 'src/cases_laboral_my_cases/containers/laboral_my_cases';

document.addEventListener('DOMContentLoaded', () => {
  const store = createStore(
    reducers,
    applyMiddleware(thunk),
  );
  render(
    <Provider store={store}>
      <LaboralMyCases users_emails={emails} currentUser={currentUser} selectedCases={selectedCases}/>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
});
