class AstroThemeSwitcher extends HTMLElement {
  constructor() {
    super();

    // Bind the handleChange method to ensure the context is correct when called
    this.handleChange = this.handleChange.bind(this);
  }

  connectedCallback() {
    const form = this.querySelector("[data-select-theme]");
    form?.addEventListener("input", this.handleChange);
  }

  disconnectedCallback() {
    const form = this.querySelector("[data-select-theme]");
    form?.removeEventListener("input", this.handleChange);
  }

  handleChange(e: Event) {
    const htmlTag = document.firstElementChild;

    htmlTag.setAttribute("data-theme", (e.target as HTMLInputElement).value);
    localStorage.setItem("theme", (e.target as HTMLInputElement).value);
  }
}

customElements.define("astro-theme-switcher", AstroThemeSwitcher);
