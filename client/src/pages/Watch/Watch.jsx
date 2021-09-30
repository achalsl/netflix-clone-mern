import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Watch.scss";

const Watch = () => {
	const location = useLocation();
	const history = useHistory();
	const movie = location.state.movie;

	return (
		<div className="watch">
			<div className="back">
				<Link to="/" className="link">
					<ArrowBackOutlined />
				</Link>
				<span className="homeButton" onClick={() => history.push("/")}>
					Home
				</span>
			</div>
			<video
				className="video"
				autoPlay
				progress="true"
				controls
				src={movie.video}
			/>
		</div>
	);
};

export default Watch;
