const useActiveKey = (arr) => {
	return Object.keys(arr).find(key => arr[key].active === true)
}

export default useActiveKey

//@todo: pimp this out later - this should not be a hook
/*
import React, {useState} from "react";
const useActiveKey = (arr) => {
	const [key, setKey] = useState(arr.length - 1)
	setKey(Object.keys(arr).find(key => arr[key].active === true))

	return [key, setKey]
}

export default useActiveKey*/