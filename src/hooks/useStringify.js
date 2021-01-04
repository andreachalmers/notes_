const useObjToStr = (obj) => {
	const content = [obj["heading"], obj["content"]]
	const string = obj ? content.join('\n\n') : ''
	return string
}

export default useObjToStr