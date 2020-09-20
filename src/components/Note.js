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

const NoteArea = styled.textarea`
	width: calc(70% - ${vars.borderWidth});
	border-width: 0;
	padding: 16px;
	font-size: 1.25em;
	
	&:focus {
		outline: ${vars.borderWidth} dashed ${vars.cafe};
		height: calc(100vh - ${vars.borderWidth * 2} - ${vars.headerHeight});
	}
`
const Note = ({addNote}) => {
	//const [heading, setHeading] = useState('')
	//const [content, setContent] = useState('')
	const [note,setNote] = useState({
		heading: '',
		content: '',
	})

	const handleOnChange = value => {
		setNote({
			heading: 'heading',
			content: value,
		})
	}

	useEffect(()=> {
		addNote(note)
	},[note])

	return (
		<NoteArea onChange={e => handleOnChange(e.target.value)}></NoteArea>
	);
}

export default Note