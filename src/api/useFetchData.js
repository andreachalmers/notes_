import React, {useState, useEffect} from "react";


const useFetchData = (url, defaultResponse) => {
	const [notesArr, setNotesArr] = useState(defaultResponse)

	async function getDataFromAPI(url) {
		try {
			const res =await fetch(url)
			const data = await res.json()
			setNotesArr(data)
		}catch(e){
			console.error(e)
		}
	}

	useEffect(()=>{
		getDataFromAPI(url)
	},[url])

	return {notesArr, setNotesArr}
}

export default useFetchData