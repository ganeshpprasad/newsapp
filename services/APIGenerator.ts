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
	AUSTRALIA = "au",
	ENGLAND = "gb",
	INDIA = "in",
	USA = "us",
	CHINA = "ch",
	ALL = ""
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

export const generateAPI = (_apiContent: apiContent, searchTerm?: String) => {
	const searchq = !!searchTerm
		? "&q=" + searchTerm
		: _apiContent === apiContent.TOP
		? "&country=" + country.USA
		: ""; // top headlines should have country
	const lang = _apiContent === apiContent.SOURCE ? "&language=en" : "";
	return (
		NEWS_BASE_API + _apiContent + API_KEY + searchq + lang
		// "&category=business"
		// "&sources="
	);
};
