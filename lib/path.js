const uuid = require("uuid/v1")

module.exports = parent => {
  if (!parent) return { path: ".", htap: "." }

  const buf = Buffer.allocUnsafe(16),
    fub = Buffer.allocUnsafe(16)

  uuid(null, buf)

  // flip bits so we can sort 2-way
  for (const [index, byte] of buf.entries()) fub[index] = ~byte

  return {
    path: `${parent.path}${buf.toString("base64")}.`,
    htap: `${parent.htap}${fub.toString("base64")}.`
  }
}
