import {
	Add,
	PlayArrow,
	ThumbDownOutlined,
	ThumbUpOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WatchlistItem.scss";
const WatchlistItem = (props) => {
	const [isHovered, setIsHovered] = useState(false);
	const movie = props.item;
	return (
		<Link to={{ pathname: "/watch", state: { movie: movie } }}>
			<div className="itemWrapper">
				<div
					className="watchlistItem"
					style={{
						left:
							isHovered &&
							(props.index === props.slideNumber
								? props.index * 230
								: props.index * 230 - 50),
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<img src={movie.img} alt="" />
					{isHovered && (
						<>
							<video src={movie.trailer} autoPlay={true} loop />
							<div className="itemInfo">
								<div className="icons">
									<PlayArrow className="icon" />
									<Add className="icon" />
									<ThumbUpOutlined className="icon" />
									<ThumbDownOutlined className="icon" />
								</div>
								<div className="itemInfoTop">
									<span>{movie.duration}</span>
									<span className="contentRating">{movie.ageLimit}</span>
									<span>{movie.releaseYear}</span>
								</div>
								<div className="desc">{movie.desc}</div>
								<div className="genre">{movie.genre}</div>
							</div>
						</>
					)}
				</div>
			</div>
		</Link>
	);
};

export default WatchlistItem;
