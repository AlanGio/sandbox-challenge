import {
  Switch, Route, BrowserRouter as Router,
} from 'react-router-dom';

import Main from './components/Main';
import Register from './components/Register';


const Routes = () => {
  return (
    <Switch>

      <Route exact path="/" component={Main} />
      <Route exact path="/register" component={Register} />

    </Switch>
  );
}

const App = () => (
  <div className="App">
    <Router>
      <Routes />
    </Router>
  </div>
);

export default App;
