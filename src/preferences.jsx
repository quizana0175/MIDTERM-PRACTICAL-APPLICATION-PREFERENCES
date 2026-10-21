import { createContext, useContext, useState } from "react";

export const FONT_SIZES = [14, 16, 18];
export const THEMES = ["light", "dark"];
export const PreferencesContext = createContext(null);

export function usePreferences() {
  const preferences = useContext(PreferencesContext);

  if (preferences === null) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return preferences;
}

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(16);

  function updateTheme(nextTheme) {
    if (!THEMES.includes(nextTheme)) {
      throw new RangeError(`Unsupported theme: ${nextTheme}`);
    }

    setTheme(nextTheme);
  }

  function updateFontSize(nextFontSize) {
    const size = Number(nextFontSize);
    if (!FONT_SIZES.includes(size)) {
      throw new RangeError(`Unsupported font size: ${nextFontSize}`);
    }

    setFontSize(size);
  }

  const value = {
    theme,
    fontSize,
    updateTheme,
    updateFontSize,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}
