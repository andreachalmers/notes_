import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotesApp from "./pages/NotesApp/NotesApp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <NotesApp/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;