import React, {useEffect, useState} from 'react'
import Note from '../../components/Note'
import { List, Button } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components'
//import { ADD_TODO, REMOVE_TODO } from '../../actionTypes'
//import { notes } from '../../actions'
import './NotesApp.scss'

const vars= {
	headerHeight: `61px`,
	borderWidth: `1px`,
	red: `#ff0035`,
	indianred: `indianred`,
	richBlack: `#010b13`,
	cafe: `#a77e58`,
	gainsboro: `rgba(219, 217, 219, 0.2)`,
}

const Wrapper = styled.div`
	display: flex;
`

const Header = styled.header`
	display: flex;
	width: 100%;
	align-items: center;
	padding: 8px 4px 8px 16px;
	border-bottom: ${vars.borderWidth} solid lightgrey;
	background: ${vars.cafe};
	background: indianred;
	background: white;
	//color: #fff;
	
	.heading { margin-bottom: 0; }
`

const AlignBtns = styled.div`
	margin-left: auto;
`

const Sidebar = styled.aside`
	width: 30%;
	max-width: 240px;
	height: calc(100vh - ${vars.headerHeight});
	background-color: ${vars.gainsboro};
	padding: 16px 0 16px 12px;
	
	.ui.celled.list>.item {
		padding: 8px 4px;
		
		&:first-child {
			border-top: 0;
		}
		
		&.active {
			color: ${vars.cafe} !important;
			border-width: 1px 0;
			color: white;
			
			.header {
				color: ${vars.cafe};
			}
		}
	}
`

const NotesApp = () => {
	const [notesArr, setNotesArr] = useState([
		{
			heading: '# Snickerdoodle',
			content: 'An excellent companion',
			active: false,
		},
		{
			heading: '# Lorem Ipsum',
			content: 'Hipster ipsum bacon coffee',
			active: true,
		}
	])
	//const [activeNote, setActiveNote] = useState(notesArr[notesLength - 1])
	const notesLength = notesArr.length

	useEffect(() => {
		setTimeout(handleSave, 2000)
	}, [])

	const handleAddNote = note => {
		const newList = [...notesArr]
		if(notesArr.length) {
			const currentActiveKey = Object.keys(notesArr).find(key => notesArr[key].active === true)
			newList[currentActiveKey].active = false
		}

		newList[notesArr.length] = {
			heading: `# Note ${notesArr.length + 1}`,
			content: "content",
			active: true,
		}

		setNotesArr(newList)
	}

	const handleSave = () => {

	}

	const handleActive = i => {
		//todo:by default last item in arr should be active note unless clicked on another in sidebar
		//todo: if the top most item is active and  you click it again it should not toggle but stay active

		//todo: if active is clicked again remain active
		let newArr = notesArr
		console.log(notesArr[i].active)

		newArr[i].active = true
		//when one is active make all others inactive/false
		newArr.map(item => {
			if(item !== notesArr[i]) {
				item.active = false
			}

		})
		setNotesArr([...notesArr],newArr)
		//setActiveNote(notesArr[i])
	}

	const getActiveNote = () => {
		if(notesArr.length) {
			const lastNote = notesArr[notesLength - 1]
			//todo: use this instead of setting activenode state
			let activeNote = notesArr.filter(item => {
				if(item.active === true)
					return item
			})
			return activeNote.length ? activeNote[0] : lastNote
		}
	}

	useEffect(()=> {
		//console.log('hello')
		const activeNote = notesArr.filter(item => {
			if(item.active === true)
				return item
		})
		//setActiveNote(activeNote)
	}, [notesArr])

	const handleRemoveNote = () => {
		if(notesArr.length) {
			const newList = notesArr.filter(item => item.active !== true)
			if(notesArr.length > 1)
				newList[newList.length - 1].active = true

			setNotesArr(newList)
		}
	}

	const handleUpdateNotes = editedNote => {
		//todo: create a fn and call everywhere you need to find active note or rather key
		const currentActiveKey = Object.keys(notesArr).find(key => notesArr[key].active === true)
		const newList = [...notesArr]
		newList[currentActiveKey] = editedNote

		setNotesArr(newList)
	}

	return (
		<>
			<Header>
				<h1 className='heading'>Notes</h1>
				<AlignBtns>
					<Button icon='compose' color="red" onClick={handleAddNote}/>
					<Button icon='trash alternate outline' onClick={handleRemoveNote}/>
					<Button icon='save outline' onClick={handleSave}/>
				</AlignBtns>
			</Header>
			<Wrapper>
				<Sidebar>
					<List celled>
						{
							notesArr?.map((item,i) => (
								<List.Item
									key={item[i]}
									active={`${item.active ? 'active' : ''}`}
									onClick={() => handleActive(i)}>
									<List.Content>
										<List.Header>{item.heading}</List.Header>
										{item.content}
									</List.Content>
								</List.Item>
							)).reverse()
						}
					</List>
				</Sidebar>
				<Note activeNote={getActiveNote()} updateNotes={handleUpdateNotes}></Note>
				{/*<NoteArea>
				</NoteArea>*/}
			</Wrapper>
		</>
	)
}

export default NotesApp