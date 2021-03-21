import React from 'react';
import './App.css';
import ServiceAdd from './components/ServiceAdd';
import ServiceList from './components/ServiceList';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// import ServiceAddClassBased from './components/ServiceAddClassBased';
// import ServiceListClassBased from './components/ServiceListClassBased';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/services/:id" component={ServiceAdd} />
        <Route path="/services" component={ServiceList} />
        <Route path="*">
          <Redirect to="/services" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
