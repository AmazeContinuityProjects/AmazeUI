import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Badge } from "../../src/components/ui/badge"

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>hello</Badge>)
    expect(screen.getByText("hello")).toBeInTheDocument()
  })

  it("renders a span with base classes", () => {
    render(<Badge>hi</Badge>)
    const badge = screen.getByText("hi")
    expect(badge.tagName).toBe("SPAN")
    expect(badge.className).toContain("rounded-full")
  })

  it("applies variant and size classes", () => {
    render(
      <Badge variant="danger" size="md">
        x
      </Badge>
    )
    const badge = screen.getByText("x")
    expect(badge.className).toContain("bg-danger-surface")
    expect(badge.className).toContain("text-xs")
  })

  it("appends custom className last", () => {
    render(<Badge className="custom-class">x</Badge>)
    expect(screen.getByText("x").className).toContain("custom-class")
  })
})
