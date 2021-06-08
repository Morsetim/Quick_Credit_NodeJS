import {Pool} from 'pg';
// import dotenv from 'dotenv';
// import configuration from '../config/config';

// const env = process.env.NODE_ENV || 'production';
// console.log(env, '===============env');

// const config = configuration[env];
// console.log(config, '-------cofig');
// const connectionString = config.url;
// console.log(connectionString, '========09090')
// dotenv.config();

const db = new Pool({connectionString: 'postgres://newnkymy:DcRPimLCOcd-IbU6Idu2o21JQDaIDpDq@isilo.db.elephantsql.com/newnkymy'});
db.connect().then(() =>{
    console.log('Successfully connected to PostgresDB');
    console.log(connectionString, "==========Connected=========");
}).catch((err) =>{
    console.log(err.message);
});



export default db;