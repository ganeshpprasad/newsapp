export const API_KEY = "apiKey=132fcffe97cd4d9ca85eea8f63cdb6e5";
export const NEWS_BASE_API = "https://newsapi.org/v2/";

export enum apiContent {
	TOP = "top-headlines?",
	EVERY = "everything?",
	SOURCE = "sources?"
}

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
