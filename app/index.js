var generators = require('yeoman-generator');
var path = require('path');
var ini = require('ini');
var minimatch = require('minimatch');
var assign = require('lodash/object/assign');
var reduce = require('lodash/collection/reduce');
var open = require('open');

function getEditorConfigRules(file, input) {
	var values = ini.parse(file || '');
	return reduce(values, function(config, value, pattern) {
		if (minimatch(input, pattern)) {
			return assign(config, value);
		} else {
			return config;
		}
	}, { });
}

module.exports = generators.Base.extend({
	initializing: function() {
		// Detect tabs vs spaces from .editorconfig
		this.indent = 'tab';
		if (this.fs.exists('.editorconfig')) {
			var ec = this.fs.read(this.destinationPath('.editorconfig'));
			var config = getEditorConfigRules(ec, 'test.js');
			if (config.indent_style === 'tab') {
				this.indent = 'tab';
			} else {
				this.indent = config.indent_size || 4;
			}
		}

	},

	prompting: function () {
		var done = this.async();
		this.prompt([{
			type: 'input',
			name: 'react',
			message: 'Use react extensions',
			default: true
		}, {
			type: 'input',
			name: 'ident',
			message: 'Indentation style',
			default: this.indent
		}], function (answers) {
			assign(this, answers);
			done();
		}.bind(this));
	},

	writing: function() {

		// TODO: ensure package.json

		this.fs.copyTpl(
			this.templatePath('.eslintrc.json5'),
			this.destinationPath('.eslintrc'),
			{
				react: this.react,
				indent: this.indent
			}
		);
	},

	end: function() {
		open(this.destinationPath('.eslintrc'));
	}
});
