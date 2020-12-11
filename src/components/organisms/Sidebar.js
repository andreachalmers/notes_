import { BsPencilSquare } from 'react-icons/bs';
import {Search, List, Icon} from "semantic-ui-react";
import React from "react";
import {SidebarContainer, SidebarHeader} from "../atoms/atoms";
//@todo: box shadow when scrolling

const Sidebar = ({addNote, children}) => {
	return (
		<SidebarContainer>
			<SidebarHeader>
				<Search placeholder="Search notes" fluid size={"small"} />
				<BsPencilSquare onClick={addNote} className="sidebar__svg btn"/>
			</SidebarHeader>
			{children}
		</SidebarContainer>
	)
}

export default Sidebar;