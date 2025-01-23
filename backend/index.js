import express from 'express';
import bodyParser from 'body-parser';
import con from './connectDB.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Déclaration de l'application avant d'utiliser app.use()
const app = express();
const port = process.env.PORT || 5000;

// Conversion de l'URL en chemin pour obtenir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); // Utilisation de cors après la déclaration de app
app.use(bodyParser.json());

// Route pour login
app.post('/login', (req, res) => {
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
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    con.query(query, [username, email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database query error' });
        }

        return res.status(200).json({ message: 'Registered successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
