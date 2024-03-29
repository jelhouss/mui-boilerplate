module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app", "@storybook/addon-a11y", "@storybook/addon-coverage"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  features: {
    interactionsDebugger: true
  },
  staticDirs: ["../public"],
  docs: {
    autodocs: true
  }
};