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
	color: #fff;
	
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
		&:first-child {
			border-top: 0;
		}
		
		&.active {
			color: ${vars.cafe} !important;
			border-width: 1px 0;
			color: white;
			padding: 8px 4px;
			
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

	useEffect(() => {
		setTimeout(handleSave, 2000)
	}, [])

	const handleAddNote = note => {
		console.log(note)
	}

	const handleSave = () => {

	}

	return (
		<>
			<Header>
				<h1 className='heading'>Notes</h1>
				<AlignBtns>
					<Button icon='compose'/>
					<Button icon='trash alternate outline'/>
					<Button icon='save outline' onClick={handleSave}/>
				</AlignBtns>
			</Header>
			<Wrapper>
				<Sidebar>
					<List celled>
						{
							notesArr?.map((item,i) => (
								<List.Item key={item[i]} active={`${item.active ? 'active' : ''}`}>
									<List.Content>
										<List.Header>{item.heading}</List.Header>
										An excellent companion
									</List.Content>
								</List.Item>
							))
						}
					</List>
				</Sidebar>
				<Note addNote={handleAddNote}></Note>
				{/*<NoteArea>
				</NoteArea>*/}
			</Wrapper>
		</>
	)
}

export default NotesApp