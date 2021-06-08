"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkAdmin = function checkAdmin(req, res, next) {
  var userId = req.decoded.userId;

  _db["default"].query("SELECT isAdmin FROM users WHERE id = ".concat(userId)).then(function (isAdmin) {
    if (isAdmin.rows[0].isadmin === false) {
      return res.json({
        message: 'Permission denied'
      });
    }

    next();
  });
};

var _default = checkAdmin;
exports["default"] = _default;