const path = require("../lib/path"),
  assert = require("assert").strict

describe("path", () => {
  const parent = path(),
    child1 = path(parent),
    child2 = path(parent)

  describe("child node", () => {
    it("extends parent", () => {
      assert(child1.path.startsWith(parent.path))
      assert(child2.htap.startsWith(parent.htap))
    })

    it("has chronological order", () => {
      assert(parent.path < child1.path)
      assert(child1.path < child2.path)
    })

    it("has anti-chronological order", () => {
      assert(parent.htap < child1.htap)
      assert(child2.htap < child1.htap)
    })
  })
})
