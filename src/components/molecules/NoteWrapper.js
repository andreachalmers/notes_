import React, { useEffect, useState, useCallback } from 'react';
import _ from "lodash";
import useObjToStr from "../../hooks/useStringify";
import ReactMarkdown from "react-markdown";
import {SVG, Note,TextArea2, Date, StickyBar} from "../atoms/atoms";

const NoteWrapper = ({children, activeNote, activeKey, updateNotes}) => {
	const currentNote = useObjToStr(activeNote)
	const [item, setItem] = useState(currentNote)
	const [isEditing, setIsEditing] = useState(false);
	const [debouncedState, setDebouncedState] = useState("");

	useEffect(() => {
		if(!isEditing)
			setItem(currentNote)
	}, [currentNote, isEditing]);

	useEffect(()=>{
		const stickyBar = document.querySelector('.sticky-bar')
		document.querySelector('.scroll').addEventListener('scroll', ()=> {
			stickyBar.classList.add('scrolling')
		})

		return () => stickyBar.classList.remove('scrolling')
	});

	const debounce = useCallback(
		_.debounce((input: string) => {
			setDebouncedState(input);
			updateNotes(input, activeKey)
		}, 1000),
		[updateNotes]
	);

	const handleChange = e => {
		const value = e.target.value
		setItem(value)
		debounce(value)
	}
	const handleOnMouseOut = () => {
		updateNotes(item,activeKey)
		setIsEditing(false)
	}

	const handleOnClick = () => {
		if(activeKey !== undefined)
		setIsEditing(true)
	}

	const _renderPlaceholder = () => {
		return (
			<SVG version="1.0" xmlns="http://www.w3.org/2000/svg" width="752" height="816" viewBox="0 0 564 612">
				<path d="M301 84c-2.3 4.4-2.4 5-1.1 5 1 0 5.1-6.5 5.1-8.1 0-2.2-2.1-.6-4 3.1zM311.2 90.8c-4.1 3.6-5.1 5.2-3.4 5.2 1.6 0 10.2-7.2 9.6-8.1-.8-1.4-1.7-1.1-6.2 2.9zM287.8 101c-2.4 1.6-5.3 3.9-6.3 5s-2.2 2-2.6 2c-.5 0-3.8-1.8-7.4-4-6.8-4.1-8.7-4.4-7.8-1.1.4 1.7.1 1.8-6.4.5-11-2.2-34.9-1.9-47 .5-17.1 3.5-31.1 9.3-43 17.7-6.4 4.6-13.3 11.8-13.3 14.1 0 1.6-.2 1.7 4.5-.7 6.2-3.2 7.1-2.4 2.8 2.2-5.5 6.1-9.9 12.7-13.8 21.1-5.2 10.9-9.3 28.7-6.6 28.7.4 0 2.5-2.9 4.6-6.4 3.8-6.5 14.3-18.9 17.5-20.6 1.6-.9 1.7-.6.9 2.8-1 4.4-1.2 10.2-.3 10.2.4 0 4.6-3.7 9.3-8.3 14.3-13.7 27.9-22 46.4-28.2 12.4-4.1 23.7-5.7 38.2-5.3 12.4.3 11.5-.6 10.2 10-.6 4.8-.5 5.8.8 5.8.8 0 1.5-.3 1.5-.8.1-.4 2.5-3.4 5.5-6.7l5.4-6 5.5 5.4c3.1 3 5.9 5.2 6.3 4.8.3-.4.1-4-.5-7.9-1.2-8.3-1.2-8.3 5.7-9.3 10.4-1.4 10.5-2.3.6-7.2-4.5-2.2-7.5-4.4-7.5-5.3 0-1.4 1.9-8.9 3.4-13.8 1-3.1-1-2.9-6.6.8zm1.8 7.8c-.9 3.3-1.6 6.5-1.6 7.1 0 .6 2.7 2.3 6 3.8s6 3.1 6 3.5c0 .4-2 1-4.5 1.3-6.6 1-7.6 2.2-6.5 7 1.9 7.9 1.4 8.3-3.8 3.2l-4.9-4.8-4.4 5.5c-4.7 5.9-6.4 6.9-5.6 3.3.3-1.2.9-4.5 1.3-7.3l.6-5.1-6.7-1.3c-3.6-.7-6.3-1.6-5.8-2 .4-.4 3.3-1.5 6.3-2.5s5.8-2.1 6.3-2.4c.4-.4-.6-3.5-2.3-6.9-1.6-3.4-3-6.4-3-6.7 0-.2 2.6 1.1 5.8 3 5.7 3.5 8.2 4.3 8.2 2.6 0-1 9.2-8.3 9.7-7.7.2.2-.3 3.1-1.1 6.4zm-30.3-2.8c3.7.9 6.1 2 6.8 3.2 1 1.8.7 1.8-5.8 1.1-13-1.5-37-.7-47.5 1.5-16.1 3.5-29.1 8.5-38 14.5-3.5 2.4-14.8 6.1-14.8 4.8.1-1.2 8.5-7.6 16.1-12.1 8.5-5.2 25.2-11.1 37.5-13.5 9.4-1.7 36.6-1.4 45.7.5zm1.7 6c5.8 1 10 3.3 8.5 4.8-.3.3-8.9.4-19.3.3-21.5-.2-32.6 1.1-47 5.8-22 7.2-39.6 20.5-52.4 39.6-6.2 9.2-6.7 8.7-1.8-2.2 6.7-14.7 20.1-29.6 32.9-36.2 11.2-5.8 27.1-10.5 41.6-12.4 6.6-.9 31.4-.6 37.5.3zm-2 6.9c2.5.7 2.5.7-.9 1.9-1.9.7-6.2 1.2-9.5 1.2-22.2 0-49 7.8-66.3 19.3-8.8 5.8-28.3 23.4-33 29.7-2 2.7-3.8 4.8-4 4.6-.6-.6 6.7-13 10.9-18.3 4.8-6.3 14.9-15.9 21.2-20.2 12.1-8.3 32.7-15.9 49.1-18 8.4-1 29-1.2 32.5-.2zm-5.5 5c.3.6 3.9 1.7 8 2.6 4.1 1 7.5 1.9 7.5 2.2 0 .3-3.3.2-7.3-.2-8.8-.8-25.2.9-36.2 3.6-19.4 4.9-37.5 15-53.2 29.7-6.8 6.2-7.4 6-5.2-2.3 1.3-4.7 5.2-9.1 13.4-15 15.9-11.4 36.8-18.6 59-20.4 5.5-.5 10.8-.9 11.7-1 .9 0 1.9.3 2.3.8z"/>
				<path d="M276 114.4c0 .7.7 1.9 1.5 2.6 2.1 1.7 1.9 2.8-.7 3.2-1.2.2-2.3.9-2.6 1.7-.3 1 .3 1.2 2.6.6 2.6-.5 3.1-.3 3.4 1.6.2 1.2.9 2.4 1.7 2.7 1 .3 1.2-.3.9-2.7-.4-3.1-.4-3.1 2.9-2.5 4.2.8 4.4-1 .2-2.5-2.7-.9-2.9-1.3-1.9-3.2 1.7-3 .2-3.8-1.9-1l-1.9 2.4-1.1-2.1c-1.3-2.5-3.1-2.9-3.1-.8zM313.7 102.7c-1.4 1.4-.6 2.3 2.1 2.3 3.7 0 7.2-1 7.2-2.1 0-1-8.3-1.2-9.3-.2zM352 120.5c0 8.3-3.9 14.1-10.2 15.4-4.4.9-4.2 2.4.4 3.2 6.5 1 8.8 4.2 9.7 13.3.8 7.5 3.1 9 3.1 1.9 0-5.6 2.9-12.7 5.8-14.2 1.2-.6 3.5-1.1 5.2-1.1 4.4 0 3.4-2.3-1.3-3.1-6.6-1.1-9.7-6.1-9.7-15.7 0-3.1-.4-4.2-1.5-4.2s-1.5 1.2-1.5 4.5zm6.6 16c1 .8.5 1.8-2.2 4.9-1.9 2.2-3.4 3.4-3.4 2.8 0-.6-1.3-2.4-3-4-2.6-2.6-2.8-3.1-1.4-4.3.8-.7 2.2-2.6 3.1-4.2l1.5-2.9 2 3.3c1.1 1.9 2.6 3.8 3.4 4.4zM231.2 157.2c.2 1.3 1 2.3 1.8 2.3s1.6-1 1.8-2.3c.3-1.7-.2-2.2-1.8-2.2s-2.1.5-1.8 2.2zM314 158.2c-3.2 1.4-7.6 2.2-14.8 2.7-10.3.6-10.4.6-13.6 4.2-1.8 1.9-4.1 5.7-5.1 8.4-1.8 4.7-1.8 4.8.1 8.4 1.4 2.6 3.1 4 6.4 5.2 2.5 1 7.2 3.3 10.4 5.3 8.2 5 13.7 5 19.8.1 2.4-1.9 6.6-4.6 9.4-6 5.9-2.9 7.9-5.9 7.1-10.7-.3-1.8-1-5.9-1.6-9-1.1-7-1.5-7.7-5.7-9.4-4.4-1.8-7-1.7-12.4.8zm6 1.4c0 3.5-4.6 5.5-7.9 3.5-1.1-.7-.7-1.3 2-2.4 3.6-1.6 5.9-2.1 5.9-1.1zm7 1.2c1.5 1.3 2.6 3.5 3.1 6.8.4 2.7 1.1 6.1 1.5 7.6.9 3.9-1.7 7.5-7.3 9.9-2.5 1.1-6.1 3.3-8 4.9-6.1 5.4-9.7 5.2-20.1-1.1-3.6-2.1-7.2-3.9-8.1-3.9-2.6 0-6.1-4.2-6.1-7.3 0-4.1 4.4-11.3 8-13.2 4.4-2.3 16.1-2 20.7.5 2.1 1.1 4.3 2 4.9 2 2.1 0 6.4-4.1 6.4-6.1 0-2.4 2.1-2.4 5-.1z"/>
				<path d="M288.6 171.1c-3 3.6-3.1 3.8-1 6.7 2.2 3.1 7.4 3 11.3-.4 5.5-4.6 3.7-9.4-3.5-9.4-3.5 0-4.7.5-6.8 3.1zm11.1.5c.9 2.3-2.9 5.6-6.8 5.7-4 .2-5.1-2.3-2.3-5.4 2.1-2.4 8.2-2.6 9.1-.3zM319 170c-2.4 1.5-.7 1.9 2.5.5 2.3-1 2.5-1.4 1-1.4-1.1 0-2.7.3-3.5.9zM317.3 175c-5.8 3.5-3.4 8.8 3.3 7.7 6.1-1 9.3-5.4 6.2-8.5-1.8-1.8-5.9-1.4-9.5.8zm7.5 2.1c.4 2-5 4.4-7.5 3.4-1.6-.6-1.5-.9 1.1-3.1 3.1-2.7 5.9-2.8 6.4-.3z"/>
				<path d="M310.6 179.3c-1.3 2.7.9 6.7 3.6 6.7h2.2l-2.1-1.5c-1.2-.8-2.3-2.8-2.5-4.3-.4-2.3-.5-2.4-1.2-.9zM300 180.5c-1.4.7-3.4 1.7-4.5 2.1-1.7.6-1.8.8-.3 1.1 1.8.4 7.2-2 8.3-3.7.9-1.4-.5-1.2-3.5.5zM108.7 159.7c-.4.3-.7 2.2-.7 4 0 6.6-4 11.3-9.4 11.3-1.6 0-2.6.6-2.6 1.5s.9 1.5 2.5 1.5c1.4 0 3.9 1.3 5.6 2.8 2.4 2.1 3.2 3.8 3.6 7.5.6 5 3.3 6.8 3.3 2.2 0-6.3 4.9-12.5 9.8-12.5 2.8 0 2.5-2.3-.4-2.8-5.5-.9-9.4-6.3-9.4-13.2 0-2.9-.9-3.8-2.3-2.3zm3.8 20.3l-3 3.5-1.7-2.6c-.9-1.5-2.1-3-2.7-3.4-.8-.4-.2-1.8 1.6-3.9l2.8-3.2 3 3.1 3 3-3 3.5zM412 164c-2.5 2.5-2.5 3.2-.2 6 2.5 3.1 6.9 2.1 7.8-1.7.5-2 .2-3.1-1.6-4.5-2.8-2.3-3.5-2.3-6 .2zm5.5 3c0 .8-1 1.6-2.2 1.8-2.2.3-3.2-1.6-1.6-3.2 1.2-1.1 3.8-.2 3.8 1.4zM375.4 165.5c-.9 2.3.3 4.5 2.5 4.5 2.3 0 3.5-2.8 2-4.6-1.5-1.8-3.8-1.8-4.5.1zM231.3 169.6c-.8 2.1 1.3 4.2 2.8 2.7 1.3-1.3.5-4.3-1.1-4.3-.6 0-1.3.7-1.7 1.6zM213.7 174.7c-1.4 1.3-.7 4.3 1.2 5.3 2.3 1.2 5.6-1.4 4.7-3.7-.3-.8-.6-1.7-.6-1.9 0-.7-4.6-.5-5.3.3zm3.3 2.3c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zM158.5 186c-.4.7 0 1.9.9 2.8 1.5 1.5 1.8 1.5 2.6.2.5-.8.8-2 .7-2.5-.5-1.5-3.4-1.8-4.2-.5zM394.8 187.5c-3.4 1.9-4.8 4.4-4.8 8.5 0 4.2 1.5 6.7 5 8.5 6.5 3.4 14 .4 15.7-6.3 1.9-7.8-8.6-14.8-15.9-10.7zm11.3 4.5c3.5 3.4 3.3 6.1-.7 9.7-3.3 3-6.5 2.9-10.3-.3-3.7-3.1-4-6.8-.9-10.1 3.2-3.4 8.2-3.1 11.9.7zM364.2 192.7c.5 2.6 3.8 2.9 3.8.4 0-1.5-.6-2.1-2.1-2.1-1.4 0-1.9.5-1.7 1.7zM456 194.9c0 3.4-2.3 6.1-5.1 6.1-2.9 0-2.3 1.3 1.4 3 2.5 1.2 3.3 2.2 3.5 4.7.4 4.4 1.8 4.2 2.6-.3.6-2.7 1.4-3.8 3.7-4.6 3.3-1.1 3.9-2.8 1-2.8-2.4 0-3.9-1.9-4.7-5.8-.8-4-2.4-4.2-2.4-.3zM251.2 197.3c-2.6 2.7-2.9 6.9-.6 8.8 2.1 1.7 8.1 1.7 9.8-.2.8-.7 1.8-2.6 2.1-4.1 1.4-5.8-7-9.1-11.3-4.5zm8.2 1.9c1.5 2.5-.4 5.2-3.9 5.6-2.5.3-4.4-1-4.5-3.1 0-1.5 4.2-4.8 5.7-4.5.9.2 2.1 1.1 2.7 2zM210.3 205.6c-.8 2.1 1.3 4.2 2.8 2.7 1.3-1.3.5-4.3-1.1-4.3-.6 0-1.3.7-1.7 1.6zM274.6 205.6c-3.4 3.4-.9 7.8 4.1 7.2 3.8-.4 4.5-4.9 1.1-7.2-2.8-2-3.3-2-5.2 0zm5.2 3.1c.5 1.7-2.6 2.9-4 1.5-.6-.6-.7-1.5-.3-2.2.9-1.4 3.7-.9 4.3.7zM133.9 211c-.6 1.6-1.7 3-2.5 3-2.9 0-11.7 5.2-15.8 9.4-2.3 2.3-5.1 6.1-6.2 8.4-1.4 3-2.5 4.2-4.1 4.2-3 0-5.3 3.6-5.3 8.2 0 3.1.5 4.1 2.5 5 1.7.8 2.6 2.2 3 4.7 3.1 18.9 18.2 31 37.3 29.9 16.5-1 30.6-12.2 32.9-26.1.4-2.5 1.4-4.4 3-5.4 2-1.4 2.4-2.3 2.1-6.2-.3-3.8-.7-4.7-2.5-4.9-1.6-.2-2.5-1.6-3.8-5.5-3.4-10.8-12.3-19.6-22-21.8-4-.9-5.6-1.8-6.4-3.5-.9-2.1-1.8-2.4-6.1-2.4-4.8 0-5.2.2-6.1 3zm10.1-.1c0 1-6.9 2.5-7.7 1.7-.3-.2-.2-.9.2-1.5.8-1.3 7.5-1.5 7.5-.2zm12 6.6c6.5 3.4 10.7 7.4 14 13.7 3.1 5.7 3.5 7.3 3.8 16.1.4 9.3.3 10.1-2.7 16.2-3.6 7.3-8.2 11.7-16.1 15.4-4.6 2.1-7 2.6-14.5 2.6-7.9 0-9.6-.3-14-2.7-8.1-4.3-15.2-12.6-17.6-20.7-1.1-3.6-1-4.4.2-5.2 1.1-.8 1-1.3-1.1-3.2-2.2-1.9-2.5-2.9-2.2-6.9.4-4.2.7-4.7 3-5 2.2-.2 2.7-.8 2.7-3 .1-5.4 9.9-14.8 18.7-18 6.8-2.4 20.6-2.1 25.8.7zm-52.9 26.2c-.8 1.5-1 1.5-1.1.2 0-1.7 1-3.2 1.8-2.5.2.3-.1 1.3-.7 2.3zm75.9 3.4c0 1.6-.4 2.9-.9 2.9-.9 0-2.1-5.7-1.3-6.5 1.1-1 2.2.8 2.2 3.6z"/>
				<path d="M134.3 220c-1.3.5-2.3 1.4-2.3 2 0 .7.6.8 1.9 0 1.1-.5 2.9-1 4-1 1.2 0 2.1-.5 2.1-1 0-1.2-2.7-1.2-5.7 0zM138.8 221.7c-1 .2-1.8.9-1.8 1.5 0 .5.7.7 1.6.4.9-.3 2.2-.6 3-.6.8 0 1.4-.5 1.4-1 0-1-1.2-1.1-4.2-.3zM148.4 222.9c-1 1.2-2.5 2.1-3.2 2.1-.8 0-1.2.6-.9 1.2.2.7 1.1 1.2 1.9 1 .8-.1 2.8.5 4.4 1.3 1.6.8 3.5 1.5 4.2 1.5.6 0 1.2.7 1.2 1.5 0 3.2 1.9 1.3 2.5-2.6.8-4.8-.4-6.5-5.2-7.5-2.4-.5-3.5-.2-4.9 1.5zm6.1 1.3c4.2 1.9 2.2 4.4-2.2 2.7-2.3-.8-2.9-2-1.6-3.2.8-.9.8-.9 3.8.5zM127.3 227.8c-8.2.6-11.1 9.5-5.3 15.9 3.6 4 4.4 4.1 3.6.7-.6-2.3-.4-2.5 1.5-1.9 1.8.6 2 .4 1.5-1.3-1-3 .4-7.2 2.3-7.2.9 0 2.3-.5 3.1-1.1 1.2-.8.8-.9-1.4-.7-1.7.2-3.1-.2-3.3-1-.3-.6.2-1.2 1.1-1.2 1.6 0 3.1-1.7 1.9-2.2-.5-.2-2.7-.2-5 0zm-.3 5.3c0 2.6-2.7 7.9-4.1 7.9-2.7 0-2.2-6.5.7-9.4 1.9-1.9 3.4-1.2 3.4 1.5zM158.7 235.7c-1.2 1.2-.7 5 .8 6.3 1.2 1 1.8 1 3 0 2-1.7 1.9-3.3-.3-5.3-2-1.9-2.6-2-3.5-1zM166.3 237.1c.4 1.3.7 3.2.7 4.2 0 1.1.5 1.5 1.1 1.1.8-.4.9 0 .4 1.5-.4 1.2-.2 2.1.4 2.1.6 0 1.1-1.1 1.1-2.5s-.4-2.5-1-2.5c-.5 0-1-1.1-1-2.4 0-1.4-.5-2.8-1.2-3.2-.8-.5-.9 0-.5 1.7zM143.1 241.6c-1.3 1.3-2.1 2.8-1.7 3.1.9.9 4.9-3.2 4.5-4.6-.2-.5-1.5.1-2.8 1.5zM147.6 240.6c-.9 2.3-.7 3.6.3 3 1.2-.8 2.1-4.6 1.1-4.6-.4 0-1.1.7-1.4 1.6zM111 243.8c0 1 2.1 3.2 3.2 3.2 1.6 0 .8-1.9-1.2-3-1.1-.6-2-.7-2-.2zM108 245.5c0 .2 1.1 2.1 2.5 4.1 1.8 2.7 2.5 3.2 2.5 1.8 0-2.2-2.7-6.4-4.1-6.4-.5 0-.9.2-.9.5zM154.8 255.2c-.2 2.6-.8 3.4-2.6 3.6-1.9.3-2.1.6-1.1 1.8.9 1.2.6 1.4-2 1.4-1.7 0-3.1.4-3.1 1 0 .5 1 1 2.2 1 1.2 0 2.9.7 3.9 1.5 3.5 3.3 11.9-2.3 10.4-7-.4-1.1-.7-2.8-.6-3.8 0-2.4-2-2.2-2.6.3-.7 2.8-2.3 2.5-2.3-.5 0-3.7-1.8-3-2.2.7zm5.2 5.1c0 1.9-2.1 3.7-4.2 3.7-2.3 0-2.3-2.6 0-3.9 2.4-1.4 4.2-1.3 4.2.2zM119.5 257.4c-1.5 2.2-1.5 2.7-.1 5.5 2.6 4.9 8 5.2 9.2.6.6-2.3-1-6.4-3-7.7-2.1-1.4-4.6-.8-6.1 1.6zm6.6 2.7c.8 1.6.8 2.4 0 3.2-1.6 1.6-4.5-.3-4.9-3.2-.5-2.9 3.3-2.9 4.9 0zM115.6 266.9c-.7 1 3.2 4.7 4 3.8.3-.3-.4-1.5-1.5-2.6s-2.3-1.7-2.5-1.2zM129.4 268.4c-.9 2.3-.1 4.8 1.8 6 1.4.8 2.2.6 3.9-1 1.7-1.8 1.9-2.5 1-4.3-1.3-2.4-5.9-2.9-6.7-.7zm4.6 2.7c0 .5-.7.9-1.5.9-1.5 0-2-1.2-.9-2.3.8-.8 2.4.1 2.4 1.4zM147.8 273.7c-1 .2-1.8.9-1.8 1.4 0 1.1 3.9.2 5.5-1.2.9-.9-.6-1-3.7-.2zM152 275.5c-2.4 1.4-2.4 1.4-.3 1.5 1.2 0 2.5-.5 2.8-1.1 1.1-1.7.2-1.8-2.5-.4zM333.7 211.7c-1.4 1.3-.6 3.3 1.3 3.3 1.3 0 2-.7 2-2 0-1.9-2-2.7-3.3-1.3zM410.5 216.3c-5.4 1.8-9.3 3.9-13.7 7.5l-3.7 2.9-9.8-2.3c-11.6-2.8-22.8-3.2-26.1-.8-7.9 5.5-3.3 13.6 14.2 25.1 5.5 3.7 10.2 6.7 10.3 6.8.1 0 .9 3.3 1.7 7.2 2.6 12.8 9.1 20.8 21.5 26.7 6.2 2.9 7.2 3.1 18.1 3.1 12.5-.1 16.2-1.2 24.3-7.3 3.9-2.8 3.9-2.8 10-1.5 3.4.8 11.4 1.7 17.8 2 9.5.5 12 .3 14.7-1.1 9.4-4.8 2.1-16.1-17.7-27.4-5.1-2.8-9.6-5.2-10.1-5.2-.6 0-1.2-1-1.4-2.3-2.2-11.3-3.1-14.3-5.9-18.4-6.6-9.9-17.6-15.4-31.7-15.9-5.3-.3-10 .1-12.5.9zm5 3c-4.7 3.5-10.1 8.6-9 8.7.6 0 4.1-2.5 7.8-5.5 3.8-3 7.8-5.5 9-5.5 2.1.1 2 .2-.8 2.8-1.7 1.5-4.3 3.7-5.9 5-1.6 1.2-2.6 2.5-2.3 2.9.4.3 3.5-1.7 6.9-4.6 6-4.9 9-6.1 10.2-4.2.3.5-1.9 2.8-4.9 5.1-4.7 3.6-6.7 6-5.1 6 .3 0 3.2-2.3 6.5-5 5.4-4.5 10.1-6.4 10.1-4.2 0 .5-2.7 3-6.1 5.6-8.3 6.5-6.7 7.1 1.9.7 4.5-3.3 7.6-4.9 8.6-4.5.9.3 1.6.9 1.6 1.3 0 .3-2.7 2.6-6 5s-6 4.7-6 5.3c0 .8 4.4-2 11.1-7.2 2.4-1.8 2.8-1.8 4-.4.8 1 .9 1.8.2 2.2-.5.4-3.3 2.2-6.1 4.1-2.9 1.8-5.2 3.7-5.2 4.2 0 1.4.5 1.2 7.3-3.6 5.4-3.8 6.7-4.3 7.6-3.1 1 1.2-.1 2.2-6 5.7-4 2.4-6.7 4.5-6 4.7.6.2 4-1.5 7.6-3.7 3.6-2.3 6.7-3.6 7-3.1 1 1.6-.1 2.6-6 6-3 1.7-5.5 3.6-5.5 4.1 0 1 3.6-.7 8.5-4 3.5-2.4 5.5-2.7 5.5-.8 0 .7-2.7 2.6-6 4.2s-6 3.2-6 3.7c0 1.3 1.2.9 6.9-2.2 6.4-3.5 6.1-3.5 6.1-1.3 0 1.1-2 2.9-5.1 4.6-2.8 1.6-4.9 3.1-4.6 3.4.3.3 2.7-.6 5.3-2.1 5.4-3 5.4-3 5.4-1.2 0 .8-2.1 2.7-4.7 4.2s-4.2 2.9-3.5 3.2c.6.2 2.6-.6 4.2-1.8 1.7-1.2 3.4-2 3.7-1.7 1.2 1.3-.8 3.7-4.9 5.8-2.4 1.2-3.7 2.4-3 2.6.7.3 2.8-.5 4.8-1.6 3.2-1.9 3.5-1.9 3.2-.4-.2 1-1.8 2.7-3.5 3.8-3.3 2-4.5 4.2-1.8 3.1.8-.3 2.2-.9 3-1.2 2.6-1.1 1.6 1.6-1 2.8-3 1.4-3.4 3.2-.4 2.3 1.8-.6 1.9-.5 1 1.3l-1.1 2.1-7.3-2c-28.2-7.6-60.7-21.4-60.7-25.7 0-4 5.9-13.9 11-18.5 2.9-2.6 5.7-4.7 6.3-4.7.6 0-.4 1.3-2.3 3-1.9 1.6-3 2.9-2.5 3 .6 0 3.7-2.2 6.9-4.9 5.1-4.4 7.1-5.3 12.1-5.9.6-.1-.3.9-2 2.1zm-31.9 7.3c8.1 2 8 1.9 6.5 3.8-.9 1.1-3.2 1.4-8.8 1.3-6.2-.1-7.7.1-8.8 1.7-3.9 5.3 7.4 14.4 30.9 24.8 21.1 9.4 53.3 18.8 63.9 18.8 1.9 0 4.5-.8 5.7-1.8l2.3-1.9-2.2-3.9c-1.2-2.2-4.6-5.7-7.5-7.8-4-2.8-5.2-4.3-4.9-5.7.5-1.7 1.1-1.6 7.1 1.7 9.1 4.8 18.6 11.8 21.1 15.3 2.4 3.3 2.7 7.3.9 8.9-5.7 4.6-32.4 1.1-59.8-7.9-28.4-9.4-57.1-24.4-69.4-36.4-5.6-5.4-6.2-9.5-1.8-12 3.3-1.9 14.5-1.4 24.8 1.1zm3.1 8.6c-.2.7-1 3.1-1.8 5.3-.7 2.2-1.4 4.2-1.6 4.4-.5.7-7.3-5-8.3-7-1.7-3.1-.4-3.9 6.2-3.9 4.4 0 5.9.3 5.5 1.2zM401 265c12.8 5.9 41 16 44.5 16 3.2 0 .8 2.5-5.3 5.7-18.4 9.4-42.7 2.3-51.2-15-3.6-7.3-5.1-14.4-2.9-13.4.8.3 7.5 3.3 14.9 6.7zm68.1 2.8c3.5 3.9 3.7 6.2.7 6.3-4.3.3-11.3-.3-12-.9-.4-.4 0-3.3.9-6.4l1.6-5.7 3 1.7c1.6.9 4.2 3.2 5.8 5z"/>
				<path d="M361.2 227.2c-.7.7-1.2 2.2-1.2 3.4 0 2.5 3.5 7.3 4.5 6.2.4-.4-.2-1.7-1.4-2.9-2.5-2.7-2.6-3.7-.4-6.1 1.8-2 .4-2.5-1.5-.6zM368 228.8c-1.5 1.2-2 2.3-1.5 3.2.6 1 1 .8 1.6-.8.7-1.9 1.6-2.2 7.1-2.3 4.5 0 5.7-.3 4.3-.9-3.5-1.5-9.2-1.1-11.5.8zM370.5 243.5c3.9 3.2 5.8 3.2 2.2 0-1.5-1.4-3.3-2.5-4-2.5-.7.1.2 1.2 1.8 2.5zM469 260.6c0 .4 2 2.4 4.5 4.6 5.7 5 6.7 8.4 3.4 10.9-1.9 1.5-2 1.9-.7 1.9 2.2 0 4.8-2.7 4.8-5.1 0-1.1-1.9-4-4.2-6.5-4-4.4-7.8-7.2-7.8-5.8zM484 271.9c0 .6.5 1.3 1 1.6 2.2 1.4 1 4.6-2.2 6-3.2 1.4-3.2 1.4-.7 1.5 1.4 0 3.4-.9 4.4-2 1.5-1.7 1.6-2.4.5-5-1.2-2.8-3-4.1-3-2.1zM437 273.8c0 .5 3.5 1.9 7.8 3.1 8.5 2.3 10.2 2.5 10.2 1.3 0-.4-3-1.5-6.8-2.4-3.7-.9-7.7-2-8.9-2.4-1.3-.3-2.3-.2-2.3.4zM324.4 218.5c-.8 2.1.2 4.5 1.9 4.5.8 0 2-.7 2.7-1.5 1-1.2 1-1.8 0-3-.7-.8-1.9-1.5-2.7-1.5-.7 0-1.6.7-1.9 1.5zM205 222.5c0 2.8-3.2 6.5-5.5 6.5-.8 0-1.5.4-1.5 1 0 .5.9 1 1.9 1 2.4 0 5.1 3.6 5.1 6.7 0 3.4 1.7 2.8 2.4-.9.8-3.9 2.3-5.8 4.7-5.8 2.9 0 2.3-1.7-1-2.8-2.3-.8-3.1-1.9-3.7-4.6-.7-4.1-2.4-4.8-2.4-1.1zM237 229.3c0 .1-.2 5.5-.5 12-.2 6.4-.7 12.2-1 12.7-.4.7-1.3.7-2.5 0-1-.5-3.4-1-5.2-1-3.7 0-18.8 3.2-18.8 4 0 .3 2.9 2 6.4 3.8 3.5 1.8 7.1 4.1 8 5.1 1.6 1.7 1.4 1.8-4.4 2.4-6.2.5-12.3 3.3-12.8 5.8-.1.9 1.4 1.9 4.5 2.9 4.4 1.4 7.1 4 4.1 4-4.3 0-12.6 3.7-18.5 8.2-3.7 2.7-7.8 5.5-9 6.1-1.3.6-2.2 1.5-2 2.1.4 1.5 12.4 5.5 16.5 5.6 3.6 0 4.2 1.4 1.2 3-1.7.9-7 8.7-7 10.3 0 .4 1.5.7 3.3.7 4.3 0 12.7 2.3 12.8 3.5.1 1-4.6 3.8-9.2 5.4-1.6.5-2.9 1.5-2.9 2.1 0 1.5 4.4 3 8.6 3 2 0 3.4.3 3.2.7-4.2 8.2-5.1 11.3-5.1 16.8.1 10.1 2.2 15.8 4 10.7 1.3-3.6 5.5-8.3 9.3-10.2 5.8-3 6.6-2.7 6.2 2-.4 3.6 1.3 10 2.5 10 .3 0 1.9-1.5 3.6-3.3l3.2-3.2.3 3c.2 1.6 1.2 6.3 2.3 10.3 1.6 5.7 1.8 8 1 10.3-1.4 4.1.1 4.5 6.3 1.5 6.3-3.1 8.8-5.6 12-12.2l2.5-4.9 1.7 4.2c.9 2.4 2.1 4.3 2.5 4.3.4 0 1.9-1.4 3.2-3.1l2.4-3.1.8 4.8c.4 2.7 1.3 6 2 7.4 1.9 3.7 6.4 7.5 7.4 6.4 2.1-2.2 8.1-14.8 8.1-17 0-1.3.3-2.4.6-2.4s4.3 1.8 8.9 4c4.6 2.2 8.6 4 8.9 4 1.4 0 .4-6-1.9-10.8-3.8-8.2-3.6-8.4 4.9-5.6 4 1.4 8.8 3.6 10.7 5 3 2.2 3.4 2.2 4.2.8 1.5-2.7.2-13.6-2.2-18.2L320 339h2.7c4.3 0 5.7-1.3 4.4-3.8-.6-1.1-1.1-2.3-1.1-2.5 0-.3 2.8-.8 6.3-1.2 6.3-.7 14.7-3.7 14.7-5.2 0-1.4-11.2-11.9-14.9-14.2l-3.5-2 2.8-1.1c1.5-.5 4.1-1 5.7-1 1.8 0 2.9-.5 2.9-1.4 0-1.4-6.2-7.5-9.5-9.3-1.5-.9-1.5-1.2 1-3.9s8.5-12.1 8.5-13.5c0-.3-4.1-.3-9.1-.1l-9.1.5 4.1-5.4c4.8-6.3 10.8-20.9 8.7-20.9-.3 0-1.7.5-3.2 1-1.5.6-6 1.5-9.8 2-3.9.5-8.6 1.2-10.3 1.6l-3.3.6v-6.6c0-3.6-.2-6.6-.4-6.6s-2.7 1.6-5.6 3.5c-2.9 1.9-5.6 3.5-6 3.5-.5 0-.4-1.5.1-3.2 1.1-4.1 1.2-15.8 0-17.7-.7-1.1-1.6-.6-4.1 2.3-1.8 2-5.4 4.8-7.9 6.3-2.5 1.4-6.6 3.9-9 5.6l-4.4 3 .5-5.7c.3-3.1.2-5.9-.1-6.1-1.2-.7-6.8 2.3-10.4 5.5l-3.7 3.2-1.1-2.9c-1.4-3.8-5.6-8.1-10.2-10.4-3.9-2.1-8.7-4-8.7-3.6zm9.4 6.6c4.6 2.9 7.8 7.8 8.2 12.5 1.3 15.1 1.3 14.4-1.7 15.5-4.4 1.5-5.4-.4-6.8-14.6-.5-5-1.7-10.5-2.6-12.2-1.8-3.6-1.4-3.8 2.9-1.2zm-4.4 1c.5 1.1 1.6 6.9 2.4 13 .8 6.1 2 12 2.6 13.2 1.4 2.5.1 4.3-2.5 3.7-2.9-.5-5.7-5.2-6.3-10.3-.4-4 1.5-21.5 2.4-21.5.2 0 .8.9 1.4 1.9zm49.9 3.2c-.6 1.2-3.8 5.1-7 8.6-3.4 3.6-6.2 7.6-6.6 9.3-.5 2.6-1 3-3.9 3-3.2 0-3.4-.2-3.4-3.5 0-4.6 4.6-9.8 12-13.5 3.1-1.6 6.2-3.5 6.9-4.4 2-2.3 3.4-1.9 2 .5zm2.1 8.3c-.8 3.9-2 6.2-4.5 8.6-1.9 1.9-3.5 4-3.5 4.8 0 1.1-.8 1.3-3.2.8-1.7-.3-3.3-.8-3.5-1-1.3-1.2 1.7-6.3 7.2-12.4 3.5-3.9 6.7-8.1 7.1-9.4.8-2.3.9-2.2 1.2.5.2 1.5-.2 5.1-.8 8.1zm-24.8-1.2c.1 5.9-.1 13.1-.5 13.4-.1.1-2.8.5-5.9.9l-5.7.7-.6-3.6c-.8-4.1.4-7.9 3.8-11.7 2.4-2.7 6.7-5.9 7.9-5.9.5 0 .9 2.8 1 6.2zm34.8 13.7c-1.1 1.4-2.8 4.2-3.6 6.2l-1.6 3.6-5.9-3.5c-3.2-1.9-5.9-3.8-5.9-4.2 0-2.1 4.2-5.5 11-8.8l7.5-3.7.3 3.9c.2 2.9-.2 4.7-1.8 6.5zm-71.5-4.5c2 .9 4 2.8 5.1 4.8.9 1.8 2.5 4.2 3.5 5.4 1.9 2 1.9 2.1-2.4 5.1l-4.3 3.1-6.3-6.8c-3.4-3.7-7.6-7.4-9.2-8-4-1.7-3.7-2.5 1.4-3.7 6.1-1.5 8.3-1.5 12.2.1zm92 3.6c-1.1.5-5.3 2-9.2 3.5-6.7 2.5-12.3 6.8-12.3 9.6 0 .5-.4.9-1 .9-1.3 0-1.3-4.3.1-7.3 1.4-3.2 4.1-4.6 11.3-6.2 7.2-1.6 14.3-1.9 11.1-.5zm5.6.9c-3.3 6.1-22.9 18.7-25.3 16.3-1.6-1.6.9-6.8 4.1-9.1 1.4-.9 6.2-3 10.6-4.5 4.4-1.5 8.4-3.2 9-3.7 1.6-1.6 2.6-1 1.6 1zm-47.6 4.3c10.2 2.5 20.5 11.3 25.1 21.3 4 8.7 5.8 19.4 4.5 26.8-2.3 13.2-12.1 26.6-23.4 32.2-2.9 1.4-8.9 3-13.5 3.7-19.8 2.9-37.7-5.3-46-21-18.4-34.9 13.7-72.9 53.3-63zm44.8 3.9c-4 6.9-11.7 11.9-18.4 11.9-3.4 0-2-1.4 4.5-4.8 3.5-1.8 8.1-4.8 10.2-6.7 4.9-4.3 6-4.4 3.7-.4zm-96.5 4.2l2.5 2.5-3.2 4.8c-1.7 2.6-3.1 5.2-3.1 5.8 0 .5-1.3-.2-2.8-1.7-1.5-1.5-3.3-2.7-3.8-2.7-.6 0-1.6-1.1-2.2-2.5-.6-1.3-2.8-3.3-4.8-4.3l-3.6-1.9 2.8-1.1c7.7-2.9 14.5-2.5 18.2 1.1zm105.1 9.3c.7.6-4.1 7.4-7.4 10.3-3.9 3.4-10.7 5.6-13.1 4.3-1.4-.8-3.4-5.3-6-13.4-.5-1.3.2-1.7 3.3-2 3.9-.4 22.5.2 23.2.8zM223.2 286c2 2.5 2.2 3.8.9 5.9-.6 1-1.3 1.1-2.9.2-3.2-1.7-9.3-1.3-19.1 1.3-5 1.4-9.1 2.2-9.1 1.8 0-1.4 11.1-8.7 15.8-10.5 5.9-2.2 12-1.6 14.4 1.3zm-1.5 8.3c1 1 1.3 2.5.9 4.3l-.6 2.9-12.8-.6c-7-.3-14-1.2-15.7-1.9l-3-1.2 6-1.3c3.3-.7 8.3-2 11-2.9 5.7-1.8 12.1-1.5 14.2.7zm107 5.2c6.5 2.7 9.4 6.5 5.1 6.5-1.3 0-3.6.7-5.3 1.6-2.7 1.5-12.7 4.6-13.1 4.1-.1-.1-.4-3-.7-6.4l-.5-6.2 4.1-.4c2.3-.2 4.8-.4 5.5-.5.7-.1 2.9.5 4.9 1.3zM219.4 303c2.4.9 2.6 1.5 2.6 6.5 0 4.6-.3 5.5-1.8 5.5-1 0-2.6.6-3.7 1.3-1.7 1.1-3.3 1.1-9.9-.3l-7.9-1.6 3.7-4.1c3.4-3.9 10.6-8.3 13.3-8.3.6 0 2.3.4 3.7 1zm109.9 10.3c1.8.8 5.5 3.5 8.2 6.2 5.8 5.4 5.1 5.5-7.4 1-5-1.8-8.8-2.6-11.8-2.3-3.5.2-4.3 0-4.3-1.3 0-4.2 8.8-6.3 15.3-3.6zm-105.7 7.2c.7 2.2 1.4 4.3 1.4 4.6 0 1-11.8 3.9-16 3.9-4.9 0-5.1-1.2-.5-2.9 1.9-.6 5.1-3.2 7.1-5.7 2.1-2.5 4.4-4.4 5.2-4.2.7.2 2 2.1 2.8 4.3zm111.3 3.2c4.3 1.7 6.9 3.3 6.3 3.7-1.7 1-14.7 2.3-19 1.9-3.7-.4-10.2-3.8-10.2-5.3 0-.5.3-1.6.7-2.5 1-2.7 12.9-1.4 22.2 2.2zm-18.5 5.3c3.3 1.7 6.6 3.9 7.3 5 1.3 1.9 1.2 2-3.1 2-3.3 0-4.6.4-4.6 1.4 0 .8.5 1.8 1 2.1 1.8 1.1 4.7 7.8 5.5 12.4l.7 4.4-3.9-3.9c-2.2-2.1-6-5.8-8.6-8.1-5.9-5.3-6.6-7.9-3.3-12.8 1.4-2.1 2.6-4.2 2.6-4.6 0-1.2-.3-1.3 6.4 2.1zm-88.6 1.5c1.5 3.3 1.5 3.5-.3 3.5-4.9 0-14.2 7.7-16.9 14l-1.5 3.5-.1-4.3c0-7.3 3.4-13.6 9.5-17.3 4.3-2.7 7.9-2.5 9.3.6zm4.2 6c2.2 2.7-.3 6.2-5.2 7.6-5.7 1.5-9.7 3.5-13.2 6.8l-2.9 2.6.7-2.9c1.4-5.8 7.6-12.1 14.1-14.4 4.2-1.5 5.1-1.4 6.5.3zm72.9 3.9c.7 1.2 4.6 5.3 8.7 9 7.3 6.6 9.5 9.8 5.3 7.5-1.2-.6-5.3-2.2-9.2-3.5-11.1-3.8-14.2-8.1-9.5-13.1 2.7-2.9 3.2-2.9 4.7.1zm-66.4 2.3l3.3 2.7-2.6 3.2c-1.5 1.8-4.4 4.4-6.5 5.8-4.4 3-5.4 2.1-4.4-4 .5-2.8 5-10 6.5-10.3.2-.1 1.8 1.1 3.7 2.6zm60.5 10c0 .8 1.1 4 2.5 7.3s2.5 6.4 2.5 6.9c0 1.8-11.5-3.4-15.2-7-2.8-2.6-3.8-4.4-3.8-6.6 0-2.7.7-3.5 5.2-6l5.2-3 1.8 3.6c1 1.9 1.8 4.1 1.8 4.8zm-51.6-4.1c2.9 2.8 1.4 15.9-2.7 23.9l-2 4-1.9-6.5c-2.6-8.9-2.8-16.8-.5-20.3 2-3 4.8-3.5 7.1-1.1zm10.2 5.1c.8 3.1-.3 8.9-2.6 13.4-1.8 3.3-9.9 11.4-10.7 10.5-.2-.1.9-3 2.4-6.2 2-4.4 2.8-8 3.1-14l.4-8.1 3.4 1c2.3.7 3.6 1.8 4 3.4zm27.8 10.9c.1 3.9-.5 6-2.7 9.3-1.6 2.4-3.1 4-3.5 3.6-.4-.3-.7-6.4-.7-13.5 0-12.2.1-12.9 2-13.2 1.6-.2 2.3.6 3.4 4.2.8 2.5 1.5 6.8 1.5 9.6zm-9.3-12.4c.5.9 1.3 26.8.9 26.8-1.4 0-3.4-5.1-4.4-11.4-.7-3.8-1.7-7.1-2.4-7.4-.6-.2-1.9 1.3-2.9 3.2-.9 2-1.9 3.6-2.2 3.6-1.4-.1-5.5-8.2-5.8-11.4l-.4-3.6h8.6c4.7 0 8.6.1 8.6.2z"/>
				<path d="M247.6 273.3c-6.2 3.3-12.5 10.2-15.2 16.5-2.6 6.2-1.4 6.8 1.5.7 3.2-6.8 11.6-15.3 17.1-17.4 7.4-2.7 7.8-3 5-3-1.4 0-5.2 1.4-8.4 3.2z"/>
				<path d="M247.3 278.9c-4.4 3.2-8.7 9.4-8 11.4.3.7.9.1 1.5-1.4 1.5-3.9 5.8-8.5 9.2-9.9 1.6-.7 3-1.6 3-2.1 0-1.5-1.6-1-5.7 2zM304.7 315c-1.2 8.9-10.9 21.1-19.2 24.1-3.8 1.4-4.9 3.5-1.2 2.3 6.7-2.1 16.6-11.5 19.7-18.7 2.2-5.2 3.2-10.5 2.1-11.1-.5-.3-1.1 1.2-1.4 3.4zM239.4 321.6c.7 2.9 6.2 9.4 7.9 9.4.5 0-.7-1.8-2.7-4s-3.6-4.7-3.6-5.4c0-.8-.5-1.8-1.1-2.2-.9-.5-1 .1-.5 2.2zM246.2 324.5c.3 1.8 5.4 6.2 6.2 5.4.3-.2-1.1-1.9-3.1-3.8-2.4-2.3-3.4-2.8-3.1-1.6z"/>
				<path d="M290.9 329.6c-1.8 1.9-4.4 3.7-5.6 4-2 .5-3.3 2.4-1.8 2.4 2.6 0 12.5-8.3 11.4-9.5-.3-.2-2.1 1.1-4 3.1zM81.6 274.4c-.8 4.8-2.7 7.1-6.8 8.1-3.3.8-3.7 2.5-.8 2.5 3.2 0 6.6 4.1 7.4 8.8.8 5.5 2.2 5.4 3-.3.8-4.7 4.2-8.5 7.7-8.5 2.9 0 2.3-1.7-.8-2.5-4.1-1-6.3-3.4-6.9-7.7-.9-5.4-2.1-5.6-2.8-.4zm3.2 7.6c1 1.7.9 2.5-.4 4.5l-1.6 2.5-2-2.5c-1.8-2.3-1.8-2.5-.1-4.4 2.3-2.5 2.6-2.5 4.1-.1zM356.6 274.7c-.5 1.1-.1 2.2.9 3 2.3 1.6 4.7.5 4.3-2.1-.4-2.7-4.3-3.4-5.2-.9zM455.9 289.3c-2 1.5-3.9 5.1-3.9 7.1 0 5.1 9.5 7.6 12.4 3.4 4.6-6.5-2.4-15.2-8.5-10.5zm7.5 3.9c1.2 2 .2 4.4-2.7 6.2-3.6 2.3-7.5-3.6-4.6-7 1.6-1.9 5.9-1.4 7.3.8zM145.6 303.3c-2.6 1.9-1.8 7.1 1.2 7.5 2.9.4 5.2-1.4 5.2-4.2 0-4.1-3.1-5.7-6.4-3.3zm4.1 4.1c-.8 1.9-3.7 2.1-3.7.3 0-.7.5-1.8 1.2-2.5 1.5-1.5 3.3.1 2.5 2.2zM407.2 309.7c.2 1 1 1.8 1.8 1.8s1.6-.8 1.8-1.8c.2-1.2-.3-1.7-1.8-1.7s-2 .5-1.8 1.7zM398.6 314.5c-2 2-1 4.5 1.9 4.5s3.9-2.5 1.9-4.5c-.9-.8-1.7-1.5-1.9-1.5-.2 0-1 .7-1.9 1.5zM473.7 318c-.4 1.9-1.7 3.5-3.8 4.6l-3.3 1.6 3.1 1.3c3.1 1.3 4.3 3.2 4.3 6.7 0 2.3 2.2 2 2.6-.4.5-3.9 1.7-5.8 4-6.4 3.2-.8 3-1.7-.4-3-2.1-.8-3.1-2-3.5-4.3-.8-3.9-2.3-4-3-.1zM424.7 317.6c-1.4 1.5-.6 3.4 1.4 3.4 1.4 0 1.9-.5 1.7-1.7-.3-1.8-2-2.7-3.1-1.7zM366.7 319.8c-2.2 2.4-2.1 4.5.3 6.7 4 3.7 10.1-.7 7.7-5.6-1.6-3.1-5.7-3.7-8-1.1zm6.1 2.8c.4 2.7-2 3.7-4.4 1.9-1.6-1.1-1.6-1.5-.5-2.9 1.9-2.2 4.5-1.6 4.9 1zM172.1 323.3c-1.4 1.7.3 4.1 2.3 3.4.9-.4 1.6-1.3 1.6-2.1 0-1.9-2.6-2.8-3.9-1.3zM96.7 328.7c-1.2 1.1-.8 4 .7 5.2 2.8 2.3 6.8-1.7 4.5-4.5-1.2-1.5-4.1-1.9-5.2-.7zm3.3 2.3c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zM170.4 332.4c-.9 2.4.4 4.8 2.3 4.4 1.2-.2 1.8-1.2 1.8-2.8 0-2.9-3.2-4.1-4.1-1.6zM408.8 335.7c-1 .2-1.8.9-1.8 1.4 0 1 2 1.1 7.3.3 2-.4 3.7-1.1 3.7-1.5 0-.9-6.1-1-9.2-.2zM425 335.9c0 1.4.9 1.8 6.3 2.5 6.4 1 6.1-.9-.3-2.3-6.2-1.3-6-1.3-6-.2zM393.8 339.7c-2.1.8-3.8 2.1-3.8 2.9 0 1 1.2.8 5-.8 2.8-1.1 5-2.5 5-2.9 0-1.3-1.9-1-6.2.8zM180.7 340.6c-1.4 1.4-.7 3.5 1.1 3.2.9-.2 1.7-1 1.7-1.7 0-1.6-1.8-2.5-2.8-1.5zM442 340.8c0 .7 8.2 5.2 9.5 5.2 1.6 0 0-2.3-2.7-4-3.4-2-6.8-2.6-6.8-1.2zM82.1 343.1c-2.2 2.4-2.8 7.7-1.1 10.8.5 1 2.2 2.4 3.9 3 4.3 1.9 8.6-.7 10.2-5.9 1.1-3.6 1-4.4-.8-6.8-2.8-3.7-9.2-4.3-12.2-1.1zm9.7 1.1c1.7 1.7 1.5 6.8-.5 9-.9 1-2.6 1.8-3.9 1.8-2.4 0-5.4-3.3-5.4-6 0-.9.7-2.6 1.6-3.8 1.7-2.4 6.2-3 8.2-1zM378.1 348.9c-4.9 4-3.5 5.7 1.6 1.8 2.3-1.8 4.2-3.5 4.3-4 0-1.5-2.6-.5-5.9 2.2zM133 349.7c-5.7 1.1-17.2 7.6-21.9 12.3-19.8 19.7-13.7 56.4 11.2 68.1 19.3 9 45 1.1 54.4-16.8 4.3-8.2 5.7-15 5.1-25.4-.4-6.9-1.2-10.1-3.5-15.1-3.8-8.1-11.5-15.8-20-20-5.5-2.7-7.8-3.2-14.6-3.4-4.5-.1-9.3 0-10.7.3zm6.6 5c-1.1 1.1-1.9-.6-1.1-2.4.8-1.7.8-1.7 1.2 0 .3 1 .2 2.1-.1 2.4zm4.4-2.2c0 .8-.4 1.5-1 1.5-.5 0-1-.7-1-1.5s.5-1.5 1-1.5c.6 0 1 .7 1 1.5zm3.5-.5c.3.5-.1 1-1 1s-1.3-.5-1-1c.3-.6.8-1 1-1 .2 0 .7.4 1 1zm-15.4 5.3c-.8.8-1.1.4-1.1-1.4 0-3.3 1.4-4.7 1.8-1.9.2 1.2-.1 2.7-.7 3.3zm4.9-3.9c0 .8-.4 1.8-1 2.1-.5.3-1-.3-1-1.4 0-1.2.5-2.1 1-2.1.6 0 1 .6 1 1.4zm-7.9 4.3c-.9 1.6-1 1.5-1.1-.8 0-1.4.3-2.9.8-3.3 1.2-1.2 1.4 2.2.3 4.1zm-3.1.3c0 1.6-.5 3-1 3-.6 0-.9-1.2-.6-2.8.5-3.3.5-3.2 1.1-3.2.3 0 .5 1.3.5 3zm36.3-.5c2 1.4 3.7 3 3.7 3.4 0 1.7-6.5 3.2-16.6 4-12.9 1.1-16.3 2.9-27.9 14.4-8.5 8.6-16.5 14.7-19 14.7-.8 0-1.1-1.7-.8-5.3.8-9.7 1.4-10.5 14.1-18.9 14-9.2 16-10.2 24.9-12.7 10-2.9 16.9-2.7 21.6.4zm-40.4 4.9c-.9.8-1 .5-.5-1.4.3-1.4.6-3.2.7-4 .1-.8.4-.2.6 1.4.3 1.6-.1 3.4-.8 4zm-2.8 1.9c-.8.8-1.1.2-1.1-1.9 0-4 1.4-5.4 1.8-1.9.2 1.5-.1 3.2-.7 3.8zm-2.9-.3c-.2 1.6-.6 3-.8 3-.2 0-.4-1.4-.4-3 0-1.7.4-3 .8-3 .5 0 .7 1.3.4 3zm58.8 7c0 1.6-7.2 4.8-13.6 5.9-3.2.5-11.3 1.3-17.9 1.6-6.6.4-13.5 1.1-15.4 1.6-1.9.4-3.7.6-4 .4-.7-.8 8.1-8.4 12.2-10.6 2.7-1.4 7.1-2.3 14.6-2.9 5.9-.5 12.3-1.5 14.2-2.3 3.3-1.5 3.5-1.5 6.7 1.9 1.7 1.8 3.2 3.8 3.2 4.4zm-62.9-1.7c-.8.8-1.1.4-1.1-1.4 0-3.3 1.4-4.7 1.8-1.9.2 1.2-.1 2.7-.7 3.3zm-2.8.7c-.3 1-1.1 2.5-1.9 3.1-1.7 1.4-1.8.8-.2-2.6 1.3-3 2.8-3.4 2.1-.5zm66.4 8.2c-.3.7-.5.2-.5-1.2s.2-1.9.5-1.3c.2.7.2 1.9 0 2.5zm-1.8-1c0 .7-.4 2.2-.9 3.3-.7 1.7-.9 1.5-.9-1.3-.1-1.7.4-3.2.9-3.2.6 0 1 .6.9 1.2zM171 380c0 1.6-.4 3-1 3-1.1 0-1.4-4.3-.3-5.3 1.1-1.2 1.3-.8 1.3 2.3zm-6.4 3.6c-.4 1.8-1.2 3.4-1.7 3.4-.6 0-.8-.8-.5-1.8.3-.9.8-3 1.2-4.7 1-4 1.8-1.3 1 3.1zm2.5.7c-1.3 1.3-1.4-.5-.3-4.3l.7-2.5.3 2.9c.2 1.6-.1 3.3-.7 3.9zm-5.5-.9c-.4 1.9-1.1 3.8-1.7 4.2-1 .6-.3-6 .8-7.9 1-1.8 1.5.4.9 3.7zm-10.6 1.5c-.6 2.3-1.5 4.1-2 4.1s-.5-1.4.1-3.3c.6-1.7 1.3-3.8 1.5-4.6.3-.8.7-1.1 1-.8.3.3 0 2.3-.6 4.6zm4.6-3.2c-.3 1-.8 3-1.2 4.5-.6 2.9-2.4 3.9-2.4 1.4 0-2.4 2.2-7.6 3.2-7.6.5 0 .7.8.4 1.7zm2.9 2c-.7 4-2.5 6.9-2.5 4.1 0-3.3 1.3-7.8 2.2-7.8.6 0 .7 1.5.3 3.7zm20.8-1.5c1.4 5-9.4 13.5-20 15.9-4.4 1-6.6.9-13.2-.5-4.9-1.1-9.4-1.5-11.8-1.1-5.5 1-11.5 4.8-14.7 9.3-3.4 5-6.5 7.8-9.4 8.7-1.9.6-2.5.1-4.1-3.6-2.1-4.6-1.9-5.9.6-5.9.8 0 5.2-2.2 9.7-5 11.6-7.1 15.2-8.2 28.8-8.5 6.5-.2 13.5-.9 15.5-1.6 5.8-1.8 12.6-5.4 14.7-7.8 2.4-2.7 3.2-2.6 3.9.1zm-43.8.5c-.3 1-.9 3-1.2 4.5-.5 2.4-2.3 4.1-2.3 2.2 0-2.1 2.5-8.4 3.3-8.4.5 0 .6.8.2 1.7zm3.1-.1c-.3.9-.9 2.7-1.2 4-.3 1.3-1 2.4-1.4 2.4-.4 0-.3-1.8.2-4 .6-2.2 1.5-4 2-4 .6 0 .7.7.4 1.6zm2.9 2c-.8 2-1.5 3.8-1.5 4 0 .2-.4.4-1 .4-.5 0-.7-.6-.5-1.3 1.9-5.4 2.6-6.7 3.5-6.7.6 0 .4 1.4-.5 3.6zm4.1-2c-.3.9-.9 2.7-1.2 4-.6 2.2-2.4 3.4-2.4 1.5 0-2 2.3-7.1 3.2-7.1.6 0 .7.7.4 1.6zm2.9.6c-.4 1.3-.9 3.1-1.1 4-1.1 3.7-2.1 1.6-1.2-2.2.6-2.2 1.5-4 2-4s.6 1 .3 2.2zm-20.8 4.3c-.8 2.1-1.9 4.1-2.5 4.3-1.1.3.7-6.1 2.5-9.1 1.3-2.2 1.3.9 0 4.8zm3.3-.6c-.6 2.3-1.5 4.1-2 4.1s-.5-1.4.1-3.3c.6-1.7 1.3-3.8 1.5-4.6.3-.8.7-1.1 1-.8.3.3 0 2.3-.6 4.6zm-6.3-1.5c-.3.8-.9 3.1-1.3 5-.3 2-1.1 3.6-1.6 3.6-.6 0-.8-.6-.5-1.4.3-.8.9-3.1 1.3-5 .3-2 1.1-3.6 1.6-3.6.6 0 .8.6.5 1.4zm-4.4 4.8c-1.5 5.4-2 6.4-2.7 5.7-.6-.7 2.6-10.9 3.5-10.9.4 0 .1 2.4-.8 5.2zm-3.5 1.8c-1.3 5.5-3.4 8.1-2.3 3 1-4.5 2.4-8.4 3-7.9.2.3-.1 2.5-.7 4.9zm62.1 4.6c-1.8 2.2-9.2 5.7-17.6 8.3-5 1.6-8.7 3.6-12.4 6.7-8 6.9-10.2 7.8-20.4 7.9-5.1.1-10 .7-11.4 1.4-2.1 1.2-2.6 1-4.9-1.3l-2.6-2.5 2.6-1c1.3-.5 5.1-3.9 8.3-7.6 3.2-3.6 7.1-7.3 8.6-8.1 3.4-1.7 11.3-1.8 19.1-.2 9.6 2 22.1-1.7 28.5-8.4l2.8-3 .3 3.2c.2 1.7-.2 3.8-.9 4.6zm-65.4-3.4c-1.1 4.8-2.5 8.2-3.1 7.5-.5-.5-.1-2.3 2.1-9.5.9-2.6 1.6-1 1 2zm-4.5 5.3c-.6 1.9-1.5 3.5-2 3.5-.8 0-.3-2.4 1.7-8 1.1-3.2 1.4 1.1.3 4.5zm-3.2.5c-.6 2.2-1.5 4-2 4-.6 0-.7-.8-.3-1.8.4-.9 1-2.7 1.2-4 .3-1.2.9-2.2 1.3-2.2s.3 1.8-.2 4zm72.2 6.2c0 .6-.7.5-1.5-.2s-1.5-1.7-1.5-2.2c0-.6.7-.5 1.5.2s1.5 1.7 1.5 2.2zm-3.3 5.3c-1 1.1-1.7.8-3.9-1.3-1.6-1.4-2.8-3-2.8-3.6 0-.5 1.4.3 3.2 2l3.1 2.9-2.3-3.5-2.3-3.5 3.1 2.9c2.4 2.2 2.8 3.1 1.9 4.1zm.8-4.5c1 1.1 1.6 2 1.3 2-.3 0-1.3-.9-2.3-2-1-1.1-1.6-2-1.3-2 .3 0 1.3.9 2.3 2zm-7 3c1.6 1.6 2.6 3.3 2.2 3.6-.8.9-2.3-.2-4.7-3.6-2.8-3.9-1.2-3.9 2.5 0zm-3.1 1.5c1.8 2.3 2.2 3.5 1.3 3.5-1.2 0-5.7-5.1-5.7-6.5 0-1.5 2.1-.1 4.4 3zm-1.4 5c-.1.5-1.4-.6-3-2.5-1.7-1.9-3-3.9-3-4.5.1-.5 1.4.6 3 2.5 1.7 1.9 3 3.9 3 4.5zm-3 .7c0 .4-.3.8-.7.8-.9 0-5.3-6.6-5.3-7.7.1-1 6 5.9 6 6.9zm-4.6-1.2c1.4 2.2 2.2 4 1.7 4-.9 0-5.1-6.1-5.1-7.4 0-1.3.8-.5 3.4 3.4zm-2.5 1.6c2.9 4.9 2.6 5.5-.9 1.5-1.6-1.9-2.7-3.8-2.4-4.3.8-1.3 1.1-1 3.3 2.8zM173 415c0 3.4-17.1 15.1-22 15-2.7-.1 9.3-10.3 15.5-13.1 7.1-3.3 6.5-3.1 6.5-1.9zm-19 7.2c0 1.7-2 .6-3.9-2.1-3.2-4.4-2.4-6.1.9-2.1 1.6 1.9 3 3.8 3 4.2zm-5.1-1.3c2.2 3.1 2.6 4.1 1.4 4.1-.5 0-1.8-1.6-3.1-3.5-2.7-4.2-1.2-4.7 1.7-.6zm-1.6 3c1 1.7 1.5 3.1 1 3.1-.9 0-5.3-6.2-5.3-7.4 0-1.4 2.4 1 4.3 4.3zm-1.2 3.6c.5 1.1-.6.2-2.6-1.9-1.9-2.2-3.5-4.4-3.5-5 .1-1.3 4.6 3.9 6.1 6.9zm-1.2 3c0 .5-1.8-1-3.9-3.4-2.2-2.4-4-4.9-4-5.5 0-.6 1.8.9 4 3.4s3.9 4.9 3.9 5.5zm-16.9-.6c-.1.9-6-6.2-6-7.2 0-.6 1.4.7 3 2.8 1.7 2.1 3 4.1 3 4.4zm-.2-5.2c4.4 6.5 4.1 7.2-.7 1.3-1.7-2.2-2.8-4-2.2-4 .5 0 1.8 1.2 2.9 2.7zm4.2 2c1.9 2.7 2.5 4 1.4 3.1-1.8-1.6-5.9-7.8-5.1-7.8.2 0 1.9 2.1 3.7 4.7zm3.4.8l2.8 4-3.6-4c-2-2.2-3.6-4.4-3.6-5 0-1.1.7-.3 4.4 5zm6.5 4c0 .5-1.8-1-3.9-3.4-2.2-2.4-4-4.9-4-5.5 0-.6 1.8.9 4 3.4s3.9 4.9 3.9 5.5zm-20.1-6.4c1.9 3 1.1 3.2-1.1.3-1-1.3-1.4-2.4-1-2.4.5 0 1.4.9 2.1 2.1z"/>
				<path d="M139.4 370c-3 1.2-3.6 3.5-1.3 5.6 1.6 1.4 2.6 1.6 5.7.8 3.9-1 5.3-3.4 3.2-5.9-1.4-1.6-4.4-1.8-7.6-.5zm5.6 2c1.2.7 1 1.1-1 1.8-2.6 1-5 .6-5-.8 0-.7 1.3-1.3 4-1.9.3 0 1.2.4 2 .9zM129 402.8c-10.8 5.4-5 15.1 6.5 10.8 4.1-1.6 8.5-5.6 8.5-7.7 0-.5-.9-1.8-2-2.9-2.5-2.5-8.2-2.6-13-.2zm10.8 1.1c4 2.5-2.9 8.1-10 8.1-6.4 0-6.1-4.1.6-7.1 4.5-2 7.4-2.3 9.4-1zM457.6 349.7c-.7.7 6.2 8.3 7.6 8.3 1.8 0 .6-2.8-2.5-5.8-3.5-3.4-4-3.6-5.1-2.5zM404.1 358c-13 4.7-23.2 17.4-24.8 30.8-1.6 14 6.1 30.2 17.8 37.4 7.5 4.7 21.6 6.1 31.5 3.2 11.8-3.4 22.7-13.9 25.9-25.2 2.3-7.7 1.7-19.9-1.3-26.6-4.6-10.2-12.2-16.9-22.8-20.1-7-2.1-19.7-1.9-26.3.5zm26.9 2l3.5 1.2.1 8c.2 8.5 1.1 10.3 4.9 9.1 1.1-.3 4-.6 6.5-.7 4.5 0 4.5 0 6.2 5 4.1 11.8.1 27.4-9 35.6-4.1 3.7-8.1 6.3-8.7 5.6-.9-.8 2-9.5 4-12.3 4.9-6.8 4.3-8.8-4-12.5-8.4-3.8-11.4-4.3-16.8-2.9-4.5 1.1-4.7 1-8.4-2-2.1-1.7-4.5-3.1-5.4-3.1-.9 0-2.3-.7-3-1.6-1.1-1.4-.9-1.9 1.1-3.4 1.4-1 3.9-2.1 5.7-2.5 6.3-1.2 8.5-8.7 3.6-12.3-2.8-2-2.8-2.1-1-5.1 1.2-2 1.5-3.9 1.1-5.7l-.7-2.7 8.4.6c4.6.3 10 1.1 11.9 1.7zm-22 2.1c0 1.1-.7 3.1-1.6 4.4-1.6 2.4-1.5 2.6 1.6 5.5 2.4 2.3 3.1 3.6 2.6 5.3-.5 2.3-4.2 4.7-7 4.7-2.5 0-6.6 4.1-6.6 6.6 0 1.9.8 2.9 3.7 4.1 2.1.8 5.1 2.6 6.7 4 2.7 2.2 3.5 2.4 10 1.8 6.1-.5 7.9-.3 13.1 1.9 7.9 3.3 8.6 4.5 5.2 9.3-1.4 2.1-3 5.7-3.5 8.1-1.1 4.9-3.7 9.2-5.5 9.2-.8 0-1.2-1.7-1.2-4.9 0-4-.5-5.6-2.6-7.8-2.1-2.3-2.5-3.5-2.2-6.5.6-4.2-.7-5.2-7.4-6.1-2.3-.3-5.5-1.4-7-2.5-1.6-1.1-4.7-2.3-6.8-2.7-5.2-1-7.5-3.1-7.5-7 0-1.9-1.3-5.1-3.1-7.8-2.2-3.4-2.9-5.4-2.5-7.1.8-3.4 10.8-12.2 15.8-13.9 4.9-1.6 5.8-1.4 5.8 1.4zm35.5 7c2.6 2.8 4.5 5.2 4.4 5.3-1 .9-11.9 1.3-11.4.5.4-.5.1-2.4-.6-4.3-1.3-3.7-.7-6.6 1.4-6.6.8 0 3.6 2.3 6.2 5.1zm-56.2 14.3c1.6 2.6 2.7 5.7 2.7 7.8 0 4.2 2.3 6.6 7.1 7.3 1.9.4 5.7 1.7 8.4 3 2.8 1.3 6.8 2.7 9 3.2 3.8.8 4 1 3.7 4.1-.2 2.3.4 4.1 2.2 6.3 1.4 1.7 2.7 3.8 2.7 4.7.3 3-.1 7.6-.7 8.1-1.1 1.1-15 .5-18.9-.9-2.2-.7-3.4-1.5-2.7-1.7 2.4-.9 1.1-2.2-2.5-2.6-2.8-.3-2.3-.4 2-.5 8.5-.3 7-2.2-1.7-2.2h-7.4l-3.1-4.2c-4.6-6.3-7.2-14.1-7.4-22.3-.1-6.6 1.6-14.5 3.1-14.5.4 0 1.9 2 3.5 4.4z"/>
				<path d="M416 365c0 .5 1.8 1 4 1s4-.5 4-1c0-.6-1.8-1-4-1s-4 .4-4 1zM420 368c0 .5 1.8 1 4 1s4-.5 4-1c0-.6-1.8-1-4-1s-4 .4-4 1zM429.3 385.7c3.2.2 8.1.2 11 0 2.9-.2.3-.3-5.8-.3-6 0-8.4.1-5.2.3zM433 389c0 .6 2.7 1 6 1s6-.4 6-1-2.7-1-6-1-6 .4-6 1zM441 392c0 .5 1.6 1 3.5 1s3.5-.5 3.5-1c0-.6-1.6-1-3.5-1s-3.5.4-3.5 1zM392 406c0 .6 3 1 7 1s7-.4 7-1-3-1-7-1-7 .4-7 1zM396 409c0 1.3 14 1.3 16 0 1-.7-1.2-1-7.2-1-5.2 0-8.8.4-8.8 1zM403 412.2c0 .4 1.6.8 3.5.8s3.5-.5 3.5-1c0-.6-1.6-1-3.5-.8-1.9.1-3.5.6-3.5 1zM366.6 361.7c-2.6 3.7-3.3 6.3-1.8 6.3 1.2-.1 6.1-8.9 5.2-9.5-.5-.3-2 1.1-3.4 3.2zM469 363.4c0 .2.9 2.5 2 5 1.7 4.2 4 6.2 4 3.6 0-1.9-4-9-5-9-.6 0-1 .2-1 .4zM324.5 375.6c-1.5 1.5-1.5 1.9-.1 3.2 1.7 1.7 4.6 1 4.6-1.1 0-.8-.6-2-1.4-2.6-1.1-.9-1.8-.8-3.1.5zM359 377.5c-.6 1.9-1 4.5-.8 5.7.4 2.2.5 2.1 1.7-.7 1.9-4.5 2.5-8.5 1.3-8.5-.6 0-1.6 1.6-2.2 3.5zM475.3 381.7c.3 1 .8 3.5 1.2 5.5.6 3.8 2.5 5.3 2.5 2 0-4.6-1.4-9.2-2.7-9.2-.9 0-1.3.7-1 1.7zM318.7 382.6c-1.4 1.5-.6 3.4 1.4 3.4 1.4 0 1.9-.5 1.7-1.7-.3-1.8-2-2.7-3.1-1.7zM205.3 385.7c-1.8.6-1.6 4 .1 4.6.8.3 2-.1 2.7-.9 1-1.2.9-1.8-.2-2.8-.8-.8-2-1.2-2.6-.9zM356.7 392.7c-.9.8-.9 5-.1 8 1.1 4.1 2.4 2.4 2.4-3.2 0-5.1-.7-6.5-2.3-4.8zM209.4 394.5c-1 2.5.4 4.5 3 4.5 1.3 0 2.6-.7 3-1.5.9-2.5-.5-4.5-3-4.5-1.4 0-2.7.7-3 1.5zm3.6 1.5c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zM476.6 399.7c-1 3.7-1.1 8.6 0 9 1.1.4 2.4-4 2.4-8.3 0-2.8-1.6-3.2-2.4-.7zM253.7 410.2c-.6 4.7-4.3 8.8-7.8 8.8-3 0-2.2 1.5 1.5 2.8 3.7 1.4 6.6 6 6.6 10.7 0 3.9 2.3 2.6 2.7-1.6.5-4.6 3.3-8.2 7.1-9.4 4.1-1.2 4-2.1-.3-2.9-4-.8-6-3.3-6.9-8.9-.9-4.9-2.2-4.7-2.9.5zm3.6 7.8c1.7 2 1.7 2.2 0 4.5-2.2 3-2.4 3-4.6 0-1.7-2.3-1.7-2.5 0-4.4 2.3-2.5 2.5-2.5 4.6-.1zM287.4 410.5c-.4.9-.2 2.1.4 2.7 1.5 1.5 4.4.1 4-1.9-.4-2.3-3.6-2.9-4.4-.8zM358.5 412.2c.4 1.3 1.1 2.7 1.6 3.2 1.5 1.6 2 0 1-2.8-1.3-3.2-3.5-3.6-2.6-.4zM471.2 419.5c-2.4 5-2.7 6.5-1.2 6.5 1.1 0 5-7.3 5-9.5 0-2.8-1.6-1.5-3.8 3zM361.4 418.9c-6.9 4.2-9.2 10.7-5.9 17.1 2.5 4.8 6.2 7 11.8 7 4.5 0 5.4-.4 8.7-3.9 4.7-4.9 5.4-8.3 3-13.8-3.3-7.5-11.2-10.3-17.6-6.4zm13.6 4.8c1.8 2 3 4.5 3 6.1 0 3.3-3.1 8.1-6.2 9.8-2 1.1-2.5.9-4.6-1.3-1.9-2-3-2.4-5.6-2-2.9.5-3.5.2-4.5-1.9-1.7-3.9-1.3-7 1.5-10.3 2.7-3.2 7.4-5 11.1-4.3 1.3.2 3.6 2 5.3 3.9zm-10 15.8c1.4 1.6 1 1.8-1.4.9-.9-.3-1.6-1-1.6-1.5 0-1.4 1.6-1.1 3 .6z"/>
				<path d="M363.6 423.6c-2 2-1.8 4.3.7 5.8 2.5 1.6 5.2-.4 5.2-4 0-3.5-3.3-4.5-5.9-1.8zm3.6 3.6c-1.5 1.5-2.6.4-1.8-1.8.5-1.3.9-1.5 1.8-.6s.9 1.5 0 2.4zM370 435.1c0 2.5 3.3 2.2 3.8-.4.2-1.2-.3-1.7-1.7-1.7-1.5 0-2.1.6-2.1 2.1zM319.5 423c-1.5 1.6-1.7 2.6-.9 4.8.8 2.2 1.6 2.8 4.7 3 3.1.3 3.9-.1 4.9-2.2 2.7-6-4.3-10.5-8.7-5.6zm6.8 1.2c.6 1.8-1.1 4.8-2.6 4.8-2.3 0-3.7-2.2-2.6-4.2s4.5-2.4 5.2-.6zM460.6 434.9c-2.1 2.2-3.3 4.1-2.8 4.5 1.2.7 8.2-5.5 8.2-7.3 0-2-1.5-1.2-5.4 2.8zM225.7 434.7c-1.3 1.2-.7 4.4.9 5 2.3.9 4.8-2.5 3.3-4.4-1.2-1.4-3.2-1.7-4.2-.6zM178 438.1c0 1.9 4.7 6.5 5.7 5.5.4-.3-.7-2.1-2.5-3.9-2.2-2.2-3.2-2.7-3.2-1.6zM378 441.8c0 1.6 3.9 4.4 5.1 3.7.8-.6.5-1.3-1.2-2.6-2.6-2-3.9-2.4-3.9-1.1zM445.8 445.4c-4.1 2.3-4.8 3.6-2 3.6 1.6 0 9.2-4.5 9.2-5.5 0-1.1-3.8-.1-7.2 1.9zM390 449c0 1.1 2.9 2.4 7.7 3.6 4.2 1.1 2.3-1.6-2.2-3.2-4.8-1.7-5.5-1.7-5.5-.4zM190 450c0 2.3 9.4 8.8 10.4 7.2.3-.5-1.6-2.4-4.2-4.3-5.7-4.2-6.2-4.4-6.2-2.9zM429.3 451.2c-4.8 1-5.8 2.9-1.5 2.7 4.1-.1 7.5-1.3 8-2.7.4-1.4-.6-1.4-6.5 0zM407 453.4c0 1.3 1.1 1.6 5.5 1.6 3 0 5.5-.5 5.5-1 0-.6-1.1-1-2.4-1-1.3 0-3.8-.3-5.5-.6-2.4-.5-3.1-.3-3.1 1zM267 454c0 1.6 1.3 1.8 19 3 9.1.6 17.8 1.3 19.3 1.6l2.9.6-2.6 2.7c-1.4 1.5-2.8 4.1-3.2 5.8-.8 3.9-2.8 4.3-22.1 4.3-7.8 0-14.4.4-14.7.9-1 1.5 4.3 1.9 20.4 1.4l15.7-.5 1.3 3.1c.7 1.8 2.4 4.1 3.8 5.1 1.4 1.1 2.3 2.2 2.1 2.4-.7.7-21.7 3.4-32.1 4.1-11.2.8-13.2 2.5-3 2.5 6.6 0 26.8-2.2 32.7-3.5 11-2.5 16.5-4.7 18.9-7.6 4.9-5.8 4.3-14.5-1.3-19.2-3.7-3.1-10-4-49.8-7.1-4.8-.4-7.3-.3-7.3.4zm53.3 7.1c4.9 2.2 7.1 9.7 4.5 15.4-2.6 5.8-12.6 7.5-17.2 2.9-1.4-1.5-2.6-3.5-2.6-4.5 0-1.6.8-1.9 4.1-1.9 2.8 0 3.9-.4 3.7-1.2-.3-.8-2-1.1-4.6-.9-2.3.1-4.2.1-4.2-.2 0-.2.5-1.8 1.1-3.5 2-5.7 9.5-8.7 15.2-6.1z"/>
				<path d="M318.7 473.5c-1.5 1.4-3.5 2.5-4.3 2.5-.8 0-1.4.4-1.4 1 0 1.4 1.6 1.2 5.3-.5 2.9-1.4 3-1.4 1.3-.1-1.1.9-1.6 1.9-1.3 2.3 1.2 1.2 3.2-1.6 3.3-4.7.1-1.7.1-3 0-3 0 0-1.4 1.2-2.9 2.5zM352.7 453.7c-.4.3-.7 1.8-.7 3.3 0 2.9-2.7 6-5.3 6-3 0-2.9 2 .2 2.6 3.7.8 4.8 2 5.3 5.8.4 4 2.8 4.7 2.8.8 0-2.9 2.6-6.2 4.8-6.2.7 0 1.2-.7 1.2-1.5s-.7-1.5-1.5-1.5c-1.7 0-4.5-5-4.5-8 0-2-1.1-2.6-2.3-1.3zm2.3 11.8c-1.9 2.3-4.4 0-2.9-2.7 1-1.8 1.2-1.9 2.7-.5 1.3 1.3 1.3 1.9.2 3.2zM154.4 457.8c-2.7.4-6.2 1.5-7.6 2.4-2.7 1.8-5.8 7.4-5.8 10.5 0 3.5 3.7 8.1 7.2 8.8 1.8.4 6.6 2 10.6 3.6 8.9 3.6 16 3.8 20.8.8 3.9-2.4 4.8-5 4.2-12-1.2-11.8-11.1-16.5-29.4-14.1zm20 3.7c4.4 2.1 7.5 7.7 7.6 13.7 0 7-8.1 10.4-17.6 7.4-4.5-1.4-5.3-2.1-5.9-4.7-1.2-5.2-6.5-7.1-12.7-4.4-1.5.6-1.8.2-1.8-2.9 0-5.6 4.4-9.8 11.1-10.7 8-1.1 14.9-.5 19.3 1.6zm-19 15.1c.9 2.4.3 2.7-4.3 1.4-4.8-1.3-4.6-3 .4-3 2.1 0 3.5.6 3.9 1.6z"/>
				<path d="M154 464.2c0 1.9.2 2 1 .8 1.3-1.9 1.3-3 0-3-.5 0-1 1-1 2.2zM157.7 462.7c-1.1 1.1-.8 5.3.4 5.3.6 0 .9-.6.6-1.3-.2-.6 0-2 .5-3 .8-1.6-.2-2.4-1.5-1zM163.3 463.5c-5.1 3.6-1 11.5 5.9 11.5 4.5 0 6.8-1.7 6.8-4.9 0-5.6-8.2-9.8-12.7-6.6zm10.2 5.6c1.3 3.9-4.5 5.3-8.5 2.1-2.6-2.1-2.1-5.8.8-6.5 2.5-.5 7 2 7.7 4.4zM174.6 475.5c-1.1.8-2.8 1.5-3.8 1.5s-1.8.4-1.8 1c0 .5.7 1 1.5 1 2.2 0 7.5-2.9 7.5-4 0-1.4-1.2-1.2-3.4.5zM160 477.9c0 .6.5 1.3 1 1.6.6.3 1-.1 1-.9 0-.9-.4-1.6-1-1.6-.5 0-1 .4-1 .9zM208 462c0 1 8.4 5 10.6 5 2.9 0 1.2-1.7-3.9-3.8-5.9-2.5-6.7-2.6-6.7-1.2zM228.2 469.1c.5 1.6 3.9 2.7 8.6 2.8 4.4.1 4.1-1.5-.5-2.4-2.1-.3-4.9-.9-6.2-1.2-1.7-.4-2.2-.2-1.9.8zM249 472.5c0 1.3.8 1.6 3.8 1.3 2-.2 3.7-.8 3.7-1.3 0-.6-1.7-1.1-3.7-1.3-3-.3-3.8 0-3.8 1.3z"/>
			</SVG>
		);
	}

	//todo: ln 97: when editing is true setfocus automatically on textarea so you can immediately start typing instead of first clickign again
	return (
		<Note style={{position: "relative", width: '70%'}} onClick={() => handleOnClick()}>
			<StickyBar className="sticky-bar"><Date>{activeNote ? activeNote.date: ''}</Date></StickyBar>
			{!isEditing ?
				<ReactMarkdown source={item} className="reactmd scroll" escapeHtml={false} /> :
				<TextArea2
					className="scroll"
					value={item}
					placeholder="Keep calm and write something"
					onChange={e => handleChange(e)} //move to TextArea component later
					onFocus={()=>setIsEditing(true)}
					onBlur={()=>setIsEditing(false)}
					onMouseOut={()=>handleOnMouseOut()}
				/>
			}
			{!activeNote ? _renderPlaceholder() : ''}
		</Note>
	);
}

export default NoteWrapper;