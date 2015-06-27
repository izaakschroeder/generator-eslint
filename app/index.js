var generators = require('yeoman-generator');
var ini = require('ini');
var minimatch = require('minimatch');
var assign = require('lodash/object/assign');
var reduce = require('lodash/collection/reduce');
var util = require('yeoman-util');

function getEditorConfigRules(file, input) {
	var values = ini.parse(file || '');
	return reduce(values, function collectConfig(config, value, pattern) {
		if (minimatch(input, pattern)) {
			return assign(config, value);
		} else {
			return config;
		}
	}, { });
}

module.exports = generators.Base.extend({
	initializing: {
		indent: util.defaults(function generateDefaults() {
			var ec, config;
			// Detect tabs vs spaces from .editorconfig
			if (this.fs.exists('.editorconfig')) {
				ec = this.fs.read(this.destinationPath('.editorconfig'));
				config = getEditorConfigRules(ec, 'test.js');
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
		type: 'confirm',
		name: 'babel',
		message: 'Use ES6/ES7/ES2015 extensions',
		default: true
	}, {
		type: 'confirm',
		name: 'react',
		message: 'Use React extensions',
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
