import fetch from "unfetch";
import useSwr from "swr";

import {
	NEWS_BASE_API,
	TOP_HEADLINES,
	COUNTRY,
	generateAPI
} from "./constants";

const fetcher = async url => {
	const res = await fetch(url);
	const json = await res.json();
	return json;
};

export const fetchNews = () => {
	return useSwr(NEWS_BASE_API + TOP_HEADLINES + COUNTRY, fetcher);
};

export const searchNews = searchTerm => {
	return useSwr(generateAPI(false, searchTerm));
};
