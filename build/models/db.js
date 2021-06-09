"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var env = process.env.NODE_ENV || 'development';
console.log(env, '===============env');
var config = _config["default"][env];
console.log(config, '-------cofig');
var connectionString = config.url;
console.log(connectionString, '========09090');

_dotenv["default"].config();

var db = new _pg.Pool({
  connectionString: connectionString
});
db.connect().then(function () {
  console.log('Successfully connected to PostgresDB');
  console.log(connectionString, "==========Connected=========");
})["catch"](function (err) {
  console.log(err.message);
});
var _default = db;
exports["default"] = _default;