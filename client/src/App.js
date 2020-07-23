import React from 'react';
import { Router, Link } from '@reach/router'

import './App.css';
import AllAuthors from './components/AllAuthors';
import AuthorForm from './components/AuthorForm';

function App() {
  return (
    <div>
      <h1>Favorite authors</h1>
      <Router>
        <AllAuthors path="/" default/>
        <AuthorForm path="/new" action="create"/>
        <AuthorForm path="/edit/:id" action="edit"/>
      </Router>
    </div>
  );
}

export default App;
