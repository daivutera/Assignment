/* eslint-disable comma-dangle */
const mysql = require('mysql2/promise');

const dbConfig = require('../dbConfig');

const tableName = 'bills';

async function getBillsByIdDb(groupId) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM ${tableName} WHERE group_id=?`;
    const [dataFromDb] = await connection.execute(sql, [groupId]);
    await connection.close();
    return dataFromDb;
  } catch (error) {
    return false;
  }
}

async function postBillToGroupDb(
  groupIdReceived,
  amountReceived,
  descriptionReceived
) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO ${tableName} (group_id, amount, description) VALUES(?,?,?)`;
    const [dataFromDb] = await connection.execute(sql, [
      groupIdReceived,
      amountReceived,
      descriptionReceived,
    ]);
    await connection.close();
    return dataFromDb;
  } catch (error) {
    return false;
  }
}

module.exports = { getBillsByIdDb, postBillToGroupDb };
