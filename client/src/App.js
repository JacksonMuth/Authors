import React from 'react';
import { Router, Link } from '@reach/router'

import './App.css';
import AllAuthors from './components/AllAuthors';
import AuthorForm from './components/AuthorForm';
import WrongPage from './components/WrongPage';

function App() {
  return (
    <div>
      <Router>
        <AllAuthors path="/" default/>
        <AuthorForm path="/new" action="create" />
        <AuthorForm path="/edit/:id" action="edit" />
        <WrongPage path="/wrongpage" />
      </Router>
    </div>
  );
}

export default App;
