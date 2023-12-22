import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";

const main = document.querySelector("#main");

// Function to remove the spinner once the content is loaded
const removeSpinner = () => {
  const spinner = document.querySelector(".loading-container");
  if (spinner) {
    main.removeChild(spinner);
  }
};

// Initialize the editor and remove the spinner once it's loaded
const initEditor = async () => {
  const editor = new Editor();
  // Assuming the Editor class has an 'isReady' method or similar to check if it's fully loaded
  if (editor.isReady) {
    removeSpinner();
  } else {
    console.error("Editor failed to initialize");
  }
};

// Load the editor
initEditor();

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}
