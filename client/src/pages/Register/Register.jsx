import { ArrowForwardIosOutlined } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { axiosInstance } from "../../config";
import "./Register.scss";

const Register = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const emailRef = useRef();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const history = useHistory();

	const handleStart = (event) => {
		event.preventDefault();
		setEmail(emailRef.current.value);
		setUsername(usernameRef.current.value);
		console.log(
			"email: ",
			emailRef.current.value,
			"username :",
			usernameRef.current.value
		);
	};
	const handleFinish = async (event) => {
		event.preventDefault();
		setPassword(passwordRef.current.value);
		console.log("password:", passwordRef.current.value);
		try {
			await axiosInstance.post("auth/register", {
				email: email,
				username: username,
				password: password,
			});

			history.push("/login");
		} catch (err) {
			console.log(err);
		}
	};

	const handleLoginRedirect = (event) => {
		event.preventDefault();
		history.push("/login");
	};

	return (
		<div className="register">
			<div className="top">
				<div className="wrapper">
					<img
						className="logo"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt=""
					/>
					<button className="loginButton" onClick={handleLoginRedirect}>
						Sign In
					</button>
				</div>
				<div className="container">
					<h1>Unlimited Movies, TV shows, and more.</h1>
					<h2>Watch anywhere. Cancel anytime.</h2>
					<p>
						Ready to watch? Enter your email to create or restart your
						membership.
					</p>
					{!email && !username ? (
						<form className="input">
							<div className="inputFields">
								<input
									type="email"
									placeholder="Email address"
									ref={emailRef}
								/>
								<input
									type="username"
									placeholder="Username"
									ref={usernameRef}
								/>
							</div>
							<button className="registerButton" onClick={handleStart}>
								<div className="buttonText">Get Started</div>
								<ArrowForwardIosOutlined className="icon" />
							</button>
						</form>
					) : (
						<form className="input">
							<input type="password" placeholder="Password" ref={passwordRef} />
							<button className="registerButton" onClick={handleFinish}>
								Start
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default Register;
