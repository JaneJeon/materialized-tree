const uuid = require("uuid/v1")

module.exports = parent => {
  if (!parent) return { path: ".", htap: "." }

  // drop the last byte to save space
  const buf = Buffer.allocUnsafe(15),
    fub = Buffer.allocUnsafe(15),
    tmp = Buffer.allocUnsafe(4)

  uuid(null, buf)

  // while I'd like to use the uuid as-is, it is not chronological.
  // to fix that, I have to change the order of the first 8 bytes:
  // https://www.percona.com/blog/2014/12/19/store-uuid-optimized-way
  buf.copy(tmp, 0, 0, 4)

  for (let i = 0; i < 2; i++) {
    buf[i] = buf[i + 6]
    buf[i + 2] = buf[i + 4]
  }

  for (let i = 0; i < 4; i++)
    buf[i + 4] = tmp[i]

  // flip bits so we can sort 2-way
  for (const [index, byte] of buf.entries()) fub[index] = ~byte

  return {
    path: `${parent.path}${buf.toString("base64")}.`,
    htap: `${parent.htap}${fub.toString("base64")}.`
  }
}
