var util = require('yeoman-util');
var eslintrc = require('../../lib/eslintrc');

module.exports = util.Base.extend({
  writing: {
    eslintrc: eslintrc('base', true),
    package: util.manifest(),
  },
});
