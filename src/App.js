import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Page from './pages/Page'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/page">Page</Link>
        </nav>
        <Route path="/" exact component={Home}/>
        <Route path="/page" exact component={Page}/>
      </Router>
    );
  }
}

export default App;
