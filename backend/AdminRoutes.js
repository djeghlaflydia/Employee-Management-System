import express from 'express';
import con from './connectDB.js';

const router = express.Router();

// Route pour login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    con.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database query error' });
        }

        if (results.length > 0) {
            return res.status(200).json({ message: 'Logged in successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
    });
});

// Route pour sign up
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    con.query(query, [username, email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database query error' });
        }

        return res.status(200).json({ message: 'Registered successfully!' });
    });
});

export default router;
