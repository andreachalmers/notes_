
const useObjToStr = (obj) => {
	const string = obj ? Object.values(obj).filter(item => item!== true && isNaN(item) ).join('\n\n') : ''
	return string

	/*let note = `${obj.heading} ${obj.content}`
	return note*/
}

export default useObjToStr