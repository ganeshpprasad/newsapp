import {
	country,
	category,
	NEWS_BASE_API,
	apiContent,
	API_KEY,
	sortBy
} from "./constants";

export const generateTopHeadlinesAPI = (
	country: country,
	category: category,
	searchTerm?: String
) => {
	const categoryFilter = "&category=" + category;
	const searchq = !!searchTerm ? "&q=" + searchTerm : "";
	const _country = "&country=" + country;
	return (
		NEWS_BASE_API +
		apiContent.TOP +
		API_KEY +
		_country +
		searchq +
		categoryFilter
	);
};

export const generateEveryAPI = (searchTerm?: String, sortBy?: sortBy) => {
	const searchq = !!searchTerm ? "&q=" + searchTerm : "";
	const sort = !!sortBy ? "&sortBy=" + sortBy : "";
	return NEWS_BASE_API + apiContent.EVERY + API_KEY + searchq + sort;
};

export const generateSourcesAPI = () => {
	return NEWS_BASE_API + apiContent.SOURCE + API_KEY;
};
