import styled from "styled-components";
import React from "react";

const HeaderContainer = styled.header`
	display: flex;
	width: 100%;
	align-items: center;
	padding: 8px 4px 8px 16px;
	border-bottom: var(--borderWidth) solid lightgrey;
	background: var(--cafe);
	background: indianred;
	background: white;
	//color: #fff;
	
	.heading { margin-bottom: 0; }
`
const Header = ({heading, children}) => {
	return (
		<HeaderContainer>
			<h1 className='heading'>{heading}</h1>
			{children}
		</HeaderContainer>
	)
}
export default Header