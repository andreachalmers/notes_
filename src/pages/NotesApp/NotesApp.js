import React, {useEffect, useState, useRef} from 'react'
import Note from '../../components/Note'
import Header from '../../components/organisms/Header'
import Sidebar from '../../components/organisms/Sidebar'
import FlexWrapper from "../../containers/FlexWrapper";
import { List, Button } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components'
//import { ADD_TODO, REMOVE_TODO } from '../../actionTypes'
//import { notes } from '../../actions'
import '../../scss/index.scss'
import useActiveKey from "../../hooks/useActiveKey";
import Sidebar2 from "../../components/organisms/Sidebar2";
import MainNavbar from "../../components/organisms/MainNavbar";
import NoteWrapper from "../../components/molecules/NoteWrapper";

const AlignBtns = styled.div`
	display:flex;
	margin-left: auto;
	justify-content: flex-end;
	margin-right: ${props => props.marginRight ? props.marginRight : 0};
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
	const notesLength = notesArr.length
	const activeKey = useActiveKey(notesArr);


	const handleAddNote = note => {
		const newList = [...notesArr]
		if(notesArr.length) {
			newList[activeKey].active = false
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
		console.log('update')
		//todo: create a fn and call everywhere you need to find active note or rather key
		const newList = [...notesArr]/**/
		notesArr[activeKey] = editedNote
		setNotesArr(newList)
	}

	return (
		<>
			<FlexWrapper>
				<MainNavbar/>
				<Sidebar2 notesArr={notesArr} handleActive={handleActive} addNote={handleAddNote}/>
				<NoteWrapper>
				</NoteWrapper>
			</FlexWrapper>

			{/*<Header heading="Notes">
				<AlignBtns marginRight="8px">
					<Button icon='compose' color="red" onClick={handleAddNote}/>
					<Button icon='trash alternate outline' onClick={handleRemoveNote}/>
				</AlignBtns>
			</Header>
			<FlexWrapper>
				<Sidebar notesArr={notesArr} handleActive={handleActive}>
				</Sidebar>
				<Note activeNote={notesArr[activeKey]} updateNotes={handleUpdateNotes}/>
				<NoteArea>
				</NoteArea>
			</FlexWrapper>*/}
		</>
	)
}

export default NotesApp