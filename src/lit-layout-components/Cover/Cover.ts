import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @module cover-l
 * @description
 * A custom element for covering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} centered=h1 A simple selector such an element or class selector, representing the centered (main) element in the cover
 * @property {string} space=var(--s1) The minimum space between and around all of the child elements
 * @property {string} minHeight=100vh The minimum height (block-size) for the **Cover**
 * @property {boolean} noPad=false Whether the spacing is also applied as padding to the container element
 */

@customElement("cover-l")
export class Cover extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-block-size: 100vh;
      }
    `,
  ];

  @property({ type: String })
  accessor minHeight = "100vh";

  @property({ type: String })
  accessor space = "var(--s1)";

  @property({ type: Boolean })
  accessor noPad = false;

  render() {
    const noPadStyle = html`<style>
      :host {
        padding: 0;
        min-height: ${this.minHeight};
      }
      ::slotted(*) {
        margin-block: ${this.space};
      }
      ::slotted("top") > :first-child {
        margin-block-start: 0;
      }
      ::slotted("bottom") > :last-child {
        margin-block-end: 0;
      }
    </style> `;

    const padStyle = html`<style>
      :host {
        padding: ${this.space};
        min-height: ${this.minHeight};
      }
      ::slotted(*) {
        margin-block: ${this.space};
      }
      ::slotted("top") > :first-child {
        margin-block-start: 0;
      }
      ::slotted("bottom") > :last-child {
        margin-block-end: 0;
      }
    </style> `;

    return html`${this.noPad ? noPadStyle : padStyle}

      <slot name="top"></slot>
      <slot name="middle"></slot>
      <slot name="bottom"></slot> `;
  }
}
