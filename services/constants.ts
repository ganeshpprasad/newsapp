const API_KEY = "apiKey=132fcffe97cd4d9ca85eea8f63cdb6e5";
export const NEWS_BASE_API = "https://newsapi.org/v2/";
export const TOP_HEADLINES = "top-headlines?" + API_KEY;
export const EVERYTHING = "everything?" + API_KEY;
export const COUNTRY = "&country=us";

export const generateAPI = (isTopHeadlines: Boolean, searchTerm: String) => {
	return NEWS_BASE_API + isTopHeadlines
		? TOP_HEADLINES
		: EVERYTHING + !!searchTerm
		? "q=" + searchTerm
		: "" + COUNTRY;
};
