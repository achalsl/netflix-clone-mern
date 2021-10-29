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
			let user = JSON.parse(localStorage.getItem('user'))
			try {
				if (mounted) {
					const res = await axiosInstance.get(
						`watchlists${props.type ? "?type=" + props.type : ""}${
							genre ? "&genre=" + genre : ""
						}`,
						{
							headers: {
								token:
									`Bearer ${user.accessToken}`,
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
