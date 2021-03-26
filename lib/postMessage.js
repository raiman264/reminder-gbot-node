const unirest = require("unirest");
const getJWT = require("./jwt");

function postMessage(message, room) {
  return new Promise(function(resolve, reject) {
      getJWT().then(function(token) {
          unirest.post(`https://chat.googleapis.com/v1/${room}/messages`)
              .headers({
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + token
              })
              .send(JSON.stringify({
                  'text': message,
              }))
              .end(function(res) {
                  resolve();
              });
      }).catch(function(err) {
          reject(err);
      });
  });
}

module.exports = postMessage;
