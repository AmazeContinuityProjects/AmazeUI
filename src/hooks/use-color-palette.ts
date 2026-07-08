"use client";
import { useState, useEffect, useCallback } from "react";

export interface PaletteDefinition {
  accent: string;
  background?: string;
  surface?: string;
}

const COLOR_PALETTES: Record<string, PaletteDefinition> = {
  default: { accent: "" },
  neonPink: { accent: "#ff2bd6", background: "#fff7fd", surface: "#ffffff" },
  forest: { accent: "#059669", background: "#f8fffb", surface: "#ffffff" },
  rose: { accent: "#e11d48", background: "#fff8fa", surface: "#ffffff" },
  amber: { accent: "#d97706", background: "#fffdf6", surface: "#ffffff" },
  ocean: { accent: "#3b82f6", background: "#f0f7ff", surface: "#ffffff" },
  lavender: { accent: "#8b5cf6", background: "#f8f6ff", surface: "#ffffff" },
  sunset: { accent: "#f59e0b", background: "#fffdf6", surface: "#ffffff" },
};

export interface ColorPaletteOption {
  id: string;
  label: string;
  swatches: string[];
}

export const PALETTE_OPTIONS: ColorPaletteOption[] = [
  { id: "default", label: "Default", swatches: ["#0ea5e9", "#38bdf8", "#0284c7"] },
  { id: "neonPink", label: "Neon Pink", swatches: ["#ff2bd6", "#f472b6", "#db2777"] },
  { id: "forest", label: "Forest", swatches: ["#059669", "#34d399", "#047857"] },
  { id: "rose", label: "Rose", swatches: ["#e11d48", "#fb7185", "#be123c"] },
  { id: "amber", label: "Amber", swatches: ["#d97706", "#fbbf24", "#b45309"] },
  { id: "ocean", label: "Ocean", swatches: ["#3b82f6", "#60a5fa", "#2563eb"] },
  { id: "lavender", label: "Lavender", swatches: ["#8b5cf6", "#a78bfa", "#7c3aed"] },
  { id: "sunset", label: "Sunset", swatches: ["#f59e0b", "#fbbf24", "#d97706"] },
];

function getSettings() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("club_hub_settings");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveSettings(updates: Record<string, any>) {
  if (typeof window === "undefined") return;
  const current = getSettings() || {};
  const next = { ...current, ...updates };
  localStorage.setItem("club_hub_settings", JSON.stringify(next));
}

export function useColorPalette() {
  const [paletteId, setPaletteIdState] = useState<string>("default");

  useEffect(() => {
    const saved = getSettings();
    if (saved?.colorPalette) {
      setPaletteIdState(saved.colorPalette);
    } else {
      const legacyAccent = localStorage.getItem("accent");
      if (legacyAccent && COLOR_PALETTES[legacyAccent]) {
        setPaletteIdState(legacyAccent);
      }
    }
  }, []);

  const setPaletteId = useCallback((id: string) => {
    setPaletteIdState(id);
    saveSettings({ colorPalette: id });
    try { localStorage.setItem("accent", id); } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const applyPalette = () => {
      const selectedId = paletteId;
      const palette = COLOR_PALETTES[selectedId];

      if (!palette || selectedId === "default") {
        root.removeAttribute("data-color-palette");
        root.removeAttribute("data-accent");
        root.style.removeProperty("--theme-accent");
        root.style.removeProperty("--accent-color");
        root.style.removeProperty("--accent-foreground-color");
        root.style.removeProperty("--primary");
        root.style.removeProperty("--primary-foreground");
        root.style.removeProperty("--info");
        root.style.removeProperty("--info-surface");
        root.style.removeProperty("--ring");
        root.style.removeProperty("--chart-1");
        root.style.removeProperty("--chart-2");
        root.style.removeProperty("--chart-3");
        root.style.removeProperty("--background");
        root.style.removeProperty("--surface");
        return;
      }

      const accent = palette.accent;
      const isDark = root.classList.contains("dark");
      const darkBase = "oklch(0.03 0 0)";
      const darkSurface = "oklch(0.09 0 0)";
      const lightBase = "oklch(0.985 0 0)";

      root.setAttribute("data-color-palette", selectedId);
      root.setAttribute("data-accent", selectedId);

      const setVar = (name: string, value: string) => root.style.setProperty(name, value);

      setVar("--theme-accent", accent);
      setVar("--accent-color", accent);
      setVar("--accent-foreground-color", isDark ? "#000000" : "#ffffff");

      if (isDark) {
        setVar("--background", `color-mix(in oklab, ${accent} 6%, ${darkBase})`);
        setVar("--surface", `color-mix(in oklab, ${accent} 4%, ${darkSurface})`);
        setVar("--primary", accent);
        setVar("--primary-foreground", "#ffffff");
        setVar("--info", accent);
        setVar("--info-surface", `color-mix(in oklab, ${accent} 18%, transparent)`);
        setVar("--ring", accent);
        setVar("--chart-1", accent);
        setVar("--chart-2", `color-mix(in oklab, ${accent} 70%, #10b981)`);
        setVar("--chart-3", `color-mix(in oklab, ${accent} 70%, #f59e0b)`);
      } else {
        setVar("--background", palette.background || lightBase);
        setVar("--surface", palette.surface || "#ffffff");
        setVar("--primary", accent);
        setVar("--primary-foreground", "#ffffff");
        setVar("--info", accent);
        setVar("--info-surface", `color-mix(in oklab, ${accent} 14%, transparent)`);
        setVar("--ring", accent);
        setVar("--chart-1", accent);
        setVar("--chart-2", `color-mix(in oklab, ${accent} 70%, #10b981)`);
        setVar("--chart-3", `color-mix(in oklab, ${accent} 70%, #f59e0b)`);
      }
    };

    applyPalette();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          applyPalette();
        }
      });
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
    };
  }, [paletteId]);

  return { paletteId, setPaletteId, palettes: PALETTE_OPTIONS };
}
