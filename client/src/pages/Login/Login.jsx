import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";
import "./Login.scss";
import { useHistory } from "react-router";

const Login = () => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const { dispatch } = useContext(AuthContext);
	const history = useHistory();
	const handleLogin = (event) => {
		event.preventDefault();
		login({ email: email, password: password }, dispatch);
	};
	const handleRegisterRedirect = () => {
		history.push("/register");
	};
	return (
		<div className="login">
			<div className="top">
				<div className="wrapper">
					<img
						className="logo"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt=""
					/>
				</div>
				<div className="container">
					<form>
						<h1>Sign In</h1>
						<input
							type="email"
							placeholder="Email or phone number"
							onChange={(event) => setEmail(event.target.value)}
						/>
						<input
							type="password"
							placeholder="Password"
							onChange={(event) => setPassword(event.target.value)}
						/>
						{console.log(email, password)}
						<button className="loginButton" onClick={handleLogin}>
							Sign In
						</button>
						<span>
							New to Netflix?{" "}
							<b onClick={handleRegisterRedirect}>Sign up now!</b>
						</span>
						<small>
							This page is protected by Google reCAPTCHA to ensure you're not a
							bot. <b>Learn more</b>.
						</small>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
