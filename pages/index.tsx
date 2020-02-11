// import [ useNews ] from "../services/useNews";
import useNews from "../hooks/useNews";

import Today from "../components/Today";
import Filters from "../components/Filters";
import Search from "../components/Search";

const Home = () => {
	const [news] = useNews();
	const { data, error } = news;

	let articles = <p>Loading...</p>;

	if (data && data.status === "ok") {
		articles = data.articles.map((article, ind) => {
			return (
				<div key={ind}>
					<h2> {article.title} </h2>
					<p>{article.author}</p>
					<img src={article.urlToImage} alt="" />
					<a href={article.url}> Open link </a>
				</div>
			);
		});
	} else {
		articles = <div> Sorry something's wrong. Refresh may be!? </div>;
	}

	return (
		<>
			<Today />
			<Search />
			<Filters />
			{articles}
		</>
	);
};

export default Home;
