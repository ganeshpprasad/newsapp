import fetch from "unfetch";
import { apiContent, generateAPI } from "./APIGenerator";

const fetcher = async url => {
	const res = await fetch(url);
	const json = await res.json();
	return json;
};

export const fetchNews = async () => {
	return await fetcher(generateAPI(apiContent.TOP));
};

export const searchNews = async searchTerm => {
	return await fetcher(generateAPI(apiContent.EVERY, searchTerm));
};

export const fetchSources = async () => {
	return await fetcher(generateAPI(apiContent.SOURCE));
};
