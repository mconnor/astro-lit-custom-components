import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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

@customElement('cover-l')
export class Cover extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: var(--my-flex-direction, row);
      min-block-size: var(--my-min-height, 100vh);
      padding: var(--my-space, '5px');
      background-color: var(--my-bg, red);
    }
    :host([noPad]) {
      padding: 0;
    }
    ::slotted(centered) {
      color: blue;
    }
    ::slotted(*) {
      padding: 6px;
      border: 1px solid black;
    }
    /* ::slotted(*) > * {
      margin-block: var(--my-space, '5px');
    }
    ::slotted(*) > :first-child:not(main) {
      margin-block-start: 0;
    }
    ::slotted(*) > :last-child:not(main) {
      margin-block-end: 0;
      background-color: red;
    }
    ::slotted(*) > main {
      margin-block: auto;
    } */
  `;

  @property({ type: String })
  centered: string = 'h1';

  @property({ type: Boolean, reflect: true })
  noPad: boolean = false;

  render() {
    return html`
      <slot name="bottom"></slot>
      <slot></slot>
      <slot name="top"></slot>
    `;
  }
}
