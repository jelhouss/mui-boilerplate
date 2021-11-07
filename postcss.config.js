// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const tailwindcss = require("tailwindcss")

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),

    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    require("autoprefixer")
  ]
}
