import styled from "styled-components";
import React from "react";

/*const ListItem = styled.li.attrs(props => {{

}})`
	
`;*/

const ListItemWrapper = styled.div`
	padding: 8px 8px 8px 26px;
	list-style: none;
	position: absolute;
	margin-left: -20px;
	background: var(--color1);
	color: var(--color3);
	width: calc(100% + 20px);
	height: 100%;
	cursor: pointer;
	
	&.active {
		background-color: var(--color6);
	}
`;
const Borders = styled.li`
	border-bottom: 1px solid;
	border-color: var(--color4);
	position: relative;
	margin-left: 20px;
	height: 80px;
	max-height: 160px;
	
	&::before {
		content: '';
		height: 100%;
		background-color: #20232e;
		position: absolute;
		z-index: 200;
		width: 4px;
		left: -20px;
	}
	
	&.active {		
		&::before {
			background-color: #f6cc76;
		}
	}
`;
const Heading = styled.h3`
	font-weight: bold;
	margin-bottom: 8px;
`;

const ListItem = ({heading, content, active, onClick}) => {
	const classes = active ? "active": ""
	return (
		<Borders className={classes} onClick={onClick}>
			<ListItemWrapper className={classes}>
				<Heading>{heading}</Heading>
				<p>{content}</p>
			</ListItemWrapper>
		</Borders>
	);
}

export default ListItem

