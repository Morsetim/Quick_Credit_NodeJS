"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var env = process.env.NODE_ENV || 'production';
var config = _config["default"][env];
var connectionString = config.url;
var client = new _pg.Client(connectionString);
client.connect();

var createTable = function createTable() {
  var createTableText = "\n\nDROP TABLE IF EXISTS users CASCADE;\n\nDROP TABLE IF EXISTS loans CASCADE;\n\nDROP TABLE IF EXISTS loanrepayment CASCADE;\n\nCREATE TABLE IF NOT EXISTS users(\n  id SERIAL PRIMARY KEY,\n  firstname VARCHAR(155) NOT NULL,\n  lastname VARCHAR(155) NOT NULL,\n  email VARCHAR(155) UNIQUE NOT NULL,\n  password VARCHAR(155) NOT NULL,\n  isAdmin BOOLEAN DEFAULT false,\n  status VARCHAR(155) DEFAULT 'unverified',\n  balance INTEGER DEFAULT 0,\n  homeAddress text,\n  workAddress text\n);\n\nCREATE TABLE IF NOT EXISTS loans(\n  userId int REFERENCES users(id) ON DELETE CASCADE,\n  id SERIAL PRIMARY KEY,\n  tenor VARCHAR(155) NOT NULL,\n  paymentInstallment INTEGER NOT NULL,\n  interest INTEGER NOT NULL,\n  balance INTEGER NOT NULL,\n  amount INTEGER NOT NULL,\n  repaid BOOLEAN DEFAULT false,\n  status VARCHAR(155) DEFAULT 'pending'\n);\n\nCREATE TABLE IF NOT EXISTS loanrepayment(\n  id SERIAL PRIMARY KEY,\n  userId int REFERENCES users(id) ON DELETE CASCADE,\n  loanId int REFERENCES loans(id) ON DELETE CASCADE,\n  date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  amount INTEGER NOT NULL,\n  monthlyInstallment INTEGER NOT NULL,\n  balance INTEGER NOT NULL\n)";
  client.query(createTableText, function (err) {
    // console.log(createTableText, "===============")
    if (err) {
      return err.message;
    }

    client.end();
  });
};

createTable();