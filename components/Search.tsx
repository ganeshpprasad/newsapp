import React, { useState } from "react";

export default function Search(props) {
	const { searchTerm, setSearchTerm, searchNews } = props;

	return (
		<div>
			<input
				type="search"
				name="new_search"
				id=""
				value={searchTerm}
				onChange={setSearchTerm}
				onKeyPress={searchNews}
			/>
		</div>
	);
}
