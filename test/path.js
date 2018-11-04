const path = require("../lib/path"),
  { expect } = require("chai")

describe("path", () => {
  const root = path(),
    parent = path(root),
    child1 = path(parent),
    child2 = path(parent)

  describe("root node", () =>
    it("is empty", () => {
      expect(root.path).to.equal(".")
      expect(root.htap).to.equal(".")
    }))

  describe("child node", () => {
    it("extends parent", () => {
      expect(child1.path.startsWith(parent.path)).to.be.true
      expect(child2.htap.startsWith(parent.htap)).to.be.true
    })

    it("has chronological order", () => {
      expect(root.path < parent.path).to.be.true
      expect(parent.path < child1.path).to.be.true
      expect(child1.path < child2.path).to.be.true
    })

    it("has anti-chronological order", () => {
      expect(root.htap < parent.htap).to.be.true
      expect(parent.htap < child1.htap).to.be.true
      expect(child1.htap > child2.htap).to.be.true
    })
  })
})
