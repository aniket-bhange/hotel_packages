import React from 'react';
import './App.css';
import Navbar from './app/partials/Navbar';
import List from './app/packages/List';
import Create from './app/packages/Create';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Breadcrumb from './app/partials/Breadcrum';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

const App = (props)=> {
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Navbar/>
      <Breadcrumb/>
      <Router>
        <Switch>
          <Route excat path="/edit">
            <Create  mode="edit" />
          </Route>
          <Route excat path="/create">
            <Create mode="create" />
          </Route>
          <Route excat path="/">
            <List />
          </Route>
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
