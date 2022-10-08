const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');
const { connect } = require('./routes');

const pool = mysql.createPool(database);

pool.getConnection((error, connection) => {
    if (error) {
        if (error === 'PROTOCOLAR_CONNECTION_LOST') {
            console.log('DATABASE CONNECTION WAS CLOSED');
        }
        if (error === 'ER_CON_COUNT_ERROR') {
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (error === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;