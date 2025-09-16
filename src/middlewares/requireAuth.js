import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';
import { pool } from '../db/db.js';

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const [users] = await pool.query(
            'SELECT id, email FROM users WHERE id = ?',
            [id]
        );

        if (users.length === 0) {
            throw new Error('User not found');
        }

        req.user = users[0];
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

export default requireAuth;