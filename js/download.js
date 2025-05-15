import { rerenderMermaid } from "./mermaid.js";

export const initDownload = () => {
	const downloadBtn = document.getElementById("downloadBtn");
	const previewElement = document.getElementById("mermaidPreview");

	downloadBtn.addEventListener("click", async () => {
		try {
			// Show loading state
			downloadBtn.textContent = "Converting...";
			downloadBtn.disabled = true;

			// Re-render the Mermaid diagram to ensure it matches the current theme
			await rerenderMermaid();

			// Add a small delay to ensure rendering is complete
			setTimeout(async () => {
				// Convert SVG to PNG using html2canvas
				const canvas = await html2canvas(previewElement, {
					backgroundColor: null,
					scale: 7, // Increased quality
					logging: false,
					useCORS: true,
				});

				// Convert canvas to blob
				canvas.toBlob((blob) => {
					if (!blob) {
						throw new Error("Failed to create Blob from canvas.");
					}

					// Create download link
					const url = URL.createObjectURL(blob);
					const link = document.createElement("a");
					link.href = url;
					link.download = "mermaid-diagram.png";

					// Trigger download
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(url);

					// Reset button state
					downloadBtn.textContent = "Download PNG";
					downloadBtn.disabled = false;
				}, "image/png");
			}, 100); // Delay of 100ms
		} catch (error) {
			console.error("Download failed:", error);
			downloadBtn.textContent = "Download Failed";
			downloadBtn.disabled = false;

			// Reset button after 2 seconds
			setTimeout(() => {
				downloadBtn.textContent = "Download PNG";
			}, 2000);
		}
	});
};

// Function to download SVG
export const initDownloadSVG = () => {
	const downloadSVGBtn = document.getElementById("downloadSVGBtn");
	const previewElement = document.getElementById("mermaidPreview");

	downloadSVGBtn.addEventListener("click", () => {
		try {
			// Get the SVG content
			const svgElement = previewElement.querySelector("svg");
			if (!svgElement) {
				throw new Error("No SVG element found in the preview.");
			}

			// Serialize the SVG content
			const serializer = new XMLSerializer();
			const svgContent = serializer.serializeToString(svgElement);

			// Create a Blob for the SVG
			const blob = new Blob([svgContent], { type: "image/svg+xml" });

			// Create download link
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "mermaid-diagram.svg";

			// Trigger download
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("SVG download failed:", error);
		}
	});
};
