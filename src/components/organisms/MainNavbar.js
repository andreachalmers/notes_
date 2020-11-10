import styled from "styled-components";
import ListItem from "../atoms/ListItem";
import React from 'react';

const Nav = styled.nav`
	background: var(--color5);
	width: 10%;
	min-width: 200px;
	height: 100vh;
	color: var(--color3);
	border-right: 1px solid black;
	
	.nav-list {
		margin-top: 68px;
	}
`;

const Li = styled.li`
	list-style: none;
	padding: 8px;
	width: 100%;
`;

const MainNavbar = () => {
	return (
		<Nav>
			<ul className="nav-list">
				<Li>Notes</Li>
				<Li>Todo</Li>
				<Li>Trash</Li>
			</ul>
		</Nav>
	);
}

export default MainNavbar;