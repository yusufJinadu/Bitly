class CodeVerification {
  constructor() {}

  verifyQrCode(imageSrc: string) {
    return cy
      .request({
        method: 'GET',
        url: 'https://cat-fact.herokuapp.com/facts/', // assuming this is a bitly endpoint that accepts an image src and gives back verification details
        body: { imageSrc }
      })
      .then((resp) => {
        return (resp.body = {
          color: '#893F3F',
          url: 'https://www.qrcode-monkey.com',
          shape: 'square'
        });
      });
    // stubbed response to simulate expected response
  }
}

export default new CodeVerification();
