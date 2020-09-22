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
const Note = ({addNote, currentNote}) => {
	//const [heading, setHeading] = useState('')
	//const [content, setContent] = useState('')
	const [compose, setCompose] = useState(false)
	const [note,setNote] = useState(currentNote)

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
		<NoteArea contentEditable="true" onChange={e => handleOnChange(e.target.value)}>
			{
				!compose ?
					<>
						<h1>{currentNote.heading}</h1>
						<p>{currentNote.content}</p>
					</>
					: ''
			}
		</NoteArea>
	);
}

export default Note