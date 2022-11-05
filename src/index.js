const express = require('express');
const { Client } = require('pg');
const { config } = require('dotenv');

config();
const connecting = new Client(process.env.DATABASE_URL);
connecting.connect();

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
    const { name, age } = req.body;
    const { rows } = await connecting.query(`
        insert into users(name, age)
        values($1, $2)
        returning id;
    `, [name, age]);

    res.json(rows[0]);
});

app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { rows } = await connecting.query(`
        select *
        from users
        where id = $1;
    `, [+userId]);

    res.json(rows[0]);
});

app.get('/users', async (req, res) => {
    const { limit = 5, skip = 0 } = req.query;
    const { rows } = await connecting.query(`
        select *
        from users
        limit $1 offset $2;
    `, [+limit, +skip]);

    res.json(rows);
});



app.listen(3000, () => {
    console.log('http://localhost:3000');
});
