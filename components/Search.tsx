import React, { useState } from "react";
import useNews from "../hooks/useNews";
import { searchNews } from "../services/newsApi";

export default function Search() {
	const [searchTerm, setSearchTerm] = useState("");

	const searchTermChanged = e => {
		console.log("e", e);

		setSearchTerm(e.target.value);
	};

	const updateSearchResults = e => {
		debugger;
		console.log("enter pressed", e.nativeEvent.keyCode);
		if (e.nativeEvent.keyCode == 13 && !!searchTerm) {
			const [news, setNews] = useNews();
			setNews(searchNews(searchTerm));
		}
	};

	return (
		<div>
			<input
				type="search"
				name="new_search"
				id=""
				value={searchTerm}
				onChange={searchTermChanged}
				onKeyPress={updateSearchResults}
				onSubmit={updateSearchResults}
			/>
		</div>
	);
}
