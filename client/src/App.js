import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route
          exact
          path="/login"
          render={(props) => <Auth {...props} authRouter="login" />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Auth {...props} authRouter="register" />}
        />

        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
