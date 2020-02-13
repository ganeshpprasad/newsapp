import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useNews from "../hooks/useNews";
import { fetchNews, searchNews, fetchSources } from "../services/newsApi";
import {
	country as countryEnum,
	category as categoryEnum
} from "../services/APIGenerator";

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
	const [country, setCountry] = useState(countryEnum.USA);
	const [category, setCategory] = useState(categoryEnum.None);
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

	// Headlines case
	useEffect(() => {
		fetchSources().then(sources => console.log("sour", sources));
		fetchNews(country, category).then(news => setNews(news));
	}, [country, category]);

	// Search case
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

	const FilterDropDown = ({ selected, setFn, array }) => {
		let optionArray = [];
		for (const val in array) {
			const isSelected = array[val] === selected;
			optionArray.push(
				<option value={array[val]} selected={isSelected}>
					{val}
				</option>
			);
		}

		return (
			<div>
				<select id="" onChange={setFn}>
					{optionArray}
				</select>
			</div>
		);
	};

	const _setCountry = e => {
		setCountry(e.target.value);
	};

	const _setCategory = e => {
		setCategory(e.target.value);
	};

	return (
		<MainDiv>
			<Today />
			<FilterDropDown
				selected={country}
				setFn={_setCountry}
				array={countryEnum}
			/>
			<FilterDropDown
				selected={category}
				setFn={_setCategory}
				array={categoryEnum}
			/>
			<Search
				searchTerm={searchTerm}
				setSearchTerm={searchTermChanged}
				searchNews={updateSearchResults}
			/>
			<HeadlinesCheckbox
				isHeadlines={isHeadlines}
				toggleHeadlines={_toggleHeadlines}
			/>
			<Filters />
			{articles}
		</MainDiv>
	);
};

const MainDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default Home;
