class LandingPage {
  readonly translations = {
    en: {
      setColours: 'Set Colors',
      statisticsAndEditability: 'Statistics and Editability',
      freeSignUp: 'Free Sign Up'
    }
  };
  constructor() {
    this.translations = this.translations;
  }

  getUrlInput(): string {
    return '#qrcodeUrl';
  }

  getAccordionItem(text: string): string {
    return `div.pane-header:contains(${text})`;
  }

  getGenerateButton(): string {
    return '.generate-buttons';
  }

  getQrCodeImage(): string {
    return '.preview img';
  }

  getDownloadButton(): string {
    return '#button-download-qr-code-png';
  }

  getStatisticsAndEditabilityArea(text: string): string {
    return `.tab-content.active div:contains(${text})`;
  }

  getModal(): string {
    return '.content';
  }

  getStatModalSignupButton() {
    return '[ng-show="showStatisticsModal"] > .wrapper > .content > .info > .info-content > .button';
  }

  getStatImage(): string {
    return '[ng-show="showStatisticsModal"] > .wrapper > .content > .info > .info-content > [href="https://landing.qr-code-generator.com/4c109463-fd6a-4198-ae87-d0db74a71fbb"] > .teaser';
  }
}

export default new LandingPage();
