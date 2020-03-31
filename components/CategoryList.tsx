import React from "react";
import styled from "styled-components";

const CategoryList = ({ selected, setFn, array, label }) => {
	let listarray = [];
	for (const val in array) {
		const isSelected = array[val] === selected;
		listarray.push(
			isSelected ? (
				<SelectedOption key={val} value={array[val]}>
					{val}
				</SelectedOption>
			) : (
				<option key={val} value={array[val]} onClick={setFn}>
					{val}
				</option>
			)
		);
	}

	return <Categorys>{listarray}</Categorys>;
};

const Categorys = styled.div`
	display: flex;
	align-items: center;

	option {
		padding: 1rem;
		text-transform: uppercase;
		font-family: "Merriweather";
		cursor: pointer;
		font-size: 0.6rem;
	}
`;

const SelectedOption = styled.option`
	font-weight: 500;
	color: red;
`;

export default CategoryList;
