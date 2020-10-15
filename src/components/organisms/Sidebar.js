import styled from "styled-components";
import {List} from "semantic-ui-react";
import React from "react";

//todo: remove duplicates later and place in one file that is imported (vars)

const SidebarContainer = styled.aside`
	width: 15%;
	height: 100vh;
	background-color: var(--gainsboro);
	padding: 16px 0 16px 12px;
	
	.ui.celled.list>.item {
		padding: 8px 4px;
		
		&:first-child {
			border-top: 0;
		}
		
		&.active {
			color: var(--cafe) !important;
			border-width: 1px 0;
			color: white;
			
			.header {
				color: var(--cafe);
			}
		}
	}
`


const Sidebar = ({notesArr, handleActive, children}) => {
	return (
		<SidebarContainer>
			{children}
			<List celled>
				{
					notesArr?.map((item,i) => (
						<List.Item
							key={item[i]}
							active={`${item.active ? 'active' : ''}`}
							onClick={() => handleActive(i)}
						>
							<List.Content className="list-content">
								<List.Header>{!item.content ? 'New Note': item.heading}</List.Header>
								{item.content}
							</List.Content>
						</List.Item>
					)).reverse()
				}
			</List>
		</SidebarContainer>
	)
}

export default Sidebar