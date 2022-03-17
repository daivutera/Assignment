const mysql = require('mysql2/promise');

const dbConfig = require('../dbConfig');

const tableName = 'users';

async function userLoginDb(email) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM ${tableName} WHERE email=?`;
    const [dataFromDb] = await connection.execute(sql, [email]);
    await connection.close();
    return dataFromDb;
  } catch (error) {
    return false;
  }
}

async function registerUserToDb(fullName, email, password) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('prisijungiau');
    const sql = `INSERT INTO ${tableName} (full_name, email, password)VALUES(?,?,?)`;
    const [dataFromDb] = await connection.execute(sql, [
      fullName,
      email,
      password,
    ]);
    await connection.close();
    return dataFromDb;
  } catch (error) {
    return false;
  }
}

module.exports = { registerUserToDb, userLoginDb };
