import React from "react";

import styled from "styled-components";

const FilterDropDown = ({ selected, setFn, array, label, disabled }) => {
	let optionArray = [];
	for (const val in array) {
		optionArray.push(
			<option key={array[val]} value={array[val]}>
				{val}
			</option>
		);
	}

	return (
		<FilterDiv>
			<Select value={selected} onChange={setFn} disabled={disabled}>
				{optionArray}
			</Select>
		</FilterDiv>
	);
};

const FilterDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Select = styled.select`
	padding: 0.1rem;
	background-color: white;
	font-family: "Montserrat";
	font-size: 0.6rem;
`;

export default FilterDropDown;
