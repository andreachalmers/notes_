import React from "react"

const useObjToStr = (obj) => {
	const string = obj ? Object.values(obj).filter(item => item!== true ).join('\n\n') : ''
	return string
}

export default useObjToStr