const cry = require('crypto');

exports.getData = function () {
  const value = new Promise((resolve, reject) => {
    resolve(cry.randomBytes(3));
  });
  return value;
}

//module.exports.getData().then(res => console.log(res));
