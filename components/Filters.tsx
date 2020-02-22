import React from "react";

import styled from "styled-components";

const FilterDropDown = ({ selected, setFn, array, label, disabled }) => {
	let optionArray = [];
	for (const val in array) {
		const isSelected = array[val] === selected;
		optionArray.push(
			<option value={array[val]} selected={isSelected}>
				{val}
			</option>
		);
	}

	return (
		<FilterDiv>
			{/* <Label>{label}</Label> */}
			<Select id="" onChange={setFn} disabled={disabled}>
				{optionArray}
			</Select>
		</FilterDiv>
	);
};

const Label = styled.label`
	margin-bottom: 0.5rem;
	font-size: 0.5rem;
`;

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
