import { Client } from 'pg';
import dotenv from 'dotenv';
import configuration from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV || 'production';
const config = configuration[env];
const connectionString = config.url;

const client = new Client(connectionString);
client.connect();

const createTable = () => {

const createTableText =`

DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS loans CASCADE;

DROP TABLE IF EXISTS loanrepayment CASCADE;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(155) NOT NULL,
  lastname VARCHAR(155) NOT NULL,
  email VARCHAR(155) UNIQUE NOT NULL,
  password VARCHAR(155) NOT NULL,
  isAdmin BOOLEAN DEFAULT false,
  status VARCHAR(155) DEFAULT 'unverified',
  balance INTEGER DEFAULT 0,
  homeAddress text,
  workAddress text
);

CREATE TABLE IF NOT EXISTS loans(
  userId int REFERENCES users(id) ON DELETE CASCADE,
  id SERIAL PRIMARY KEY,
  tenor VARCHAR(155) NOT NULL,
  paymentInstallment INTEGER NOT NULL,
  interest INTEGER NOT NULL,
  balance INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  repaid BOOLEAN DEFAULT false,
  status VARCHAR(155) DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS loanrepayment(
  id SERIAL PRIMARY KEY,
  userId int REFERENCES users(id) ON DELETE CASCADE,
  loanId int REFERENCES loans(id) ON DELETE CASCADE,
  date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  amount INTEGER NOT NULL,
  monthlyInstallment INTEGER NOT NULL,
  balance INTEGER NOT NULL
)`;

client.query(createTableText, (err) => {
  // console.log(createTableText, "===============")
  if (err) {
    return err.message;
  }
  client.end();
});

};
createTable();

