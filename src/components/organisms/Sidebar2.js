import styled from "styled-components";
import {Search, List, Icon} from "semantic-ui-react";
import React from "react";
import CenterAlign from "../helpers/CenterAlign";
import ListItem from "../atoms/ListItem";

const SidebarContainer = styled.aside`
	border-right: 1px solid var(--color4);
	height: 100vh;
	background: var(--color1);

	width: 20%;
	min-width: 300px;
	overflow: hidden;
	overflow-y: scroll;
	-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  /* Hide scrollbar for Chrome, Safari and Opera */
	&::-webkit-scrollbar {
		display: none;
	}
	
	.ui.celled.list {
		margin-top: 0;
	}
	
	.ui.icon.input {
		input {
			border-radius: 2px;
			background: var(--color1);
			color: white;
		
		}
		
		i {
			color: var(--color3);
		}
	
	}

`;


const SidebarHeader = styled.header`
	display: flex;
	padding: 16px;
	justify-content: space-around;
	align-items: centers;
	border-bottom: 1px solid var(--color4);
	
	
`;

const Sidebar2 = ({notesArr, handleActive, addNote}) => {
	return (
		<SidebarContainer>
			<SidebarHeader>
				<Search placeholder="Search notes" fluid size={"small"} />
				<Icon name="write square"  onClick={addNote} color={"red"} size={"big"} style={{position: 'relative', top: '4px'}}/>
			</SidebarHeader>
			<List celled>
				{
					notesArr?.map((item,i) => (
						<ListItem
							key={item[i]}
							active={`${item.active ? 'active' : ''}`}
							onClick={() => handleActive(i)}
							heading={!item.content ? 'New Note': item.heading}
							content={item.content}
						>
						</ListItem>
					)).reverse()
				}
			</List>
		</SidebarContainer>
	)
}

export default Sidebar2;