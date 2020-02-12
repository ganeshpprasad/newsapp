import React, { useState, useEffect } from "react";
import useNews from "../hooks/useNews";
import { fetchNews, searchNews, fetchSources } from "../services/newsApi";
import { country as countryEnum } from "../services/APIGenerator";

// import [ useNews ] from "../services/useNews";

import Today from "../components/Today";
import Filters from "../components/Filters";
import Search from "../components/Search";

const initData = {
	status: "not ok",
	articles: [<p>Loading...</p>]
};

const Home = () => {
	const [isHeadlines, toggleHeadlines] = useState(true);
	const [country, setCountry] = useState(countryEnum.ALL);
	const [news, setNews] = useState(initData);
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [lang, setLang] = useState("en");
	let articles: any = <p>Loading...</p>;

	const searchTermChanged = e => {
		setSearchTerm(e.target.value);
	};

	const updateSearchResults = e => {
		if (e.nativeEvent.keyCode == 13 && !!searchTerm) {
			setIsSearching(true);
		}
	};

	const _searchNews = async () => {
		try {
			const news = await searchNews(searchTerm);
			setNews(news);
			setIsSearching(false);
			setSearchTerm("");
		} catch (error) {
			console.log("serch news", error);
		}
	};

	useEffect(() => {
		fetchSources().then(sources => console.log("sour", sources));
		fetchNews().then(news => setNews(news));
	}, []);

	useEffect(() => {
		if (isSearching) {
			// _searchNews();
			searchNews(searchTerm)
				.then(news => setNews(news))
				.then(() => {
					setIsSearching(false);
					setSearchTerm("");
				});
			console.log("isseach", isSearching);
		}

		return () => {
			// cleanup
		};
	}, [isSearching]);

	if (news && news.status === "ok") {
		articles = news.articles.map((article: any, ind) => {
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

	const HeadlinesCheckbox = ({ isHeadlines, toggleHeadlines }) => {
		return (
			<>
				<input
					type="checkbox"
					name="Headlines"
					id=""
					checked={isHeadlines}
					onChange={toggleHeadlines}
				/>
				<span>{isHeadlines ? "Headlines" : "Everything"}</span>
			</>
		);
	};

	const _toggleHeadlines = e => {
		toggleHeadlines(e.target.checked);
	};

	const FilterCountry = ({ selected, setCountry }) => {
		let optionArray = [];
		for (const country in countryEnum) {
			const selectedVal = countryEnum[country] === selected;
			optionArray.push(
				<option value={countryEnum[country]} selected={selectedVal}>
					{country}
				</option>
			);
		}

		return (
			<div>
				<select name="country" id="" onChange={setCountry}>
					{optionArray}
				</select>
			</div>
		);
	};

	const _setCountry = e => {
		setCountry(e.target.value);
	};

	return (
		<>
			<Today />
			<HeadlinesCheckbox
				isHeadlines={isHeadlines}
				toggleHeadlines={_toggleHeadlines}
			/>
			<FilterCountry selected={country} setCountry={_setCountry} />
			<Search
				searchTerm={searchTerm}
				setSearchTerm={searchTermChanged}
				searchNews={updateSearchResults}
			/>
			<Filters />
			{articles}
		</>
	);
};

export default Home;
