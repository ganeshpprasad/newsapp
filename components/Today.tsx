import React from "react";
import { useState } from "react";

const Today = () => {
	const [statetodayDate, setstatetodayDate] = useState(new Date());

	return (
		<div>
			<p> {statetodayDate.toDateString()} </p>
		</div>
	);
};

export default Today;
