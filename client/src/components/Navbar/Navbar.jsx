import {
	ArrowDropDown,
	Notifications,
	SearchRounded,
} from "@material-ui/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/apiCalls";
import "./Navbar.scss";
const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const history = useHistory();
	const mounted = useRef(false);
	const { dispatch } = useContext(AuthContext);

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	});

	if (mounted.current) {
		window.onscroll = () => {
			setIsScrolled(window.pageYOffset === 0 ? false : true);
			return () => (window.onscroll = null);
		};
	}

	const handleClick = () => setIsClicked(!isClicked);
	const handleLogout = (event) => {
		event.preventDefault();
		logout(dispatch);
	};

	return (
		<div className={isScrolled ? "navbar scrolled" : "navbar"}>
			<div className="container">
				<div className="left">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt=""
						onClick={() => history.push("/")}
						className="homeLogo"
					/>
					<NavLink exact to="/" className="link">
						<span>Home</span>
					</NavLink>
					<NavLink to="/series" className="link">
						<span>TV Shows</span>
					</NavLink>
					<NavLink to="/movies" className="link">
						<span>Movies</span>
					</NavLink>
					<NavLink to="/" className="link" isActive={() => false}>
						<span>New & Popular</span>
					</NavLink>
					<NavLink to="/" className="link" isActive={() => false}>
						<span>My List</span>
					</NavLink>
				</div>
				<div className="right">
					<SearchRounded className="icon" />
					<span>KIDS</span>
					<Notifications className="icon" />
					<img
						src="https://images.pexels.com/photos/4974351/pexels-photo-4974351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
						alt=""
					/>
					<div className="profile">
						<ArrowDropDown
							className={isClicked ? "icon active" : "icon"}
							onClick={handleClick}
						/>
						<div className={isClicked ? "options clicked" : "options"}>
							<span>Settings</span>
							<span onClick={handleLogout}>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
