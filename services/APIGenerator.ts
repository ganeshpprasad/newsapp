const API_KEY = "apiKey=132fcffe97cd4d9ca85eea8f63cdb6e5";
const NEWS_BASE_API = "https://newsapi.org/v2/";
const TOP_HEADLINES = "top-headlines?" + API_KEY;
const EVERYTHING = "everything?" + API_KEY;
// const COUNTRYs = "&country=us";
const SOURCES = "sources?";

export enum apiContent {
	TOP = "top-headlines?",
	EVERY = "everything?",
	SOURCE = "sources?"
}

// language enum

// country enum
export enum country {
	AUS = "au",
	ENG = "gb",
	IND = "in",
	USA = "us",
	CHI = "ch"
}

// Sources
export enum category {
	Business = "business",
	Entertainment = "entertainment",
	General = "general",
	Health = "health",
	Science = "science",
	Sports = "sports",
	Technology = "technology"
}

// Everything
export enum sortBy {
	Relevant = "relevancy",
	Popular = "popularity",
	Newest = "publishedAt"
}

export const generateAPI = (
	_apiContent: apiContent,
	searchTerm?: String,
	country?: country,
	category?: category,
	sortBy?: sortBy
) => {
	const categoryFilter = !!category ? "&category=" + category : "";
	const searchq = !!searchTerm ? "&q=" + searchTerm : "";
	const _country =
		_apiContent === apiContent.TOP ? "&country=" + country : ""; // top headlines should have country
	const lang = "&language=en";
	const sort = !!sortBy ? "&sortBy=" + sortBy : "";
	const conditionalParams =
		_apiContent == apiContent.TOP ? categoryFilter : sort;
	return (
		NEWS_BASE_API +
		_apiContent +
		API_KEY +
		_country +
		searchq +
		conditionalParams +
		lang
	);
};
