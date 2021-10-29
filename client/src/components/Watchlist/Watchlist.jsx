import {
	ArrowBackIosOutlined,
	ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, { useRef, useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import WatchlistItem from "../WatchlistItem/WatchlistItem";
import "./Watchlist.scss";
const Watchlist = (props) => {
	const [slideNumber, setSlideNumber] = useState(0);
	const [isMoved, setIsMoved] = useState(false);
	const [isEnded, setIsEnded] = useState(false);
	const [isSliding, setIsSliding] = useState(false);
	const [watchlistMovies, setWatchlistMovies] = useState([]);
	const watchlistRef = useRef();

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			const getWatchlistMovies = async () => {
				let user = JSON.parse(localStorage.getItem('user'))
				try {
					const movies = await axiosInstance.get(
						`watchlists/${props.id}/movies`,
						{
							headers: {
								token:
									user.accessToken,
							},
						}
					);
					setWatchlistMovies(movies.data);
					console.log("movies", movies.data);
				} catch (err) {
					console.log(err);
				}
			};
			getWatchlistMovies();
			setIsSliding(false);
		}
		return () => {
			mounted = false;
			setWatchlistMovies([]);
		};
	}, [props.id]);

	let listLength = props.watchlist.content.length;
	const handleClick = (direction) => {
		setIsMoved(true);
		setIsSliding(true);
		let distance = watchlistRef.current.getBoundingClientRect().x - 50;
		if (direction === "left" && slideNumber > 0) {
			setIsEnded(false);
			if (slideNumber - 5 <= 0) {
				watchlistRef.current.style.transform = `translateX(${
					slideNumber * 230 + distance
				}px)`;
				setSlideNumber(0);
				setIsSliding(false);
			}
			if (slideNumber - 5 > 0) {
				watchlistRef.current.style.transform = `translateX(${
					1150 + distance
				}px)`;
				setSlideNumber(slideNumber - 5);
				setIsSliding(false);
			}
			setIsSliding(false);
		}
		if (direction === "right" && slideNumber < listLength) {
			if (slideNumber <= listLength - 10) {
				if (slideNumber === listLength - 10) {
					setIsEnded(true);
					setIsSliding(false);
				}
				setSlideNumber(slideNumber + 5);
				setIsSliding(false);

				watchlistRef.current.style.transform = `translateX(${
					-1150 + distance
				}px)`;
			} else {
				if (slideNumber < listLength - 5) {
					watchlistRef.current.style.transform = `translateX(${
						(slideNumber - listLength + 5) * 230 + distance
					}px)`;
					setSlideNumber(listLength - 5);
					setIsEnded(true);
					setIsSliding(false);
				}
				setIsSliding(false);
			}
		}
	};
	console.log("slideNumber", slideNumber, "watchlistLength", listLength);
	return (
		<div className="watchlist">
			<span className="watchlistTitle">{props.watchlist.title}</span>
			<div className="wrapper">
				<ArrowBackIosOutlined
					className="sliderArrow left"
					onClick={() => handleClick("left")}
					style={{ display: !isMoved && "none" }}
				/>
				<div
					className={isSliding ? "container disable-hover" : "container"}
					ref={watchlistRef}
				>
					{watchlistMovies.map((movie, index) => (
						<WatchlistItem
							index={index}
							item={movie}
							key={movie._id}
							slideNumber={slideNumber}
							listLength={listLength}
							isSliding={isSliding}
						/>
					))}
				</div>
				<ArrowForwardIosOutlined
					className="sliderArrow right"
					onClick={() => handleClick("right")}
					style={{ visibility: isEnded && "hidden" }}
				/>
			</div>
		</div>
	);
};

export default Watchlist;
