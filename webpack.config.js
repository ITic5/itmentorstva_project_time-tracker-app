const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/script.js",
    output: {
        filename: "script.min.js",
        path: path.resolve(__dirname, "dist"),
    },
};