"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _router = _interopRequireDefault(require("./routes/router"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const Debug = debug('checker');
var app = (0, _express["default"])();
var port = parseInt(process.env.PORT, 10) || 4000;
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  res.send({
    message: "Welcome to QuickCredit Loan App"
  });
});
app.use('/api/v1', _router["default"]);
app.use('*', function (req, res) {
  res.status(404);
  res.json({
    status: 'Failed',
    message: 'Page not found'
  });
});
app.listen(port, function () {
  console.log("Application listening at port ".concat(port));
});
var _default = app;
exports["default"] = _default;