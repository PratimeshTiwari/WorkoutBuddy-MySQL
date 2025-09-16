import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/db.js';
import { JWT_SECRET } from '../constants.js';

const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Incorrect email'
            });
        }

        const user = users[0];

        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return res.status(400).json({
                success: false,
                error: 'Incorrect password'
            });
        }

        const token = createToken(user.id);

        res.status(200).json({
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                error: 'Email already in use'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const [result] = await pool.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hash]
        );

        const token = createToken(result.insertId);

        res.status(200).json({
            email,
            token
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

export {loginUser, signupUser};