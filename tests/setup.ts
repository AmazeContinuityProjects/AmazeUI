import "@testing-library/jest-dom/vitest"

import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.documentElement.removeAttribute("data-color-palette")
  document.documentElement.removeAttribute("data-accent")
})
