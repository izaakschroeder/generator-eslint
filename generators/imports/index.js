var generators = require('yeoman-generator');
var util = require('yeoman-util');
var eslintrc = require('../../lib/eslintrc');

module.exports = generators.Base.extend({
  writing: {
    eslintrc: eslintrc('imports'),
    package: util.manifest()
  }
});
