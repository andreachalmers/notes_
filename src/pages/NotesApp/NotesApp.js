import React, {useState, useEffect} from 'react'
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
import ListItem from "../../components/atoms/ListItem";
//import data from "../../db.json";

import ReactMarkdown from "react-markdown";
import useFetchData from "../../api/useFetchData";

const NotesApp = () => {
	console.log('render')

	const apiEndpoint = "http://my-json-server.typicode.com/andreachalmers/notes_"
	const api = "http://localhost:3001/notes"
	const userFetchResponse = useFetchData(api, {isLoading: true, data: []})
	//const {data} = userFetchResponse;
	const {notesArr, setNotesArr} = useFetchData(api, [])
//const [notesArr, setNotesArr] = useState([{heading: 'loading...'}]);
	//const notesLength = notesArr.length;
	//const activeKey = Object.keys(notesArr)?.find(key => notesArr[key].active === true)

	const [activeKey, setActiveKey ]= useState(0)

	if(!userFetchResponse.data || userFetchResponse.isLoading) {
		console.log('loading');
	}

	console.log(notesArr)
	useEffect(()=>{
		setActiveKey(Object.keys(notesArr).find(key => notesArr[key].active === true))
		//setActiveKey(notesArr.length -1)
	},[notesArr])

	/*useEffect(()=>{
		setNotesArr(notesArr)
	}, [notesArr, setNotesArr])*/
	const handleAddNote = note => {
		const newList = [...notesArr]
		console.log(activeKey)
		//todo: increment activeKey
		//todo:just make activeKey a state in this component
		if(notesArr.length) {
			newList[activeKey].active = false
		}

		newList[notesArr.length] = {
			heading: "# A wonderful new note",
			content: "Keep calm and write something",
			active: true,
		}
		setNotesArr(newList)
	}

	const handleSave = note => {
		console.log(note, 'save')
		const newarr = [...notesArr]
		newarr[activeKey].content = note
		//todo: fix active key
		setNotesArr(newarr)
		/*const activeKey = Object.keys(notesArr).find(key => notesArr[key].active === true)
		//remove hook doesnt work
		console.log('saving', activeKey)
		const newList = notesArr;
		newList[activeKey].content = note
		newList.map(item => !item[activeKey] ? item.active = false : '');
		newList[activeKey].active = true
		setNotesArr(newList)*/
	}

	const handleActive = i => {
		let newArr = notesArr

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
			const lastNote = notesArr[notesArr.length() - 1]
			//todo: use this instead of setting activenode state
			let activeNote = notesArr.filter(item => {
				if(item.active === true)
					return item
			})
			return activeNote.length ? activeNote[0] : lastNote
		}
	}

/*	useEffect(()=> {
		//console.log('hello')
		const activeNote = notesArr.filter(item => {
			if(item.active === true)
				return item
		})
		//setActiveNote(activeNote)
	}, [notesArr])*/

	const handleRemoveNote = () => {
		if(notesArr.length) {
			const newList = notesArr.filter(item => item.active !== true)
			if(notesArr.length > 1)
				newList[newList.length - 1].active = true

			setNotesArr(newList)
		}
	}

	const _renderNotesList = () => {
		return (
			<ul>
				{
					notesArr?.map((item,i) => (
						<ListItem
							key={item[i]}
							active={`${item.active ? 'active' : ''}`}
							onClick={() => handleActive(i)}
							heading={item.heading}
							content={item.content}
						/>
					)).reverse()
				}
			</ul>
		);
	}

	const handleUpdateNotes = (note, key) => {
		//put...
		const endOfHeading = note.search('\n')
		const heading = note.slice(0, endOfHeading)
		const content = note.slice(endOfHeading).trimStart()

		console.log(heading, content)
		let newList = [...notesArr]
		newList[key] = {
			heading: heading,
			content: content,
			active: true,
		}

		setNotesArr(newList)
	}
	return (
		<>
			<FlexWrapper>
				<MainNavbar/>
				{/* TESTING: <p style={{color: 'deeppink'}}>{activeKey}</p>*/}
				<Sidebar2 addNote={handleAddNote}>
					{_renderNotesList()}
				</Sidebar2>
				<NoteWrapper activeNote={notesArr[activeKey]} activeKey={activeKey} updateNotes={handleUpdateNotes}>
					{/*<ReactMarkdown source={'# This is a header\n\nAnd this is a paragraph'}/>*/}
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