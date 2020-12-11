import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/organisms/Sidebar'
import FlexWrapper from "../../containers/FlexWrapper";
import 'semantic-ui-css/semantic.min.css'
import '../../scss/index.scss'
import MainNavbar from "../../components/organisms/MainNavbar";
import NoteWrapper from "../../components/molecules/NoteWrapper";
import ListItem from "../../components/atoms/ListItem";
//import data from "../../db.json";

import useFetchData from "../../api/useFetchData";

const NotesApp = () => {
	console.log('render')

	const apiEndpoint = "http://my-json-server.typicode.com/andreachalmers/notes_"
	const api = "http://localhost:3001/notes"
	const {notesArr, setNotesArr} = useFetchData(api, [])
	const [activeKey, setActiveKey ]= useState(0)

	useEffect(()=>{
		setActiveKey(Object.keys(notesArr).find(key => notesArr[key].active === true))
		//setActiveKey(notesArr.length -1)
	},[notesArr])

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
			content: "",
			active: true,
		}
		setNotesArr(newList)
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
	}

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
				<Sidebar addNote={handleAddNote}>
					{_renderNotesList()}
				</Sidebar>
				<NoteWrapper activeNote={notesArr[activeKey]} activeKey={activeKey} updateNotes={handleUpdateNotes}/>
			</FlexWrapper>
		</>
	)
}

export default NotesApp