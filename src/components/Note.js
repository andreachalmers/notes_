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
const Note = ({addNote, currentNote, notes, children }) => {
	const [heading, setHeading] = useState('')
	const [content, setContent] = useState('')
	//const [active, setActive] = useState()
	const [compose, setCompose] = useState(false)
	const [note,setNote] = useState('')


	const handleOnChange = () => {
		setNote({
			heading: heading,
			content: '',
			active: true,
		})
	}
	useEffect(()=> console.log(notes[0].heading), [currentNote])
	useEffect(()=>{
		console.log('chnage')
		const noteNodes = document.getElementById('note-area').children
		let heading
		/*if( noteNodes!== undefined) {
			heading = noteNodes[0].innerHTML
		}*/
		setNote({
			heading: 'heading',
			content: 'content',
			active: true,
		})
	}, [])

	useEffect(()=> {
		addNote(note)
	},[note])

	const _renderNote = () => {
		return (
			<>
				{/*<h1>{note.heading}</h1>
				<p>{note.content}</p>*/}
			</>
		)
	}

	return (
		//todo: get rid of react content- editable warnings
		<NoteArea contentEditable="true" id='note-area'>
			{_renderNote()}
			{currentNote}
		</NoteArea>
	);
}

export default Note