// Import modules
import { initMermaid, rerenderMermaid } from "./mermaid.js";
import { initThemeToggle } from "./theme.js";
import { initDownload } from "./download.js";

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
	const isDark =
		localStorage.getItem("theme") === "dark" ||
		(window.matchMedia("(prefers-color-scheme: dark)").matches &&
			!localStorage.getItem("theme"));
	initMermaid(isDark ? "dark" : "default");

	// Set up theme toggle functionality
	initThemeToggle();

	// Set up download functionality
	initDownload();

	rerenderMermaid(); // Ensure preview is rendered on load

	// After everything is ready, force an input event to trigger the initial render
	setTimeout(() => {
		const codeElement = document.getElementById("mermaidCode");
		if (codeElement) {
			codeElement.dispatchEvent(new Event("input"));
		}
	}, 0);
});

// Initialize the SVG download functionality
import { initDownloadSVG } from "./download.js";

document.addEventListener("DOMContentLoaded", () => {
	initDownloadSVG();
});
