import { describe, expect, it } from "vitest"
import { cn } from "../../src/lib/utils"

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b")
  })

  it("skips falsy values", () => {
    expect(cn("a", false && "b", undefined, null, "c")).toBe("a c")
  })

  it("lets later tailwind classes win conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })

  it("merges conditional expressions", () => {
    const isActive = true
    expect(cn("btn", isActive && "btn-active")).toBe("btn btn-active")
  })
})
