import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { styleMap } from "lit/directives/style-map.js";

// const invertValue = css`invert(100%)`;
// const defaultFilterValue = css`defaultFilterValue`;

// const kolor = css`--text-3`;
// const myBG = css`--surface-3`;

@customElement("box-l")
export class Box extends LitElement {
  static styles = [
    css`
      :host {
        display: block;

        outline: 0.125rem solid transparent;
        outline-offset: -0.125rem;

        color: inherit;
        background-color: inherit;
        ::slotted(*) {
          color: inherit;
          background-color: inherit;
        }
      }
    `,
  ];

  // static properties = { padding: { type: String } };
  // padding = "10px";

  @property({ type: String })
  padding = "8px";

  @property({ type: String })
  borderWidth = "1px";

  @property({ type: Boolean })
  invert = false;

  render() {
    const styles = {
      border: `${this.borderWidth} solid`,
      padding: this.padding,
      color: ` var(--text-3)`,
      backgroundColor: `var(--surface-3)`,

      filter: this.invert ? "invert(100%)" : "",
    };

    return html`<div style=${styleMap(styles)}><slot /></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "box-l": Box;
  }
}
