const OFF = 0
const WARN = 1
const ERROR = 2

const styleRules = {
    "new-cap": WARN,
    "no-array-constructor": WARN,
    "no-multi-assign": WARN,
    "no-multiple-empty-lines": ERROR,
    "no-nested-ternary": WARN,
    "no-trailing-spaces": WARN,
    "no-underscore-dangle": WARN,
    "no-unneeded-ternary": WARN,
    "no-whitespace-before-property": WARN,
    "object-curly-newline": [
        WARN,
        {
            ObjectExpression: {
                consistent: true,
                minProperties: 2,
                multiline: true
            },
            ObjectPattern: "never"
        }
    ],
    "object-curly-spacing": WARN,
    "object-property-newline": WARN,
    "one-var": [WARN, "never"],
    "operator-linebreak": [WARN, "before"],
    "padded-blocks": [
        WARN,
        {
            blocks: "never",
            classes: "always",
            switches: "never"
        }
    ],
    "padding-line-between-statements": [
        ERROR,
        {
            blankLine: "always",
            prev: "block-like",
            next: "*"
        }
    ],
    "space-before-blocks": WARN,
    "space-before-function-paren": [WARN, "never"],
    "space-in-parens": WARN,
    "space-infix-ops": WARN,
    "spaced-comment": WARN,
    "switch-colon-spacing": WARN,
    "template-tag-spacing": ERROR,
    "array-bracket-newline": [
        WARN,
        {multiline: true}
    ],
    "array-bracket-spacing": WARN,
    "array-element-newline": 0, // Not useful right now, because there is no `consistent` option: https://github.com/eslint/eslint/issues/9457
    "block-spacing": WARN,
    "brace-style": WARN,
    "comma-dangle": [WARN, "never"],
    "comma-spacing": WARN,
    "comma-style": WARN,
    "computed-property-spacing": WARN,
    curly: [WARN, "all"],
    "dot-location": [WARN, "property"],
    "dot-notation": WARN,
    "func-call-spacing": WARN,
    "func-style": [
        WARN,
        "expression",
        {
            allowArrowFunctions: true
        }
    ],
    "function-paren-newline": [WARN, "never"],
    "implicit-arrow-linebreak": WARN,
    indent: [WARN, 4],
    "jsx-quotes": WARN,
    "key-spacing": WARN,
    "keyword-spacing": WARN,
    "linebreak-style": WARN,
    "lines-around-comment": WARN,
    "lines-between-class-members": WARN,
    "multiline-comment-style": WARN,
    quotes: WARN,
    "arrow-body-style": [WARN, "as-needed"],
    "arrow-parens": [WARN, "as-needed"],
    "arrow-spacing": WARN,
    "template-curly-spacing": WARN,
    "rest-spread-spacing": WARN,
    "yield-star-spacing": WARN,
    "quote-props": [WARN, "as-needed"]
}

const esRules = {
    "constructor-super": ERROR,
    "no-class-assign": ERROR,
    "no-dupe-class-members": ERROR,
    "no-new-symbol": ERROR,
    "no-const-assign": ERROR,
    "no-this-before-super": ERROR,
    "no-useless-computed-key": WARN,
    "no-useless-constructor": WARN,
    "no-useless-rename": WARN,
    "no-var": ERROR,
    "object-shorthand": WARN,
    "prefer-spread": WARN,
    "prefer-template": WARN,
    "require-yield": WARN,
    "prefer-destructuring": [
        WARN, {
            array: false // https://eslint.org/docs/rules/prefer-destructuring#when-not-to-use-it
        }
    ],
    "array-callback-return": WARN,
    "callback-return": WARN,
    eqeqeq: [ERROR, "smart"],
    "getter-return": WARN,
    "no-alert": WARN,
    "no-buffer-constructor": ERROR,
    "no-caller": ERROR,
    "no-compare-neg-zero": WARN,
    "no-cond-assign": WARN,
    "no-delete-var": ERROR,
    "no-dupe-args": ERROR,
    "no-dupe-keys": ERROR,
    "no-duplicate-case": ERROR,
    "no-empty-character-class": WARN,
    "no-empty-pattern": WARN,
    "no-eval": ERROR,
    "no-ex-assign": ERROR,
    "no-extra-bind": WARN,
    "no-extra-boolean-cast": WARN,
    "no-extra-label": WARN,
    "no-extra-semi": WARN,
    "no-fallthrough": WARN,
    "no-func-assign": WARN,
    "no-global-assign": WARN,
    "no-implicit-coercion": WARN,
    "no-inner-declarations": WARN,
    "no-invalid-regexp": ERROR,
    "no-irregular-whitespace": WARN,
    "no-iterator": ERROR,
    "no-label-var": WARN,
    "no-mixed-requires": ERROR,
    "no-multi-spaces": WARN,
    "no-multi-str": ERROR,
    "no-new": WARN,
    "no-new-func": ERROR,
    "no-new-require": ERROR,
    "no-obj-calls": WARN,
    "no-octal": ERROR,
    "no-path-concat": ERROR,
    "no-proto": WARN,
    "no-redeclare": WARN,
    "no-regex-spaces": WARN,
    "no-return-await": ERROR,
    "no-self-assign": ERROR,
    "no-self-compare": ERROR,
    "no-sequences": ERROR,
    "no-shadow": WARN,
    "no-sparse-arrays": WARN,
    "no-throw-literal": ERROR,
    "no-unexpected-multiline": WARN,
    "no-unreachable": WARN,
    "no-unsafe-finally": WARN,
    "no-unsafe-negation": WARN,
    "no-unused-labels": WARN,
    "no-unused-vars": WARN,
    "no-useless-call": WARN,
    "no-useless-concat": WARN,
    "no-useless-escape": WARN,
    "no-useless-return": WARN,
    "no-void": WARN,
    "prefer-promise-reject-errors": WARN,
    radix: WARN,
    "require-await": WARN,
    "use-isnan": ERROR,
    "valid-typeof": WARN,
    yoda: ERROR
}

const pluginPromiseRules = {
    "promise/catch-or-return": ERROR,
    "promise/no-return-wrap": WARN,
    "promise/param-names": ERROR,
    "promise/no-promise-in-callback": WARN,
    "promise/no-callback-in-promise": WARN,
    "promise/avoid-new": WARN,
    "promise/no-return-in-finally": WARN,
    "promise/prefer-await-to-callbacks": WARN
}

const regexRules = {
    "optimize-regex/optimize-regex": OFF // Waiting for fix: https://github.com/BrainMaestro/eslint-plugin-optimize-regex/pull/12
}

const reactRules = {
    "react/button-has-type": WARN,
    "react/default-props-match-prop-types": WARN,
    "react/destructuring-assignment": [WARN, "never"],
    "react/forbid-dom-props": [WARN, {forbid: ["style"]}],
    "react/forbid-foreign-prop-types": WARN,
    "react/no-access-state-in-setstate": WARN,
    "react/no-children-prop": WARN,
    "react/no-danger-with-children": ERROR,
    "react/no-deprecated": WARN,
    "react/no-did-mount-set-state": WARN,
    "react/no-did-update-set-state": WARN,
    "react/no-direct-mutation-state": ERROR,
    "react/no-find-dom-node": WARN,
    "react/no-is-mounted": WARN,
    "react/no-redundant-should-component-update": WARN,
    "react/no-render-return-value": WARN,
    "react/no-typos": WARN,
    "react/no-string-refs": WARN,
    "react/no-this-in-sfc": WARN,
    "react/no-unknown-property": WARN,
    "react/no-unused-prop-types": WARN,
    "react/no-will-update-set-state": WARN,
    "react/prefer-es6-class": WARN,
    "react/prop-types": WARN,
    "react/react-in-jsx-scope": WARN,
    "react/require-render-return": WARN,
    "react/self-closing-comp": WARN,
    "react/sort-comp": WARN,
    "react/style-prop-object": WARN,
    "react/void-dom-elements-no-children": WARN
}

const jsxRules = {
    "react/jsx-boolean-value": [WARN, "never"],
    "react/jsx-child-element-spacing": WARN,
    "react/jsx-curly-spacing": WARN,
    "react/jsx-equals-spacing": WARN,
    "react/jsx-filename-extension": WARN,
    "react/jsx-handler-names": WARN,
    "react/jsx-indent": [WARN, 4],
    "react/jsx-indent-props": [WARN, 4],
    "react/jsx-key": WARN,
    "react/jsx-max-props-per-line": [
        WARN,
        {
            maximum: 1,
            when: "multiline"
        }
    ],
    "react/jsx-no-duplicate-props": WARN,
    "react/jsx-no-target-blank": ERROR, // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    "react/jsx-no-undef": [WARN, {allowGlobals: true}],
    "react/jsx-curly-brace-presence": WARN,
    "react/jsx-pascal-case": WARN,
    "react/jsx-tag-spacing": [
        WARN,
        {
            closingSlash: "never",
            beforeSelfClosing: "never",
            afterOpening: "never",
            beforeClosing: "never"
        }
    ],
    "react/jsx-uses-react": ERROR,
    "react/jsx-uses-vars": ERROR
}

module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 8,
        sourceType: "module"
    },
    plugins: ["promise", "optimize-regex", "react"],
    rules: Object.assign({},
        esRules,
        styleRules,
        pluginPromiseRules,
        regexRules,
        reactRules,
        jsxRules)
}
