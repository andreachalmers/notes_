import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/organisms/Sidebar'
import FlexWrapper from "../../containers/FlexWrapper";
import 'semantic-ui-css/semantic.min.css'
import '../../scss/index.scss'
import MainNavbar from "../../components/organisms/MainNavbar";
import NoteWrapper from "../../components/molecules/NoteWrapper";
import ListItem from "../../components/atoms/ListItem";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import data from "../../api/notes.json"
import useActiveKey from "../../hooks/useActiveKey";
import useLocalStorage from "../../hooks/useLocalStorage";

const NotesApp = () => {
	/*const apiEndpoint = "http://my-json-server.typicode.com/andreachalmers/notes_/notes"
	const api = "http://localhost:3001/notes"
	const {notesArr, setNotesArr, isLoading} = useFetchData(apiEndpoint, [])*/
	//const [notesArr, setNotesArr] = useState(data.notes)
	const [notesArr, setNotesArr] = useLocalStorage('notes', data.notes)
	const [trash, setTrash] = useLocalStorage('trash', data.trash)
	//duplicated from main sidebar-- what is the best way to do this?
	const [isNotesActive, setIsNotesActive] = useState(true)
	const [isTrashActive, setIsTrashActive] = useState(false)
	const activeKey = useActiveKey(notesArr)
	const trashKey = useActiveKey(trash)
	const getDate = () => {
		const date = new Date(Date.now())
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const dateStr = new Date(Date(date.getFullYear(), date.getMonth(), date.getDate())).toLocaleDateString(undefined, options)
		let [hour, minute] = new Date().toLocaleTimeString(undefined).split(/:| /)
		return `${dateStr} at ${hour}:${minute}`
	}

	const handleAddNote = note => {
		if(isTrashActive)
			return
		const newList = [...notesArr]
		//todo: increment activeKey
		//todo:just make activeKey a state in this component
		if(notesArr.length) {
			newList[activeKey].active = false
		}

		newList[notesArr.length] = {
			"heading": "# A wonderful new note",
			"content": "",
			"id": notesArr.length,
			"active": true,
			"date": getDate(),
		}
		setNotesArr(newList)
		//setTest(newList)
	}

	const handleActive = (arr,i) => {
		let newArr = arr
		console.log(arr)
		newArr[i].active = true
		//when one is active make all others inactive/false
		newArr.map(item => {
			if(item !== arr[i]) {
				item.active = false
			}
		})

		//if(isNotesActive)
			setNotesArr([...notesArr],newArr)
		//if(isTrashActive)
			setTrash([...trash],newArr)
	}

	const handleRemoveNote = () => {
		if(notesArr.length) {
			const newList = notesArr.filter(item => item.active !== true)
			if(notesArr.length > 1)
				newList[newList.length - 1].active = true

			setNotesArr(newList)
		}
	}

	const handleDelete = (arr, key) => {
		let lastNote = arr.length - 1
		let newList
		let newTrash = trash

		if(isNotesActive) {
			//remove note with key from new notes arr list
			newList = notesArr.filter((item, i) => i !== key)

			//if active key deleted then make last note active
			if(arr[key].active === true) {
				if(arr.length > 1)
					newList[newList.length - 1].active = true;

				//remove active tag from note assigned to trash
				arr[key].active = false;
			}

			//add this note to the last index of trash arr
			newTrash[newTrash.length] = arr[key];
			setNotesArr(newList)
		}

		if(isTrashActive) {
			if(arr[key].active === true)
				console.log('yip')
			newTrash = trash.filter((item,i) => {
				if(i !== key)
					return item
			})

			//if active key deleted then make last note active
			if(arr[key].active === true && arr.length > 1) {
				newTrash[newTrash.length - 1].active = true;
			}
		}

		setTrash(newTrash)
	}


	const _renderNotesList = arr => {
		return (
			<ul>
				{
					arr?.map((item,i) => (
						<div key={i}>
							<ContextMenuTrigger id={i}>
								<ListItem
									key={item[i]}
									active={`${item.active ? 'active' : ''}`}
									onClick={() => handleActive(arr,i)}
									heading={item.heading}
									content={item.content}
								>
								</ListItem>
							</ContextMenuTrigger>
							<ContextMenu id={i} className="rc-menu">
								<MenuItem onClick={()=>handleDelete(arr,i)} className="rc-menu__btn">
									Delete
								</MenuItem>
								<MenuItem className="rc-menu__btn">
									Other Options
								</MenuItem>
							</ContextMenu>
						</div>
					)).reverse()
				}
			</ul>
		);
	}

	const handleUpdateNotes = (note, key) => {
		//put...
		const endOfHeading = note.search('\n')
		const heading = note.slice(0, endOfHeading + 1)
		const content = note.slice(endOfHeading + 1).trimStart()

		//console.log(heading, content)
		let newList = [...notesArr]
		newList[key] = {
			"heading": heading,
			"content": content,
			"active": true,
			"id": key,
			"date": newList[key].date
		}

		setNotesArr(newList)
	}

	const showNotes = () => {
		setIsTrashActive(false)
		setIsNotesActive(true)
	}
	const showTrash = value => {
		setIsNotesActive(false)
		setIsTrashActive(true)
	}
	return (
		<>
			<FlexWrapper>
				<MainNavbar
					showNotes={showNotes}
					showDeletedItems={showTrash}
					isNotesActive={isNotesActive}
					isTrashActive={isTrashActive}
				/>
				{/* TESTING: <p style={{color: 'deeppink'}}>{activeKey}</p>*/}
				<Sidebar addNote={handleAddNote} isTrashActive={isTrashActive}>
					{_renderNotesList(isNotesActive ? notesArr : trash)}
				</Sidebar>
				<NoteWrapper
					activeNote={isNotesActive ? notesArr[activeKey] : trash[trashKey]}
					activeKey={activeKey}
					updateNotes={handleUpdateNotes}
				/>
			</FlexWrapper>
		</>
	)
}

export default NotesApp