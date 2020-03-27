import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Link, Switch } from 'react-router-dom';
import Form from './Form'

const App = () =>
{
  return (
    <div>
      <nav>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to='/pizza'>
          <li>Order Pizza</li>
        </Link>
      </nav>
      <h1>Lambda Eats</h1>
      <Route exact path='/order/'>
        <Form></Form>
      </Route>
      <Route exact path='/pizza/'>
        <Form></Form>
      </Route>
    </div>
  );
};
export default App;
