import fetch from 'node-fetch';
import {
	generateEveryAPI,
	generateTopHeadlinesAPI,
	generateSourcesAPI,
} from './APIGenerator';

const fetcher = async url => {
	const res = await fetch(url);
	const json = await res.json();
	return json;
};

export const fetchNews = async (country, category) => {
	return await fetcher(generateTopHeadlinesAPI(country, category, ''));
};

export const searchNews = async (
	searchTerm,
	isHeadlines,
	sortby,
	country,
	category
) => {
	return await fetcher(
		isHeadlines
			? generateTopHeadlinesAPI(country, category, searchTerm)
			: generateEveryAPI(searchTerm, sortby)
	);
};

export const fetchSources = async () => {
	return await fetcher(generateSourcesAPI());
};
