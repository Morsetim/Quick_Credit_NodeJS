import {Pool} from 'pg';
import dotenv from 'dotenv';
import configuration from '../config/config';

const env = process.env.NODE_ENV || 'development';
console.log(env, '===============env');

const config = configuration[env];
console.log(config, '-------cofig');
const connectionString = config.url;
console.log(connectionString, '========09090')
dotenv.config();

const db = new Pool({connectionString});
db.connect().then(() =>{
    console.log('Successfully connected to PostgresDB');
    console.log(connectionString, "==========Connected=========");
}).catch((err) =>{
    console.log(err.message);
});



export default db;