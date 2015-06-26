var generators = require('yeoman-generator');
var path = require('path');
var ini = require('ini');
var minimatch = require('minimatch');
var assign = require('lodash/object/assign');
var reduce = require('lodash/collection/reduce');
var util = require('yeoman-util');

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
	initializing: {
		indent: util.defaults(function() {
			// Detect tabs vs spaces from .editorconfig
			if (this.fs.exists('.editorconfig')) {
				var ec = this.fs.read(this.destinationPath('.editorconfig'));
				var config = getEditorConfigRules(ec, 'test.js');
				if (config.indent_style === 'tab') {
					return { indent: 'tab' };
				} else {
					return { indent: config.indent_size || 4 };
				}
			}
			return { indent: 'tab' };
		})
	},

	prompting: util.prompt([{
		type: 'input',
		name: 'react',
		message: 'Use react extensions',
		default: true
	}, {
		type: 'input',
		name: 'indent',
		message: 'Indentation style'
	}, {
		type: 'list',
		name: 'quotes',
		message: 'Quotation style',
		choices: [ 'single', 'double' ],
		default: 'single'
	}]),

	writing: {
		eslintrc: util.copy('~.eslintrc', '.eslintrc.json5'),
		package: util.manifest()
	},

	end: {
		open: util.open('~.eslintrc')
	}
});
