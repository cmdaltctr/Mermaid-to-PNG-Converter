// Re-render the Mermaid diagram with the current theme and code
export function rerenderMermaid() {
	const codeElement = document.getElementById("mermaidCode");
	const previewElement = document.getElementById("mermaidPreview");
	if (!codeElement || !previewElement) return;
	const code = codeElement.textContent;
	mermaid.render("mermaid-diagram", code).then(({ svg }) => {
		previewElement.innerHTML = svg;
	});
}

// Mermaid configuration and rendering module
export function setMermaidTheme(theme) {
	mermaid.initialize({
		startOnLoad: false,
		theme: theme, // 'default' for light, 'dark' for dark mode
		securityLevel: "loose",
		fontFamily: "Arial, sans-serif",
	});
}

export const initMermaid = (theme = "default") => {
	setMermaidTheme(theme);

	const codeElement = document.getElementById("mermaidCode");
	const previewElement = document.getElementById("mermaidPreview");

	// Function to render the diagram
	const renderDiagram = async () => {
		try {
			// Clear previous content
			previewElement.innerHTML = "";

			// Get the code from the editor
			const code = codeElement.textContent;

			// Render the diagram
			const { svg } = await mermaid.render("mermaid-diagram", code);
			previewElement.innerHTML = svg;
		} catch (error) {
			previewElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
		}
	};

	// Initial render
	renderDiagram();

	// Set up event listener for code changes
	codeElement.addEventListener("input", () => {
		renderDiagram();
	});

	// Handle Prism syntax highlighting
	Prism.highlightElement(codeElement);

	// Force an input event to trigger the initial render
	codeElement.dispatchEvent(new Event("input"));

	// Always render the preview on load
	rerenderMermaid();
};
