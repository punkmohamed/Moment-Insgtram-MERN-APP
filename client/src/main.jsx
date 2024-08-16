import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import { GoogleOAuthProvider } from '@react-oauth/google'
import { reducers } from './reducers';
import { thunk } from 'redux-thunk';
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='976589933253-50ka3er3avkhigmiv0mj9s4a4h5e4c0u.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
