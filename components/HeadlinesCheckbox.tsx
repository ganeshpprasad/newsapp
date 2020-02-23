import React from "react";
import styled from "styled-components";
import FilterDropDown from "./Filters";

const HeadlinesCheckbox = ({
	isHeadlines,
	toggleHeadlines,
	searchTerm,
	sortByEnum,
	sortBySelected,
	_setSortBy
}) => {
	return (
		<CheckboxDiv>
			<input
				type="checkbox"
				name="Headlines"
				id=""
				checked={isHeadlines}
				onChange={toggleHeadlines}
				disabled={!searchTerm}
			/>
			<label>{isHeadlines ? "Today's Headlines" : "Everything"}</label>
			<div>
				{FilterDropDown({
					selected: sortBySelected,
					setFn: _setSortBy,
					array: sortByEnum,
					label: "Sort By",
					disabled: isHeadlines
				})}
			</div>
		</CheckboxDiv>
	);
};

const CheckboxDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;

	label {
		font-size: 0.7rem;
		margin-right: 1rem;
	}
`;

export default HeadlinesCheckbox;
