import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Today = () => {
	const [statetodayDate, setstatetodayDate] = useState(new Date());

	return (
		<TodayDiv>
			<p> {statetodayDate.toDateString()} </p>
		</TodayDiv>
	);
};

const TodayDiv = styled.div`
	font-family: "Merriweather", serif;
`;

export default Today;
