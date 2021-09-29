import {
	InfoOutlined,
	PlayArrow,
	SettingsEthernetRounded,
} from "@material-ui/icons";
import { axiosInstance } from "../../config";
import React, { useEffect, useState } from "react";
import "./Featured.scss";
const Featured = (props) => {
	const [content, setContent] = useState({});

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axiosInstance.get(
					`/movies/random?type=${props.type}`,
					{
						headers: {
							token:
								"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWY5OTAyMzg5MTMxMjJhM2Y5YzI1NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMjkwNDc2NiwiZXhwIjoxNjMzMzM2NzY2fQ.SweaxfyVyoAz7gs6mWUp1O62f3XXSy2QYF2OiVLJWjI",
						},
					}
				);
				setContent(res.data[0]);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomContent();
	}, [props.type]);
	return (
		<div className="featured">
			{props.type && (
				<div className="category">
					<span>{props.type === "movie" ? "Movies" : "TV Shows"}</span>
					<select
						name="genre"
						id="genre"
						onChange={(event) => props.setGenre(event.target.value)}
					>
						<option value="">Genre</option>
						<option value="adventure">Adventure</option>
						<option value="comedy">Comedy</option>
						<option value="crime">Crime</option>
						<option value="fantasy">Fantasy</option>
						<option value="historical">Historical</option>
						<option value="horror">Horror</option>
						<option value="romance">Romance</option>
						<option value="sci-fi">Sci-fi</option>
						<option value="thriller">Thriller</option>
						<option value="western">Western</option>
						<option value="animation">Animation</option>
						<option value="drama">Drama</option>
						<option value="documentary">Documentary</option>
					</select>
				</div>
			)}
			<img width="100%" src={content.img} alt="" />
			<div className="info">
				<img src={content.imgTitle} alt="" />
				<span className="desc">{content.desc}</span>
				<div className="buttons">
					<button className="play">
						<PlayArrow />
						<span>Play</span>
					</button>
					<button className="more">
						<InfoOutlined />
						<span>More Info</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Featured;
