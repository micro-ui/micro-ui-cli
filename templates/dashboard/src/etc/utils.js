export const sortByDateAsc = (arrayA, arrayB) => {
    return new Date(arrayA.created) - new Date(arrayB.created)
}

export const sortByDateDesc = (arrayA, arrayB) => {
    return new Date(arrayB.created) - new Date(arrayA.created)
}

export function debounce(func, wait, immediate) {
	var timeout
	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

export const startCase = (str) => {
	if (!str) return str

	return str
		.toLowerCase()
		.split(' ')
		.map((word) => word[0].toUpperCase() + word.substr(1))
		.join(' ')
}

export const suppressPropTypesWarnings = () => {
	// React has a feature to validate prop types, throwing a warning if prop isn't of that type
	// Unfortunately, some third party components have these warnings, so we'll filter them out here

	let origWarn = console.warn
	let origError = console.error

	console.error = function () {
		if (arguments.length && arguments[0].indexOf('Warning: Failed prop type:') >= 0) return
		origError.apply(console, arguments)
	}

	console.warn = function () {
		if (arguments.length && arguments[0].indexOf('Warning: Failed prop type:') >= 0) return
		origWarn.apply(console, arguments)
	}
}
