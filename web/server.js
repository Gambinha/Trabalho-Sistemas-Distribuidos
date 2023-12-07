import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = process.env.API_URL;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');


app.get('/', (req, res) => {
    res.render('login', { apiUrl: API_URL })
});

app.get('/signup', (req, res) => {
    res.render('signup', { apiUrl: API_URL })
});

app.get('/todoList', (req, res) => {
    res.render('todoList', { apiUrl: API_URL })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});