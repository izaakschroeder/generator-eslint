var util = require('yeoman-util');
var eslintrc = require('./eslintrc');

module.exports = function(name, options) {
  return util.Base.extend({
    writing: {
      eslintrc: eslintrc(name, options),
      package: util.manifest(),
    },
  });
};
