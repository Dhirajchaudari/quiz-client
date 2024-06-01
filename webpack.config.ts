import DotenvPlugin from 'webpack-dotenv-plugin'

module.exports = {
  //...
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
  plugins: [
    new DotenvPlugin()
  ]
};
