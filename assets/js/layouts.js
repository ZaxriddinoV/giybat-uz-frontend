import { Header } from "./header.js";

export class Layouts {
  static async init() {
    try {
      await this.#loadHtml("header", "/layouts/header.html");
      await this.#loadHtml("footer", "/layouts/footer.html");

      Header.init();
    } catch (error) {
      console.error(error);
    }
  }

  static async #loadHtml(elementId, filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}`);
      }
      const data = await response.text();
      document.getElementById(elementId).innerHTML = data;
    } catch (error) {
      console.error(error);
    }
  }
}
