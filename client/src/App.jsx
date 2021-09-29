import "./App.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Watch from "./pages/Watch/Watch";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

const App = () => {
	const { user } = useContext(AuthContext);
	let routes;
	if (user) {
		routes = (
			<>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/register">
					<Redirect to="/" />
				</Route>
				<Route path="/login">
					<Redirect to="/" />
				</Route>
				<Route path="/movies">
					<Home type="movie" />
				</Route>
				<Route path="/series">
					<Home type="series" />
				</Route>
				<Route path="/watch">
					<Watch />
				</Route>
			</>
		);
	} else {
		routes = (
			<>
				<Route exact path="/">
					<Redirect to="/register" />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
			</>
		);
	}
	return (
		<Router>
			<Switch>{routes}</Switch>
		</Router>
	);
};

export default App;
