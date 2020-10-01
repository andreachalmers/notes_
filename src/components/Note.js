import React, {useEffect, useState} from 'react';
import styled from "styled-components";
const vars= {
	headerHeight: `61px`,
	borderWidth: `1px`,
	red: `#ff0035`,
	indianred: `indianred`,
	richBlack: `#010b13`,
	cafe: `#a77e58`,
	gainsboro: `rgba(219, 217, 219, 0.2)`,
}

const NoteArea = styled.p`
	width: calc(70% - ${vars.borderWidth});
	border-width: 0;
	padding: 16px;
	font-size: 1.25em;
	
	&:focus {
		outline: ${vars.borderWidth} dashed ${vars.cafe};
		height: calc(100vh - ${vars.borderWidth * 2} - ${vars.headerHeight});
	}
`



const Note = ({addNote, activeNote, notes, children }) => {
	const _renderNote = () => {
		if(activeNote !== undefined) {
			return (
				<>
					<h2>{activeNote.heading}</h2>
					<p>{activeNote.content}</p>
				</>
			)
		}
	}

	return (
		//todo: get rid of react content- editable warnings
		<NoteArea id='note-area'>
			{_renderNote()}
		</NoteArea>
	);
}

export default Note