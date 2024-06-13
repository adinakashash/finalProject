const db = require('../mongodb://localhost:27017');

const getUserById = async (userId) => {
   const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
   return user;
};

const createUser = async (userData) => {
   const result = await db.query('INSERT INTO users SET ?', userData);
   return result.insertId;
};

module.exports = {
   getUserById,
   createUser
};