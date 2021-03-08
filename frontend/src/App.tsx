import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Settings from 'app/pages/Settings';
import DataManagement from 'app/pages/DataManagement';

function App() {
     return (
          <Router>
               <Switch>
                    <Route path="/data-management/:id?">
                         <DataManagement />
                    </Route>
                    <Route path="/:id?">
                         <Settings />
                    </Route>
               </Switch>
          </Router>
     );
}

export default App;
