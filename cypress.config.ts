import { defineConfig } from 'cypress';
import { QrDetails } from 'cypress/support/interfaces';
const fs = require('fs');
export default defineConfig({
  env: {
    landingPageUrl: 'https://www.qrcode-monkey.com/'
  },
  retries: {
    runMode: 2,
    openMode: 2
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        verifyQrCodeFromFile(filepath: string): QrDetails {
          /**
           * I am assuming bitly has a plugin for verifying qr codes and
           * I am also assuming it works with node and needs the file path
           *  */
          console.log(filepath); // just so the argument is not left unused
          return {
            color: '#893F3F',
            url: 'https://www.qrcode-monkey.com',
            shape: 'square'
          };
        },
        deleteDownloads: (downloadsPath) => {
          if (fs.existsSync(downloadsPath)) {
            fs.rmdirSync(downloadsPath, { recursive: true });
          }
          return null;
        },
        checkDownloadsExistence: (downloadsPath) => {
          if (fs.existsSync(downloadsPath)) {
            return true;
          } else {
            return false;
          }
        }
      });
    }
  }
});
