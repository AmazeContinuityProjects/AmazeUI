import { describe, expect, it } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useColorPalette, PALETTE_OPTIONS } from "../../src/hooks/use-color-palette"

describe("useColorPalette", () => {
  it("defaults to the default palette", () => {
    const { result } = renderHook(() => useColorPalette())
    expect(result.current.paletteId).toBe("default")
  })

  it("exposes all palette options", () => {
    const { result } = renderHook(() => useColorPalette())
    expect(result.current.palettes).toHaveLength(PALETTE_OPTIONS.length)
  })

  it("persists a selected palette to localStorage and the document root", () => {
    const { result } = renderHook(() => useColorPalette())

    act(() => {
      result.current.setPaletteId("ocean")
    })

    expect(result.current.paletteId).toBe("ocean")
    const settings = JSON.parse(localStorage.getItem("club_hub_settings") ?? "{}")
    expect(settings).toMatchObject({ colorPalette: "ocean" })
    expect(localStorage.getItem("accent")).toBe("ocean")
    expect(document.documentElement.getAttribute("data-color-palette")).toBe("ocean")
  })

  it("restores a saved palette on mount", () => {
    localStorage.setItem("club_hub_settings", JSON.stringify({ colorPalette: "forest" }))

    const { result } = renderHook(() => useColorPalette())

    expect(result.current.paletteId).toBe("forest")
  })

  it("clears attributes when switching back to default", () => {
    localStorage.setItem("club_hub_settings", JSON.stringify({ colorPalette: "ocean" }))
    const { result } = renderHook(() => useColorPalette())

    act(() => {
      result.current.setPaletteId("default")
    })

    expect(document.documentElement.hasAttribute("data-color-palette")).toBe(false)
    expect(document.documentElement.style.getPropertyValue("--primary")).toBe("")
  })
})
