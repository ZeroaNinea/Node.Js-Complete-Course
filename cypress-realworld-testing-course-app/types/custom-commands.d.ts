declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-test attribute
     * @param selector The data-test attribute value
     * @example cy.getByData('submit-button')
     */
    getByData(selector: string): Chainable<JQuery<HTMLElement>>;
  }
}
