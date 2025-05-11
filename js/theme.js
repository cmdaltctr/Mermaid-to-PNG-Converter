import { setMermaidTheme, rerenderMermaid } from "./mermaid.js";

// Theme management module
export const initThemeToggle = () => {
  const themeToggle = document.getElementById("themeToggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Function to set theme
  const setTheme = (isDark) => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setMermaidTheme(isDark ? "dark" : "default"); // Update Mermaid theme
    rerenderMermaid(); // Re-render diagram to apply new theme
    themeToggle.checked = isDark;
  };

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme === "dark");
  } else {
    setTheme(prefersDarkScheme.matches);
  }

  // Toggle theme on checkbox change
  themeToggle.addEventListener("change", () => {
    setTheme(themeToggle.checked);
  });

  // Listen for system theme changes
  prefersDarkScheme.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches);
    }
  });
};
