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
      flex-direction: row;
      min-block-size: 100vh;
      padding: '5px';
      min-height: 100vh;
    }
  `;

  @property({ attribute: 'centered-element' })
  accessor centered = 'h1';

  @property({ attribute: 'space' })
  accessor space = 'var(--s1)';

  @property({ attribute: 'min-height' })
  accessor minHeight = '100vh';

  @property({ type: Boolean, reflect: true })
  noPad: boolean = false;

  render() {
    return html`<style>
        ::slotted(*) {
          padding: ${!this.noPad ? this.space : '0'};
          /* min-height: ${!this.minHeight}; */
        }
        ::slotted(*) > * {
          margin-block: ${this.space};
        }
        ::slotted(*) > :first-child:not(${this.centered}) {
          margin-block-start: 0;
        }
        ::slotted(*) > :last-child:not(${this.centered}) {
          margin-block-end: 0;
        }
        ::slotted(*) > ${this.centered} {
          margin-block: auto;
        }
      </style>
      <slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cover-l': Cover;
  }
}
