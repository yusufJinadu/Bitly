class CookiesPopup {
  constructor() {}

  getCookiesPopup() {
    return '#onetrust-banner-sdk';
  }

  getAcceptCookiesButton() {
    return '#onetrust-accept-btn-handler';
  }

  acceptCookies() {
    cy.get(this.getAcceptCookiesButton()).click();
    cy.get(this.getCookiesPopup()).should('not.be.visible');
  }
}

export default new CookiesPopup();
