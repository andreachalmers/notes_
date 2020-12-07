const useActiveKey = (arr) => {
	return Object.keys(arr).find(key => arr[key].active === true)
}

export default useActiveKey

//@todo: pimp this out later - this should not be a hook