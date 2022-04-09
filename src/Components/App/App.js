import Screen1 from "../screen1/Screen1";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Screen1">
            <Screen1 />
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
