import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
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

const NoteArea = styled.div`
	width: calc(70% - ${vars.borderWidth});
	border-width: 0;
	padding: 16px;
	font-size: 1.25em;
	
	&:focus {
		outline: ${vars.borderWidth} dashed ${vars.cafe};
		height: calc(100vh - ${vars.borderWidth * 2} - ${vars.headerHeight});
	}
`

const Note = ({addNote, activeNote, updateNotes, notes, children }) => {
	const [editNote, setEditNote] = useState(activeNote)

	const md = activeNote ? Object.values(activeNote).filter(item => item!== true ).join('\n\n') : ''
	const input = '# This is a header\n\nAnd this is a paragraph'

	useEffect(() => {
		//updateNotes(editNote)
	}, [editNote, updateNotes])

	const _renderNote = () => {
		if(activeNote !== undefined) {
			return (
				<>
					<h2 id='heading'>{activeNote.heading}</h2>
					<p>{activeNote.content}</p>
				</>
			)
		}
	}

	const handleEdit = () => {
		const newHeading = document.getElementById('heading').innerText
		const newNote = document.getElementsByTagName('div').innerText
		/*setEditNote({
			//heading: newHeading,
			content: newNote,
			active: true,
		})*/

		const obj = {
			heading: newHeading,
			content: newNote,
			active: true,
		}
		updateNotes(obj)
	}

	return (
		//todo: get rid of react content- editable warnings
		/*<NoteArea id='note-area' onInput={handleEdit}>
			{_renderNote()}
		</NoteArea>*/
		<NoteArea>
			<ReactMarkdown source={md}/>
		</NoteArea>
	);
}

export default Note