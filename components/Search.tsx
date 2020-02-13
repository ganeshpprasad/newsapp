import React, { useRef } from "react";
import styled from "styled-components";

export default function Search(props) {
	const { searchTerm, setSearchTerm, searchNews } = props;

	return (
		<SearchDiv>
			<SearchInput
				type="search"
				name="new_search"
				id=""
				value={searchTerm}
				onChange={setSearchTerm}
				onKeyPress={searchNews}
				placeholder="Search News"
			/>
		</SearchDiv>
	);
}

const SearchDiv = styled.div`
	width: 40%;
`;

const SearchInput = styled.input`
	height: 2rem;
	width: 100%;
	font-family: "merriweather";
	padding-left: 0.3rem;
	padding-top: 0.3rem;
	letter-spacing: 0.05rem;
`;
