const microtime = require("microtime"),
  node = require("crypto").randomBytes(5),
  buf = Buffer.allocUnsafe(12),
  fub = Buffer.allocUnsafe(12)

buf.fill(node, 7)
fub.fill(node, 7)

module.exports = parent => {
  // using custom format instead of UUID to save space
  const [sec, micro] = microtime.nowStruct()
  buf.writeUIntBE(sec, 0, 4)
  buf.writeUIntBE(micro, 4, 3)

  // flip bits so we can sort 2-way
  for (let i = 0; i < 7; i++) fub[i] = ~buf[i]

  return {
    path: `${parent ? parent.path : ""}.${buf.toString("base64")}`,
    htap: `${parent ? parent.htap : ""}.${fub.toString("base64")}`
  }
}
