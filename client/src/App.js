import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateTeam from './components/CreateTeam';
import RandomTeam from './components/RandomTeam';
import EditTeam from './components/EditTeam';
import Admin from './components/Admin';
import PageNotFound from './components/PageNotFound';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SnackbarProvider from 'react-simple-snackbar';

function App() {
  const [user, setUser] = useState('');

  return (
    <Router>
      <div className="container">
        <SnackbarProvider>
          <Navbar user={user} setUser={setUser} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create-team">{user === '' ? <Redirect to="/" /> : <CreateTeam />}</Route>
            <Route path="/random-team">{user === '' ? <Redirect to="/" /> : <RandomTeam />}</Route>
            <Route path="/edit-team">{user === '' ? <Redirect to="/" /> : <EditTeam />}</Route>
            <Route path="/admin">{user === '' ? <Redirect to="/" /> : <Admin />}</Route>
            <Route path="/">
              <PageNotFound />
            </Route>
          </Switch>
        </SnackbarProvider>
      </div>
    </Router>
  );
}

export default App;
