const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // -------------------------
  // 🧩 Entry & Output
  // -------------------------
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    assetModuleFilename: "assets/[hash][ext][query]", // For images & fonts
    clean: true, // Clean /dist before each build
  },

  // -------------------------
  // ⚙️ Mode & DevServer
  // -------------------------
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true, // For React Router (optional)
  },

  // -------------------------
  // 🧠 Resolve Settings
  // -------------------------
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"), // Optional: use "@/..." imports
    },
  },

  // -------------------------
  // 🧱 Loaders
  // -------------------------
  module: {
    rules: [
      // JavaScript / JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      // CSS + PostCSS (Tailwind)
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      // Images (JPG, PNG, GIF, SVG)
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      // Fonts or other assets (optional)
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  // -------------------------
  // 🧩 Plugins
  // -------------------------
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      minify: false, // Set to true for production
    }),
  ],
};
