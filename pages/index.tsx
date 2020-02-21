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

	const HeadlinesCheckbox = ({ isHeadlines, toggleHeadlines }) => {
		return (
			<CheckboxDiv>
				<input
					type="checkbox"
					name="Headlines"
					id=""
					checked={isHeadlines}
					onChange={toggleHeadlines}
					disabled={!searchTerm}
				/>
				<label>
					{isHeadlines ? "Today's Headlines" : "Everything"}
				</label>
				<div>
					{FilterDropDown({
						selected: sortBySelected,
						setFn: _setSortBy,
						array: sortByEnum,
						label: "Sort By",
						disabled: isHeadlines
					})}
					{/* <select name="sortby" id="" disabled={true}>
						<option value={sortByEnum.Relevant}>Relevant</option>
						<option value={sortByEnum.Newest}>Newest</option>
						<option value={sortByEnum.Popular}>Popular</option>
					</select> */}
				</div>
			</CheckboxDiv>
		);
	};

	const _setSortBy = e => {
		setSortBy(e.target.value);
	};

	const _toggleHeadlines = e => {
		toggleHeadlines(e.target.checked);
	};

	const CategoryList = ({ selected, setFn, array, label }) => {
		let listarray = [];
		for (const val in array) {
			const isSelected = array[val] === selected;
			listarray.push(
				isSelected ? (
					<SelectedOption value={array[val]}>{val}</SelectedOption>
				) : (
					<option value={array[val]} onClick={setFn}>
						{val}
					</option>
				)
			);
		}

		return <Categorys>{listarray}</Categorys>;
	};

	const FilterDropDown = ({ selected, setFn, array, label, disabled }) => {
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
				{/* <Label>{label}</Label> */}
				<Select id="" onChange={setFn} disabled={disabled}>
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

const Select = styled.select`
	padding: 0.1rem;
	background-color: white;
	font-family: "Montserrat";
	font-size: 0.6rem;
`;

const Label = styled.label`
	margin-bottom: 0.5rem;
	font-size: 0.5rem;
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

const Categorys = styled.div`
	display: flex;
	align-items: center;

	option {
		padding: 1rem;
		text-transform: uppercase;
		font-family: "Merriweather";
		cursor: pointer;
		font-size: 0.6rem;
	}
`;

const SelectedOption = styled.option`
	font-weight: 500;
	color: red;
`;

const CheckboxDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	label {
		font-size: 0.6rem;
	}
`;

export default Home;
