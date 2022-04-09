import Downstairs from "../Downstairs/Downstairs";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upstairs from "../Upstairs/Upstairs";
import Home from "../Home/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/screen1">
            <Downstairs />
          </Route>
          <Route path="/screen2">
            <Upstairs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
