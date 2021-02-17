const express = require('express')
const app = express()

const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysql'
});


app.get('/api/v1/index', (req, res) => {
    pool.query('select * from Users', (error, response) => {
        res.status(200).json({
            response: response
        })
    });
})

app.get('/api/v1/show/:id', (req, res) => {
    pool.query('select * from Users where id = ?', req.params.id, (error, response) => {
        res.status(200).json({
            response: response[0]
        })
    });
})

app.listen(5432, () => {
    console.log('running api')
})