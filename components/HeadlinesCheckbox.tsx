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
				{/* <select name="sortby" id="" disabled={true}>
						<option value={sortByEnum.Relevant}>Relevant</option>
						<option value={sortByEnum.Newest}>Newest</option>
						<option value={sortByEnum.Popular}>Popular</option>
					</select> */}
			</div>
		</CheckboxDiv>
	);
};

const CheckboxDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	label {
		font-size: 0.6rem;
	}
`;

export default HeadlinesCheckbox;
