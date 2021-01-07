import styled from "styled-components";
import {HiOutlineTrash} from "react-icons/hi"
import {FcTodoList} from "react-icons/fc"
import {BiNotepad} from "react-icons/bi"
import React, {useRef, useState} from 'react';

const Nav = styled.nav`
	background: var(--color5);
	width: 15%;
	min-width: 200px;
	height: 100vh;
	color: var(--color3);
	border-right: 1px solid black;
	font-family: "Avenir Next";
	
	.nav-list {
		margin-top: 68px;
		padding-left: 0;
	}
`;

const Li = styled.li`
	list-style: none;
	padding: 8px 8px 8px 40px;
	width: 100%;
	background-color: ${props => props.active ? `var(--color2)`: `transparent`};
	color: ${props => props.active ? `var(--color5)`: `var(--color3)`};
	font-weight: 500;
	display: flex;
	align-items: center;
	
	svg {
		stroke:  ${props => props.active ? `var(--color1)`: `var(--color3)`};
		width: 1.5em;
		height: 1.5em;
		
		&.todo g {
			fill: ${props => props.active ? `var(--color1)`: `var(--color3)`};
		}
	}
`;

const MainNavbar = ({showNotes, showDeletedItems, isNotesActive, isTrashActive}) => {
	return (
		<Nav>
			<ul className="nav-list">
				<Li onClick={showNotes} active={isNotesActive}><BiNotepad className="mr-8"/>Notes</Li>
				<Li><FcTodoList className="mr-8 todo"/>Todo</Li>
				<Li onClick={showDeletedItems} active={isTrashActive}><HiOutlineTrash className="mr-8"/>Trash</Li>
			</ul>
		</Nav>
	);
}

export default MainNavbar;