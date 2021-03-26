const { google } = require('googleapis');

const gkeys = require('../googlekeys.json');

function getJWT() {
  return new Promise(function(resolve, reject) {
    let jwtClient = new google.auth.JWT(
      gkeys.client_email,
      null,
      gkeys.private_key, ['https://www.googleapis.com/auth/chat.bot']
    );

    jwtClient.authorize(function(err, tokens) {
      if (err) {
        console.log('Error create JWT hangoutchat');
        reject(err);
      } else {
        resolve(tokens.access_token);
      }
    });
  });
}

module.exports = getJWT;
