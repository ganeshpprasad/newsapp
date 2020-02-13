import React, { useState, useEffect, useRef } from "react";
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

	// Search case
	useEffect(() => {
		if (isSearching) {
			// _searchNews();
			searchNews(searchTerm)
				.then(news => setNews(news))
				.then(() => {
					setIsSearching(false);
					setSearchTerm("");
				})
				.catch(_ => {
					articles = (
						<div> Sorry something's wrong. Refresh may be!? </div>
					);
				});
			console.log("isseach", isSearching);
		}

		return () => {
			// cleanup
		};
	}, [isSearching]);

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

	const FilterDropDown = ({ selected, setFn, array, label }) => {
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
			<FilterDiv>
				<Label>{label}</Label>
				<Select id="" onChange={setFn}>
					{optionArray}
				</Select>
			</FilterDiv>
		);
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
					/>
					<FilterDropDown
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
				{/* <HeadlinesCheckbox
					isHeadlines={isHeadlines}
					toggleHeadlines={_toggleHeadlines}
				/> */}
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

const Select = styled.select`
	padding: 0.3rem;
	background-color: white;
	font-family: "Montserrat";
`;

const Label = styled.label`
	margin-bottom: 0.5rem;
`;

const FilterDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ArticlesCon = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-column-gap: 10px;
	justify-items: center;
	width: 100%;
	margin-top: 3rem;
`;

const ArticleDiv = styled.a`
	width: 80%;
	font-family: "Merriweather", serif;
	color: black;
	text-decoration: none;
	padding: 4rem;
	border-bottom: 1px solid #ccc;

	span {
		font-size: 0.6rem;
	}

	&:hover {
		background: #fef;
	}
`;

const SP = styled.p`
	font-family: "Montserrat";
	font-weight: 300;
`;

const SPC = styled.p`
	font-family: "Montserrat";
	letter-spacing: 0.03rem;
`;

const Img = styled.img`
	width: 100%;
	margin-bottom: 2rem;
	margin-top: 2rem;
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
