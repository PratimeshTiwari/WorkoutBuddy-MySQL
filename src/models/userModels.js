// import bcrypt from 'bcrypt';
// import { pool } from '../db/db.js';

// class UserModel {
//   static async createTable() {
//     const query = `
//       CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//       )
//     `;
//     await pool.query(query);
//   }

//   static async signup(email, password) {
//     try {
//       const [existingUsers] = await pool.query(
//         'SELECT * FROM users WHERE email = ?',
//         [email]
//       );

//       if (existingUsers.length > 0) {
//         throw Error('Email already in use');
//       }

//       const salt = await bcrypt.genSalt(10);
//       const hash = await bcrypt.hash(password, salt);

//       const [result] = await pool.query(
//         'INSERT INTO users (email, password) VALUES (?, ?)',
//         [email, hash]
//       );

//       const user = {
//         id: result.insertId,
//         email: email
//       };

//       return user;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async login(email, password) {
//     try {
//       const [users] = await pool.query(
//         'SELECT * FROM users WHERE email = ?',
//         [email]
//       );

//       if (users.length === 0) {
//         throw Error('Incorrect email');
//       }

//       const user = users[0];

//       const match = await bcrypt.compare(password, user.password);
      
//       if (!match) {
//         throw Error('Incorrect password');
//       }

//       return {
//         id: user.id,
//         email: user.email
//       };
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async findByEmail(email) {
//     const [users] = await pool.query(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );
//     return users[0] || null;
//   }

//   static async findById(id) {
//     const [users] = await pool.query(
//       'SELECT id, email FROM users WHERE id = ?',
//       [id]
//     );
//     return users[0] || null;
//   }
// }

// export default UserModel;