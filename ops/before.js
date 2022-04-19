const path = require("path");
var copy = require('recursive-copy');
const del = require('del');

del.sync([path.resolve(__dirname, "./../dist")]);

copy(path.resolve(__dirname, "./../src/views"), path.resolve(__dirname, "./../dist/views"), function (error, results) { });
copy(path.resolve(__dirname, "./../src/assets"), path.resolve(__dirname, "./../dist/assets"), function (error, results) { });
copy(path.resolve(__dirname, "./../src/css"), path.resolve(__dirname, "./../dist/css"), function (error, results) { });