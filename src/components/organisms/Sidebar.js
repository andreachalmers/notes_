import { BsPencilSquare } from 'react-icons/bs';
import {Search} from "semantic-ui-react";
import React from "react";
import {SidebarContainer, SidebarHeader} from "../atoms/atoms";
//@todo: box shadow when scrolling

const Sidebar = ({addNote, children, isTrashActive}) => {
	const classes = isTrashActive ? "btn sidebar__svg sidebar__svg--disabled":"sidebar__svg btn"
	return (
		<SidebarContainer>
			<SidebarHeader>
				<Search placeholder="Search notes" fluid size={"small"} />
				<BsPencilSquare onClick={addNote} className={classes} />
			</SidebarHeader>
			{children}
		</SidebarContainer>
	)
}

export default Sidebar;