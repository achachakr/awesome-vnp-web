// .eslintrc.js
module.exports = {
  root: true,
  env: { node: true },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
  parserOptions: { ecmaVersion: 2020 },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  rules: {
    // 지금 뜨는 경고들 끄기
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
  },
};
