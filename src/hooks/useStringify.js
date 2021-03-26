const useObjToStr = (obj) => {
	const content = obj ? [obj["heading"], obj["content"]] : [] //quick fix
	const string = content.join('\n\n')
	return string
}

export default useObjToStr