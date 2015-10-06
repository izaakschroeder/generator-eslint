# generator-eslint

Build out the [eslint] configuration you've always dreamed of.

```sh
npm install -g @metalab/generator-eslint
yo @metalab/eslint
```

You can control how the rules get output by using the `--rules-path` flag.

```sh
# Put all the rules in a single, project-wide .eslintrc file.
yo @metalab/eslint:babel --rules-path='.eslintrc'
# Put all the rules in a folder named `config/eslint`.
yo @metalab/eslint:babel --rules-path='config/eslint'
# Put all the rules in a folder named `config/eslint`.
yo @metalab/eslint:babel --rules-path='config/eslint/${name}.eslintrc'
```

You can generate your own rules package for including in other projects by using the `--rules-path flag`.

```sh
cd eslint-rules-mine/
# Add some sensible info to your `package.json`.
vim package.json
# Populate all the rules.
yo @metalab/eslint:all --rules-path='./${name}.json'
# Share with the world.
npm publish
```

The newly published module can be used as such:

```json
{
  "extends": [
    "mine/best-practices"
  ]
}
```

To make a package roughly compatible with https://github.com/walmartlabs/eslint-config-defaults you can use the rule path `./rules/${name}/my-company.js`.

Generators:
 * app - Setup your project the default way.
 * babel - Use babel for parsing.
 * best-practices – Derp.
 * docs - Lint JSDoc.
 * errors – Herp.
 * filenames - Lint filenames.
 * imports - Enforce `import`/`export` syntax.
 * modern – ES6/7/2015/etc. rules.
 * node – `node`-specific rules.
 * react - Lint react components.
 * style - Stylistic guidelines.

[eslint]: http://eslint.org/
