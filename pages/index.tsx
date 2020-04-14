import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fetchNews, searchNews, fetchSources } from '../services/newsApi';
import {
	country as countryEnum,
	category as categoryEnum,
	sortBy as sortByEnum,
} from '../services/constants';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
} from 'react-share';

import Today from '../components/Today';
import Search from '../components/Search';
import FilterDropDown from '../components/Filters';
import CategoryList from '../components/CategoryList';
import HeadlinesCheckbox from '../components/HeadlinesCheckbox';
import { ArticleDiv, SP, Img, SPC } from '../components/Articles';

const initData = {
	status: 'not ok',
	articles: [<p>Loading...</p>],
};

export async function getStaticProps() {
	// Call an external API endpoint to get posts.
	const res = await fetchNews(countryEnum.USA, categoryEnum.General);

	// By returning { props: posts }, the Blog component
	// will receive `posts` as a prop at build time
	console.log('res', res);

	return {
		props: {
			news: res,
		},
	};
}

const Home = props => {
	// state
	const didMountRef = useRef(false);
	const [isHeadlines, toggleHeadlines] = useState(true);
	const [country, setCountry] = useState(countryEnum.USA);
	const [category, setCategory] = useState(categoryEnum.General);
	const [news, setNews] = useState(props.news);
	const [searchTerm, setSearchTerm] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [sortBySelected, setSortBy] = useState(sortByEnum.Relevant);

	// change handlers
	const searchTermChanged = e => setSearchTerm(e.target.value);

	const updateSearchResults = e =>
		e.nativeEvent.keyCode == 13 && !!searchTerm && setIsSearching(true);

	const _searchNews = () => {
		searchNews(searchTerm, isHeadlines, sortBySelected, country, category)
			.then(news => setNews(news))
			.then(() => {
				setIsSearching(false);
			})
			.catch(_ => {});
	};

	// Headlines case
	useEffect(() => {
		if (didMountRef.current) {
			fetchNews(country, category).then(news => setNews(news));
		} else {
			console.log('first');
			didMountRef.current = true;
			fetchSources();
		}
	}, [country, category]);

	// Search case
	useEffect(() => {
		console.log('sec');

		if (!!searchTerm) {
			_searchNews();
		}

		return () => {
			// cleanup
		};
	}, [isSearching, isHeadlines, sortBySelected]);

	// useEffect(() => {
	const getNewsArticles = () => {
		console.log('news', news);

		if (news && news.status === 'ok') {
			return news.articles.map((article: any, ind) => {
				const publish = new Date(article.publishedAt);
				const smallTitle =
					publish.toDateString() + ' | ' + article.source.name;
				return (
					<ConDiv key={ind}>
						<ArticleDiv href={article.url}>
							<span>{smallTitle}</span>
							<h2> {article.title} </h2>
							<SP>{article.author}</SP>
							<Img src={article.urlToImage} alt="" />
							<SPC>{article.description}</SPC>
						</ArticleDiv>
						<ShareDiv>
							<FacebookShareButton url={article.url}>
								<ShareImg src="/fb.svg" alt="" />
							</FacebookShareButton>
							<TwitterShareButton url={article.url}>
								<ShareImg src="/twitter.svg" alt="" />
							</TwitterShareButton>
							<LinkedinShareButton url={article.url}>
								<ShareImg src="/linkedin.svg" alt="" />
							</LinkedinShareButton>
						</ShareDiv>
					</ConDiv>
				);
			});
		} else {
			return <Loading>Loading</Loading>;
		}
	};

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
						label={'Country'}
						disabled={false}
					/>
					<CategoryList
						selected={category}
						setFn={_setCategory}
						array={categoryEnum}
						label={'Category'}
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
				<ArticlesCon>{getNewsArticles()}</ArticlesCon>
			</MainDiv>
		</>
	);
};

const MainDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: 'Montserrat', sans-serif;
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
		content: '.';
		animation: load 0.5s linear infinite;
	}

	@keyframes load {
		50% {
			content: '..';
		}

		75% {
			content: '...';
		}
	}
`;

const ShareImg = styled.img`
	width: 30px;
	height: 30px;
`;

const ShareDiv = styled.div`
	display: flex;
	padding: 1rem;
	justify-content: space-evenly;
`;

const ConDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-bottom: 1px solid #ccc;

	&:hover {
		background: #fef;
	}
`;

export default Home;
