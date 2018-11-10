const path = require("./path"),
	depth = 5,
	width = 5

module.exports = async insert => {
	let parents = [],
		children = []

	for (let i = 0; i < depth; i++) {
		for (let parent of parents)
			for (let j = 0; j < width; j++) {
				const child = path(parent)
				await insert(child)
				children.push(child)
			}

		parents = children
		children = []
	}
}
