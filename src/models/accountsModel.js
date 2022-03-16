const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');
const tableName = 'accounts';

async function accountsToDb(userId, groupId) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('prisijungiau');
    const sql = `INSERT INTO ${tableName} (user_id, group_id)VALUES(?,?)`;
    const [dataFromDb] = await connection.execute(sql, [userId, groupId]);
    await connection.close();
    return dataFromDb;
  } catch (error) {
    console.log('beda su db', error);
    return false;
  }
}

module.exports = { accountsToDb };
