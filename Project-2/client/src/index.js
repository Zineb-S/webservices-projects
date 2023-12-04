import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
