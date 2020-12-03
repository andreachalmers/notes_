import React, {useEffect, useState, useRef, useCallback} from 'react'
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
import data from  "../../index.json";

import ReactMarkdown from "react-markdown";

const AlignBtns = styled.div`
	display:flex;
	margin-left: auto;
	justify-content: flex-end;
	margin-right: ${props => props.marginRight ? props.marginRight : 0};
`

const NotesApp = () => {
	const [notesArr, setNotesArr] = useState([]);
	const notesLength = notesArr.length;
	const activeKey = useActiveKey(notesArr);

	const getData = () => {
		let url = "http://localhost:3001/notes"
		fetch(url, {
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data)
				setNotesArr(data)
			})
	}

	useEffect(()=>{
		getData()
	},[])

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

	const _renderNotesList = useCallback(() => {
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
	})

	const handleUpdateNotes = (note, key) => {
		let newList = [...notesArr]
		newList[key] = {
			content: note,
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