# Mermaid PNG Converter Documentation

## Overview

The Mermaid to PNG Converter is a web application that allows users to create and download Mermaid diagrams as PNG images. It provides a user-friendly interface for writing Mermaid code, previewing the diagram, and downloading it as a PNG file. The application utilises several technologies, including HTML, CSS, JavaScript, and external libraries such as Prism, FontAwesome, mermaid.js, and html2canvas.

## Architecture

The application follows a modular architecture, with each JavaScript module responsible for a specific functionality. The main components of the application are:

- `index.html`: The main HTML file that provides the structure and user interface of the application.
- `css/`: Contains the CSS files for styling the application, including `styles.css` for the main styles and `dark-mode.css` for the dark mode styles.
- `js/app.js`: The main JavaScript file that initialises the application and orchestrates the interaction between different modules.
- `js/mermaid.js`: The module responsible for initialising and rendering Mermaid diagrams.
- `js/theme.js`: The module responsible for managing the theme toggle functionality.
- `js/download.js`: The module responsible for handling the download functionality.

The architecture is designed to separate concerns, making the application easier to maintain and extend. The `app.js` module acts as the central orchestrator, coordinating the interactions between the other modules.

## Modules

### `index.html`

The `index.html` file defines the structure of the web page. It includes the following sections:

- **Header:** Contains the title of the application and the theme toggle.
- **Main Content:** Divided into two columns:
  - **Code Section:** Contains the Mermaid code input area.
  - **Preview Section:** Displays the rendered Mermaid diagram.
- **Download Section:** Contains the download button.

The file also includes links to external CSS stylesheets and JavaScript libraries. It is the entry point for the application, and it loads all the necessary JavaScript modules.

### `css/`

The `css/` directory contains the CSS files for styling the application.

- `styles.css`: Contains the main styles for the application.
- `dark-mode.css`: Contains the styles for the dark mode theme.

The CSS files are responsible for the visual appearance of the application. The `styles.css` file provides the basic styling, while the `dark-mode.css` file provides the styles for the dark mode theme. The theme is toggled by adding or removing a `dark` class to the `html` element.

### `js/app.js`

The `js/app.js` file is the main entry point of the application. It performs the following tasks:

1. **Imports modules:** Imports the necessary modules from other JavaScript files (`js/mermaid.js`, `js/theme.js`, `js/download.js`).
2. **Initialises the application:** Attaches a `DOMContentLoaded` event listener to the document, which executes when the page is fully loaded.
3. **Checks theme preference:** Determines the user's preferred theme (dark or default) based on local storage or system preference.
4. **Initialises Mermaid:** Calls the `initMermaid()` function from `js/mermaid.js` to initialise Mermaid with the appropriate theme.
5. **Sets up theme toggle:** Calls the `initThemeToggle()` function from `js/theme.js` to set up the theme toggle functionality.
6. **Sets up download functionality:** Calls the `initDownload()` function from `js/download.js` to set up the download functionality.
7. **Renders the initial diagram:** Calls the `rerenderMermaid()` function from `js/mermaid.js` to render the initial diagram.
8. **Triggers initial render:** Forces an input event on the code element to trigger the initial render.

The `app.js` module is responsible for coordinating the interactions between the other modules. It initialises each module and sets up the necessary event listeners. It also triggers the initial render of the diagram.

### `js/mermaid.js`

The `js/mermaid.js` file is responsible for initialising and rendering Mermaid diagrams. It contains the following functions:

- **`setMermaidTheme(theme)`:** Configures Mermaid with the specified theme, security level, and font family.
- **`initMermaid(theme)`:** Initialises Mermaid with the default or dark theme. It gets the code from the `mermaidCode` element and renders the diagram in the `mermaidPreview` element. It also sets up an event listener for code changes, so the diagram is re-rendered whenever the code is updated. Prism syntax highlighting is also also handled in this function.
- **`rerenderMermaid()`:** A simplified version of the rendering logic, used to re-render the diagram with the current theme and code.

The rendering process involves the following steps:

1. **Get the code:** Retrieves the Mermaid code from the `mermaidCode` element.
2. **Render the diagram:** Calls the `mermaid.render()` function to render the diagram.
3. **Display the diagram:** Inserts the generated SVG code into the `mermaidPreview` element.
4. **Handle errors:** Displays an error message in the `mermaidPreview` element if an error occurs during rendering.

This module interacts with the `app.js` module to initialise Mermaid and re-render the diagram whenever the code is updated or the theme is changed. It also uses the `mermaid.js` library to render the Mermaid code into an SVG image.

### `js/theme.js`

The `js/theme.js` file manages the theme toggle functionality. It contains the following function:

- **`initThemeToggle()`:** Gets the theme toggle element and checks for saved theme preferences or uses the system preference. It sets the theme based on the preference and updates the Mermaid theme accordingly.

The theme toggle functionality works as follows:

1. **Check theme preference:** Checks if a theme preference is saved in local storage. If not, uses the system preference.
2. **Set the theme:** Sets the `data-theme` attribute of the `html` element to either "dark" or "light" based on the theme preference.
3. **Update Mermaid theme:** Calls the `setMermaidTheme()` function from `js/mermaid.js` to update the Mermaid theme.
4. **Re-render the diagram:** Calls the `rerenderMermaid()` function from `js/mermaid.js` to re-render the diagram with the new theme.
5. **Set up event listeners:** Sets up event listeners for the theme toggle and system theme changes, so the theme is updated whenever the toggle is changed or the system theme changes.

This module interacts with the `app.js` module to initialise the theme toggle functionality. It also interacts with the `mermaid.js` module to update the Mermaid theme whenever the theme is changed.

### `js/download.js`

The `js/download.js` file handles the download functionality. It contains the following function:

- **`initDownload()`:** Gets the download button and the preview element. It sets up an event listener for the download button, so the diagram is downloaded when the button is clicked.

The download process works as follows:

1. **Show loading state:** Changes the download button text to "Converting..." and disables the button.
2. **Re-render the diagram:** Calls the `rerenderMermaid()` function from `js/mermaid.js` to ensure the diagram matches the current theme.
3. **Convert SVG to PNG:** Uses the `html2canvas` library to convert the SVG code in the `mermaidPreview` element to a PNG image.
4. **Create download link:** Creates a download link with the PNG image as the source.
5. **Trigger download:** Triggers the download link to download the PNG image.
6. **Reset button state:** Resets the download button text and enables the button.
7. **Handle errors:** Displays an error message if an error occurs during the download process.

This module interacts with the `app.js` module to initialise the download functionality. It also interacts with the `mermaid.js` module to re-render the diagram before converting it to a PNG image. It uses the `html2canvas` library to convert the SVG image to a PNG image.

## Mechanism

The Mermaid PNG Converter works by combining the functionalities of several JavaScript modules and external libraries. The main mechanism of the application can be summarised as follows:

1. The user enters Mermaid code in the code input area.
2. The `js/mermaid.js` module listens for changes in the code input area and re-renders the diagram whenever the code is updated.
3. The `mermaid.js` library renders the Mermaid code into an SVG image.
4. The `js/theme.js` module manages the theme toggle functionality and updates the Mermaid theme accordingly.
5. The `js/download.js` module handles the download functionality and converts the SVG image to a PNG image using the `html2canvas` library.
6. The user can download the PNG image by clicking the download button.

This mechanism allows users to easily create and download Mermaid diagrams as PNG images. The application is designed to be modular and extensible, making it easy to add new features and functionality in the future.
