import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'src/cases_cobranzas_my_cases/reducers';
import CobranzasMyCases from 'src/cases_cobranzas_my_cases/containers/cobranzas_my_cases';

document.addEventListener('DOMContentLoaded', () => {
  const store = createStore(
    reducers,
    applyMiddleware(thunk),
  );
  render(
    <Provider store={store}>
      <CobranzasMyCases users_emails={emails} currentUser={currentUser} selectedCases={selectedCases}/>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
});
