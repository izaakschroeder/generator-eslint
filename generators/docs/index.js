var generators = require('yeoman-generator');
var eslintrc = require('../../lib/eslintrc');

module.exports = generators.Base.extend({
  writing: {
    eslintrc: eslintrc('docs')
  }
});
