import React, { useEffect, useState } from "react";
import Featured from "../../components/Featured/Featured";
import Watchlist from "../../components/Watchlist/Watchlist";
import Navbar from "../../components/Navbar/Navbar";
import { axiosInstance } from "../../config";
import "./Home.scss";

const Home = (props) => {
	const [watchlists, setWatchlists] = useState([]);
	const [genre, setGenre] = useState(null);
	useEffect(() => {
		let mounted = true;
		const getRandomWatchlists = async () => {
			try {
				if (mounted) {
					const res = await axiosInstance.get(
						`watchlists${props.type ? "?type=" + props.type : ""}${
							genre ? "&genre=" + genre : ""
						}`,
						{
							headers: {
								token:
									"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWY5OTAyMzg5MTMxMjJhM2Y5YzI1NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMjkwNDc2NiwiZXhwIjoxNjMzMzM2NzY2fQ.SweaxfyVyoAz7gs6mWUp1O62f3XXSy2QYF2OiVLJWjI",
							},
						}
					);
					setWatchlists(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		};
		getRandomWatchlists();
		return () => {
			mounted = false;
		};
	}, [props.type, genre]);
	return (
		<div className="home">
			<Navbar type={props.type} />
			<Featured type={props.type} setGenre={setGenre} />
			{watchlists.map((watchlist) => (
				<Watchlist
					watchlist={watchlist}
					key={watchlist.title}
					id={watchlist._id}
				/>
			))}
		</div>
	);
};

export default Home;
