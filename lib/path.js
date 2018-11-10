const T_SEC_BYTES = 4,
	T_MICRO_BYTES = 3,
	TIME_BYTES = T_SEC_BYTES + T_MICRO_BYTES,
	MACHINE_BYTES = 5,
	TOTAL_BYTES = TIME_BYTES + MACHINE_BYTES

const microtime = require("microtime"),
	node = require("crypto").randomBytes(MACHINE_BYTES),
	buf = Buffer.allocUnsafe(TOTAL_BYTES),
	fub = Buffer.allocUnsafe(TOTAL_BYTES)

// fill the last few bytes with random info
buf.fill(node, TIME_BYTES)
for (let i = TIME_BYTES; i < TOTAL_BYTES; i++) fub[i] = ~buf[i]

module.exports = (parent, binary) => {
	// using custom format instead of UUID to save space
	const [sec, micro] = microtime.nowStruct()
	buf.writeUIntBE(sec, 0, T_SEC_BYTES)
	buf.writeUIntBE(micro, 4, T_MICRO_BYTES)

	// flip bits so we can sort 2-way
	for (let i = 0; i < TIME_BYTES; i++) fub[i] = ~buf[i]

	return binary
		? {
				path: parent ? Buffer.concat([parent.path, buf]) : buf,
				htap: parent ? Buffer.concat([parent.htap, fub]) : fub
		  }
		: {
				path: `${parent ? parent.path : ""}${buf.toString("base64")}`,
				htap: `${parent ? parent.htap : ""}${fub.toString("base64")}`
		  }
}
