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
			heading: 'Snickerdoodle',
			content: 'An excellent companion',
			active: false,
		},
		{
			heading: 'Lorem Ipsum',
			content: 'Hipster ipsum bacon coffee',
			active: true,
		}
	])
	const notesLength = notesArr.length

	useEffect(() => {
		setTimeout(handleSave, 2000)
	}, [])

	const handleAddNote = note => {
		console.log(note)
	}

	const handleSave = () => {

	}

	const handleActive = i => {
		let newArr = notesArr
		console.log(notesArr[i].active)
		if(notesArr[i].active) {
			newArr[i].active = false
		} else {
			newArr[i].active = true
		}

		//when one is active make all others inactive/false
		newArr.map(item => {
			if(item !== notesArr[i]) {
				item.active = false
			}

		})
		setNotesArr([...notesArr],newArr)
	}

	return (
		<>
			<Header>
				<h1 className='heading'>Notes</h1>
				<AlignBtns>
					<Button icon='compose' color="red"/>
					<Button icon='trash alternate outline'/>
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
				<Note addNote={handleAddNote} currentNote={notesArr[notesLength - 1]}></Note>
				{/*<NoteArea>
				</NoteArea>*/}
			</Wrapper>
		</>
	)
}

export default NotesApp