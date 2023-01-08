const cry = require('crypto');

module.exports.getData = function () {
  const value = new Promise((resolve, reject) => {
    resolve(cry.randomBytes(3));
  });
  return value;
}

// getData().then(res => console.log(res));
