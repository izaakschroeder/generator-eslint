var json = require('jju');
var merge = require('lodash/object/merge');
var isArray = require('lodash/lang/isArray');
var uniq = require('lodash/array/uniq');
var noop = require('lodash/utility/noop');

function combine(dst, src) {
  return merge(dst, src, function customizer(a, b) {
    if (isArray(a)) {
      return uniq(a.concat(b));
    }
  });
}

function update(dst, src) {
  return json.update(dst, combine(json.parse(dst), src), { });
}

function eslintrc(dst, input) {
  var path = this.destinationPath(dst);
  if (this.fs.exists(path)) {
    this.fs.write(path, update(this.fs.read(path), input));
  } else {
    this.fs.write(path, update(JSON.stringify({
      rules: { },
    }, null, '  '), input));
  }
}

function extend(file, path) {
  eslintrc.call(this, file, {
    extends: [ path ],
  });
}

module.exports = function(name, options) {
  if (options) {
    return noop;
  }
  return function generate() {
    extend.call(this, '.eslintrc', 'metalab/rules/' + name);
  };
};
