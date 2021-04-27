import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateTeam from './components/CreateTeam/CreateTeam';
import RandomTeam from './components/RandomTeam';
import EditTeam from './components/EditTeam';
import Admin from './components/Admin';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SnackbarProvider from 'react-simple-snackbar';

function App() {
  // const [word, setWord] = React.useState('software');
  // const [associations, setAssociations] = React.useState(null);
  // const getAssociations = () => {
  //   fetch('/api/associations/' + word)
  //     .then(result => result.json())
  //     .then(body => setAssociations(body))
  //     .catch(error => console.log(error))
  // };

  return (
    <Router>
      <div className="container">
        <SnackbarProvider>
          <Navbar />
        </SnackbarProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create-team">
            <CreateTeam />
          </Route>
          <Route path="/random-team">
            <RandomTeam />
          </Route>
          <Route path="/edit-team">
            <EditTeam />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
