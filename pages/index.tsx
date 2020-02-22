import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useNews from "../hooks/useNews";
import { fetchNews, searchNews, fetchSources } from "../services/newsApi";
import {
	country as countryEnum,
	category as categoryEnum,
	sortBy as sortByEnum
} from "../services/APIGenerator";

// import [ useNews ] from "../services/useNews";

import Today from "../components/Today";
import Filters from "../components/Filters";
import Search from "../components/Search";
import FilterDropDown from "../components/Filters";
import CategoryList from "../components/CategoryList";
import HeadlinesCheckbox from "../components/HeadlinesCheckbox";
import { ArticleDiv, SP, Img, SPC } from "../components/Articles";

const initData = {
	status: "not ok",
	articles: [<p>Loading...</p>]
};

const Home = () => {
	const [isHeadlines, toggleHeadlines] = useState(true);
	const [country, setCountry] = useState(countryEnum.USA);
	const [category, setCategory] = useState(categoryEnum.General);
	const [news, setNews] = useState(initData);
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [sortBySelected, setSortBy] = useState(sortByEnum.Relevant);
	const [lang, setLang] = useState("en");
	let articles: any = <Loading>Loading</Loading>;

	const searchTermChanged = e => {
		setSearchTerm(e.target.value);
	};

	const updateSearchResults = e => {
		if (e.nativeEvent.keyCode == 13 && !!searchTerm) {
			setIsSearching(true);
			// searchRef.current.blur();
		}
	};

	// Headlines case
	useEffect(() => {
		fetchSources().then(sources => console.log("sour", sources));
		fetchNews(country, category).then(news => setNews(news));
	}, [country, category]);

	const _searchNews = () => {
		searchNews(searchTerm, isHeadlines, sortBySelected, country, category)
			.then(news => setNews(news))
			.then(() => {
				setIsSearching(false);
			})
			.catch(_ => {
				articles = (
					<div> Sorry something's wrong. Refresh may be!? </div>
				);
			});
	};

	// Search case
	useEffect(() => {
		if (isSearching) {
			_searchNews();
		}

		if (!!searchTerm) {
			_searchNews();
		}

		return () => {
			// cleanup
		};
	}, [isSearching, isHeadlines, sortBySelected]);

	if (news && news.status === "ok") {
		articles = news.articles.map((article: any, ind) => {
			const publish = new Date(article.publishedAt);
			const smallTitle =
				publish.toDateString() + " | " + article.source.name;
			return (
				<ArticleDiv key={ind} href={article.url}>
					<span>{smallTitle}</span>
					<h2> {article.title} </h2>
					<SP>{article.author}</SP>
					<Img src={article.urlToImage} alt="" />
					<SPC>{article.description}</SPC>
				</ArticleDiv>
			);
		});
	}

	const _setSortBy = e => {
		setSortBy(e.target.value);
	};

	const _toggleHeadlines = e => {
		toggleHeadlines(e.target.checked);
	};

	const _setCountry = e => {
		setCountry(e.target.value);
	};

	const _setCategory = e => {
		setCategory(e.target.value);
	};

	return (
		<>
			<MainDiv>
				<Today />
				<FilterCon>
					<FilterDropDown
						selected={country}
						setFn={_setCountry}
						array={countryEnum}
						label={"Country"}
						disabled={false}
					/>
					<CategoryList
						selected={category}
						setFn={_setCategory}
						array={categoryEnum}
						label={"Category"}
					/>
				</FilterCon>
				<Search
					searchTerm={searchTerm}
					setSearchTerm={searchTermChanged}
					searchNews={updateSearchResults}
				/>
				<HeadlinesCheckbox
					isHeadlines={isHeadlines}
					toggleHeadlines={_toggleHeadlines}
					sortByEnum={sortByEnum}
					sortBySelected={sortBySelected}
					_setSortBy={_setSortBy}
					searchTerm={searchTerm}
				/>
				{/* <Filters /> */}
				<ArticlesCon>{articles}</ArticlesCon>
			</MainDiv>
		</>
	);
};

const MainDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Montserrat", sans-serif;
`;

const FilterCon = styled.div`
	display: flex;
	width: 60%;
	align-items: center;
	justify-content: space-around;
	margin: 1rem;
`;

const ArticlesCon = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-column-gap: 10px;
	justify-items: center;
	width: 100%;
	margin-top: 3rem;
`;

const Loading = styled.span`
	width: 100%;
	grid-column-start: 1;
	grid-column-end: 3;
	text-align: center;

	&::after {
		content: ".";
		animation: load 0.5s linear infinite;
	}

	@keyframes load {
		50% {
			content: "..";
		}

		75% {
			content: "...";
		}
	}
`;

export default Home;
