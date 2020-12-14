import {useState, useEffect} from "react";

const useFetchData = (url, defaultResponse) => {
	const [notesArr, setNotesArr] = useState(defaultResponse)
	const [isLoading, setIsLoading] = useState(true)
	async function getDataFromAPI(url) {
		try {
			const res =await fetch(url)
			const data = await res.json()
			setNotesArr(data)
			setIsLoading(false)
		}catch(e){
			console.error(e)
		}
	}

	useEffect(()=>{
		getDataFromAPI(url)
	},[url])

	return {notesArr, setNotesArr, isLoading}
}

export default useFetchData