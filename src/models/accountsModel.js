const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');
const tableName = 'accounts';

async function accountsToDb(userId, groupId) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO ${tableName} (user_id, group_id)VALUES(?,?)`;
    const [dataFromDb] = await connection.execute(sql, [userId, groupId]);
    await connection.close();
    return dataFromDb;
  } catch (error) {
    console.log('beda su db', error);
    return false;
  }
}

async function getAllGroupsDb(userId) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql =
      'SELECT accounts.user_id, accounts.group_id, groups.name AS groups FROM accounts LEFT JOIN groups ON accounts.groups.id=accounts.group_id WHERE user_id=?';

    const [dataFromDb] = await connection.execute(sql, [userId]);
    await connection.close();
    return dataFromDb;
  } catch (error) {
    console.log('beda su db', error);
    return false;
  }
}

module.exports = { accountsToDb, getAllGroupsDb };
