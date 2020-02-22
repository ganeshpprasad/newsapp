import styled from "styled-components";

export const ArticleDiv = styled.a`
	width: 80%;
	font-family: "Merriweather", serif;
	color: black;
	text-decoration: none;
	padding: 4rem;
	border-bottom: 1px solid #ccc;

	span {
		font-size: 0.6rem;
	}

	&:hover {
		background: #fef;
	}
`;

export const SP = styled.p`
	font-family: "Montserrat";
	font-weight: 300;
`;

export const SPC = styled.p`
	font-family: "Montserrat";
	letter-spacing: 0.03rem;
`;

export const Img = styled.img`
	width: 100%;
	margin-bottom: 2rem;
	margin-top: 2rem;
`;
