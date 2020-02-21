import fetch from "unfetch";
import { apiContent, generateAPI } from "./APIGenerator";

const fetcher = async url => {
	const res = await fetch(url);
	const json = await res.json();
	return json;
};

export const fetchNews = async (country, category) => {
	return await fetcher(generateAPI(apiContent.TOP, "", country, category));
};

export const searchNews = async (
	searchTerm,
	isHeadlines,
	sortby,
	country,
	category
) => {
	return await fetcher(
		generateAPI(
			isHeadlines ? apiContent.TOP : apiContent.EVERY,
			searchTerm,
			country,
			category,
			sortby
		)
	);
};

export const fetchSources = async () => {
	return await fetcher(generateAPI(apiContent.SOURCE));
};
