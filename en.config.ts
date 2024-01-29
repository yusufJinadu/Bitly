import { defineConfig } from 'cypress';
import cypressConfig from './cypress.config';
cypressConfig.env = {
  ...cypressConfig.env,
  ...{
    landingPageUrl: 'https://www.qrcode-monkey.com/',
    lang: 'en'
  }
};
export default defineConfig(cypressConfig);
