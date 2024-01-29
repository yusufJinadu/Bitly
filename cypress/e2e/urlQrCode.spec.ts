import cookiesPopup from '../support/page-objects/cookiesPopup';
import landingPage from '../support/page-objects/landingPage';
import general from 'cypress/support/page-objects/general';
import { QrDetails } from 'cypress/support/interfaces';
import codeVerification from 'cypress/support/api/codeVerification';

const landingPageUrl: string = Cypress.env('landingPageUrl');
const lang: string = Cypress.env('lang');
const downloadsPath = './cypress/downloads';

describe('The Url Qr code section should work as expected', () => {
  beforeEach(function () {
    cy.task('deleteDownloads', downloadsPath);
    cy.fixture('qrCodeOptions').then(({ url, color, shape }) => {
      this.url = url;
      (this.color = color), (this.shape = shape);
    });
  });

  it('User should be able to generate a qr code and verify on the web page ', function () {
    cy.visit(landingPageUrl);
    /**ideally, there should be another test explicitly testing the acceptance of the cookies
     * The removal of the cookie popup as done here should be done using app actions or
     * programatically depending on the code setup
     *  */
    cookiesPopup.acceptCookies();
    setQrCodeDetails.call(this);
    cy.get(landingPage.getQrCodeImage())
      .invoke('attr', 'src')
      .then((src) => {
        codeVerification.verifyQrCode(src).then(({ color, url, shape }) => {
          expect(color).to.equal(this.color);
          expect(url).to.equal(this.url);
          expect(shape).to.equal(this.shape);
        });
      });
  });

  it('User should be able to generate a qr code, download and verify the downloaded file ', function () {
    cy.visit(landingPageUrl);
    /**ideally, there should be another test explicitly testing the acceptance of the cookies
     * The removal of the cookie popup as done here should be done using app actions or
     * programatically depending on the code setup
     *  */
    cookiesPopup.acceptCookies();
    setQrCodeDetails.call(this);
    cy.get(landingPage.getDownloadButton()).click();
    cy.waitUntil(
      () =>
        cy
          .task('checkDownloadsExistence', downloadsPath)
          .then((isExisting) => isExisting === true),
      { timeout: 30000 }
    );

    cy.task<QrDetails>(
      'verifyQrCodeFromFile',
      './cypress/downloads/**/*.png'
    ).then(({ color, url, shape }) => {
      expect(color).to.equal(this.color);
      expect(url).to.equal(this.url);
      expect(shape).to.equal(this.shape);
    });
  });

  it('Statistics and editability switch should open the login prompt', function () {
    // if we are not keen on testing the click of the switch or if we are already sure it works due to unit or component tests
    // then his test would not be included
    cy.visit(landingPageUrl);
    /**ideally, there should be another test explicitly testing the acceptance of the cookies
     * The removal of the cookie popup as done here should be done using app actions or
     * programatically depending on the code setup
     *  */
    cookiesPopup.acceptCookies();
    cy.get(
      landingPage.getStatisticsAndEditabilityArea(
        landingPage.translations[lang].statisticsAndEditability
      )
    )
      .find('a')
      .click();
    cy.get(landingPage.getModal()).should('be.visible');
  });

  it("Users hould be able to visit the Login page from the 'Free signup button'", function () {
    verifyLoginRedirect(
      landingPage.getStatModalSignupButton(),
      'https://login.qr-code-generator.com/signup/?utm_source=qrcm&utm_medium=statistics'
    );
  });

  it('Users hould be able to visit the Login page from the statistics image', function () {
    verifyLoginRedirect(
      landingPage.getStatImage(),
      'https://login.qr-code-generator.com/signup/?target=monkey'
    );
  });
});

function setQrCodeDetails() {
  cy.get(landingPage.getUrlInput()).clear().type(this.url); // I would set the url here using app actions assuming the component has been tested
  /**
   * I would also set the colors here using app actions assuming the component has been tested
   * but I mainly wanted to show the potential of multi environment testing as the next line
   * will work on any selected language provided the correct config file is used
   */
  cy.get(
    landingPage.getAccordionItem(landingPage.translations[lang].setColours)
  ).click();
  // the same goes for the logos and the design I would set them using app actions  assuming the component has been tested
  cy.get(landingPage.getGenerateButton()).click();
  cy.get(general.getLoader()).should('not.be.visible');
}

function verifyLoginRedirect(selector: string, expectedUrl: string) {
  cy.visit(landingPageUrl);
  /**ideally, there should be another test explicitly testing the acceptance of the cookies
   * The removal of the cookie popup as done here should be done using app actions or
   * programatically depending on the code setup
   *  */
  cookiesPopup.acceptCookies();
  cy.get(
    landingPage.getStatisticsAndEditabilityArea(
      landingPage.translations[lang].statisticsAndEditability
    )
  )
    .find('a')
    .click();
  // ideally, this should be done using app actions
  cy.get(selector).click();
  cy.origin(
    'https://login.qr-code-generator.com/',
    { args: expectedUrl },
    (expectedUrl) => {
      cy.url().should('eq', expectedUrl);
    }
  );
}
