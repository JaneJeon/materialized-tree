const path = require("./path"),
	depth = 5,
	width = 5

module.exports = async insertAndReturn => {
	let parents = [],
		children = []

	for (let i = 0; i < depth - 1; i++) {
		if (!parents)
			for (let j = 0; j < width; j++)
				parents.push(await insertAndReturn(path()))

		for (let parent of parents)
			for (let j = 0; j < width; j++)
				children.push(await insertAndReturn(path(parent)))

		parents = children
		children = []
	}
}
