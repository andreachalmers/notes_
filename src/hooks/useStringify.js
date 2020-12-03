import React from "react"

const useObjToStr = (obj) => {
	const string = obj ? Object.values(obj).filter(item => item!== true && isNaN(item) ).join('\n\n') : ''
	return string
}

export default useObjToStr