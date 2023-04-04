module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-rational-order"],
  plugins: [
    "stylelint-order",
    "stylelint-declaration-block-no-ignored-properties",
  ],
  rules: {
    // "declaration-colon-space-after": false,
    // "declaration-colon-space-before": false,
    "declaration-block-trailing-semicolon": null,
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment", "first-nested"],
      },
    ],
    "plugin/declaration-block-no-ignored-properties": true,
    "selector-class-pattern": null,
    "no-descending-specificity": null,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: "input-placeholder",
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["input-placeholder"],
      },
    ],
    "no-duplicate-selectors": null,
  },
};
