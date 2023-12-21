// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {
  constructor() {
    // Removed localStorage as we are now using IndexedDB for storage.
    // Create the editor
    this.editor = CodeMirror(document.querySelector("#main"), {
      value: header, // Set the default header text
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    this.loadContent();

    // Event listener for content changes in the editor
    this.editor.on("change", this.saveContent.bind(this));

    // Event listener for when the editor loses focus
    this.editor.on("blur", this.saveContent.bind(this));
  }

  // Load content from IndexedDB
  async loadContent() {
    try {
      const data = await getDb();
      if (data) {
        // If there's data in IndexedDB, use it
        this.editor.setValue(data);
      }
    } catch (error) {
      console.error("Failed to load content from IndexedDB:", error);
    }
  }

  // Save content to IndexedDB
  async saveContent() {
    try {
      const content = this.editor.getValue();
      await putDb(content);
      console.log("Content saved to IndexedDB");
    } catch (error) {
      console.error("Failed to save content to IndexedDB:", error);
    }
  }
}

// Create a new instance of the editor
const editorInstance = new Editor();
