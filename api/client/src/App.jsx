import './App.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Watch from './pages/Watch/Watch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  const user = true
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
        </Route>
        {
          user && (
            <>
              <Route path="/movies">
                <Home type="movie"/>
              </Route>
              <Route path="/series">
                <Home type="series"/>
              </Route>
              <Route path="/watch">
                <Watch />
              </Route>
            </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
