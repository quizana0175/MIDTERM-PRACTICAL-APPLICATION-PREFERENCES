import { createRoot } from "react-dom/client";
import "./styles.css";
import {
  FONT_SIZES,
  PreferencesProvider,
  usePreferences,
} from "./preferences.jsx";

function Toolbar() {
  const { theme, updateTheme } = usePreferences();

  return (
    <div className="toolbar" aria-label="Theme preferences">
      <span className="toolbar-label">Appearance</span>
      <div className="theme-switch" role="group" aria-label="Choose a theme">
        {["light", "dark"].map((option) => (
          <button
            aria-pressed={theme === option}
            className={theme === option ? "theme-option selected" : "theme-option"}
            key={option}
            onClick={() => updateTheme(option)}
            type="button"
          >
            {option === "light" ? "☀" : "☾"} {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function PreferencesPanel() {
  const { fontSize, updateFontSize } = usePreferences();

  return (
    <section className="preferences-panel" aria-labelledby="preferences-title">
      <div>
        <h2 id="preferences-title">Reading preferences</h2>
        <p>Adjust the text size in your article preview.</p>
      </div>
      <label className="font-size-control">
        <span>Font size</span>
        <select
          aria-label="Font size"
          onChange={(event) => updateFontSize(event.target.value)}
          value={fontSize}
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

function ArticlePreview() {
  const { fontSize } = usePreferences();

  return (
    <article className="article-preview">
      <div className="article-kicker">YOUR READING SPACE</div>
      <h2>A little room to think</h2>
      <p style={{ fontSize: `${fontSize}px` }}>
        A good reading experience feels like it belongs to you. Choose a
        comfortable text size and a theme that helps you settle in.
      </p>
      <p style={{ fontSize: `${fontSize}px` }}>
        Your preferences are shared across the page, so every part of the
        experience stays in sync.
      </p>
      <div className="reading-meta">
        <span className="reading-dot" />
        3 minute read
      </div>
    </article>
  );
}

function Dashboard() {
  const { theme } = usePreferences();

  return (
    <main className={`dashboard ${theme}`}>
      <header className="dashboard-header">
        <div className="brand">
          <span className="brand-mark">a</span>
          <span>atelier</span>
        </div>
        <Toolbar />
      </header>
      <section className="welcome">
        <div className="eyebrow">YOUR SPACE, YOUR WAY</div>
        <h1>Make yourself<br />at home.</h1>
        <p>Set things up just the way you like them.</p>
      </section>
      <div className="content-grid">
        <PreferencesPanel />
        <ArticlePreview />
      </div>
      <footer className="dashboard-footer">
        <span>Preferences are applied instantly.</span>
        <span className="footer-status"><span /> All changes saved</span>
      </footer>
    </main>
  );
}

function App() {
  return (
    <PreferencesProvider>
      <Dashboard />
    </PreferencesProvider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
