"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "signUp",
    value: function signUp(req, res) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          password = _req$body.password,
          homeAddress = _req$body.homeAddress,
          workAddress = _req$body.workAddress;

      var hashedPassword = _bcryptjs["default"].hashSync(password, 10);

      _db["default"].query("SELECT id FROM users WHERE email = '".concat(email, "'")).then(function (userFound) {
        if (userFound.rows.length === 1) {
          return res.status(409).json({
            status: 'Failed',
            message: 'User Already Exist'
          });
        }

        var sql = 'INSERT INTO users(firstName, lastName, email, password, homeAddress, workAddress) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
        var params = [firstName, lastName, email, hashedPassword, homeAddress, workAddress];

        _db["default"].query(sql, params).then(function (user) {
          var payload = {
            userId: user.rows[0].id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            homeAddress: homeAddress,
            workAddress: workAddress
          };

          var token = _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 10 // 10 hours

          });

          req.token = token;
          return res.status(201).json({
            status: 201,
            message: 'Successfully created QuickCredit account',
            token: token
          });
        })["catch"](function (err) {
          return res.status(500).json({
            status: 'Failed',
            message: err.message
          });
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      _db["default"].query("SELECT * FROM users WHERE email = '".concat(email, "'")).then(function (user) {
        if (user.rows.length === 1) {
          var comparePassword = _bcryptjs["default"].compareSync(password, user.rows[0].password);

          if (comparePassword) {
            var payload = {
              userId: user.rows[0].id,
              email: email,
              firstName: user.rows[0].firstName,
              lastName: user.rows[0].lastName,
              homeAddress: user.rows[0].homeAddress,
              workAddress: user.rows[0].workAddress
            };

            var token = _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 10
            }); // Expires in 10 hours


            req.token = token;
            return res.status(201).json({
              status: 'Success',
              message: 'successfull login',
              token: token
            });
          }
        }

        return res.status(422).json({
          status: 'Failed',
          message: 'Invalid Email or Password'
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
  }, {
    key: "verified",
    value: function verified(req, res) {
      var useremail = req.params.useremail;
      var userProfile = "UPDATE users SET status =$1 WHERE email = $2 RETURNING *";
      var params = ['verified', useremail];

      _db["default"].query(userProfile, params).then(function (user) {
        return res.status(201).json({
          status: 201,
          data: user.rows[0]
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
  }, {
    key: "updateUserRole",
    value: function updateUserRole(req, res) {
      var id = req.params.id;
      var sql = "UPDATE users SET isAdmin = ".concat(true, " WHERE id = ", id);

      _db["default"].query(sql).then(function (user) {
        res.json({
          message: 'Successffuly update user role',
          isAdmin: user.rows[0]
        });
      })["catch"](function (e) {
        return console.log(e.message);
      });
    }
  }]);

  return UserController;
}();

var _default = new UserController();

exports["default"] = _default;