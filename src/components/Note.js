import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {TextArea} from "semantic-ui-react";
import ReactMarkdown from 'react-markdown';
import styled from "styled-components";
import '../scss/components/_Note.scss'

const NoteArea = styled.div`
	width: calc(70% - var(--borderWidth));
	width: 85%;
	border-width: 0;
	padding: 40px;
	font-size: 1.25em;
	
	&:focus {
		outline: var(--borderWidth) dashed var(--cafe);
		height: calc(100vh - (var(--borderWidth) * 2) - var(--headerHeight));
	}
`

const Note = ({addNote, activeNote, updateNotes, notes, children }) => {
	const md = activeNote ? Object.values(activeNote).filter(item => item!== true ).join('\n\n') : ''
	console.log(md)
	const [note,setNote] = useState(md)
	const input = '# This is a header\n\nAnd this is a paragraph'

	useEffect(() => {
		setNote(md)
	}, [activeNote, md])

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

	const debounce = (func, wait) => {
		let timeout;

		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	};

	const handleEdit = debounce((value) => {
		//const newHeading = document.getElementById('heading').innerText
		//const newNote = document.getElementsByTagName('div').innerText
		/*setEditNote({
			//heading: newHeading,
			content: newNote,
			active: true,
		})*/

		const obj = {
			//heading: '',
			content: value,
			active: true,
		}
		updateNotes(obj)
	})

	const handleChange = e => {
		const value = e.target.value
		// sep heading and content here instead
		const endOfHeading = value.indexOf("\n")
		let heading = !value ? 'New Note' : value.slice(0, endOfHeading)
		//let content = value.slice(endOfHeading, (value.length - 1))
		//setNote(value)
		handleEdit(value)
	}

	return (
		//todo: get rid of react content- editable warnings
		/*<NoteArea id='note-area' onInput={handleEdit}>
			{_renderNote()}
		</NoteArea>*/
		<NoteArea>
			<textarea id="editor" onChange={e => handleChange(e)} value={note} className="textarea" placeholder="Well what are you waiting for? Get typing..."/>
			<ReactMarkdown source={note} className="md"/>
		</NoteArea>
		//todo: decide whether to autosave or save and change the input of react md accordingly
		//todo: have one view for newnote(compose), one for editing and maybe one for just viewing and for each view the source will change
		//or cater for changing note use md
	);
}

export default Note