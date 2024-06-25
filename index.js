const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Logins
let possibleLogins = [
    { username: 'admin', password: 'password' },
    { username: 'user', password: 'password' },
    { username: 'guest', password: 'password' },
];

// Login API
app.get('/api/login_check', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (username && password) {
        const login = possibleLogins.find(login => login.username === username && login.password === password);
        if (login) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Missing username or password' });
    }
});

app.get('/api/logins', (req, res) => { 
    res.send(possibleLogins);
});

// Math questions API
app.get('/api/math_question/easy', async (req, res) => {
    let mathSigns = ['+', '-', '*', '/'];
    let randomSign = mathSigns[Math.floor(Math.random() * mathSigns.length)];
    let number1 = Math.floor(Math.random() * 10) + 1;
    let number2 = Math.floor(Math.random() * 10) + 1;
    let question = `What is ${number1} ${randomSign} ${number2}?`;
    let answer = eval(`${number1} ${randomSign} ${number2}`);
    res.send({ question, number1, number2, answer });
});

app.get('/api/math_question/medium', async (req, res) => {
    let mathSigns = ['*', '/'];
    let randomSign = mathSigns[Math.floor(Math.random() * mathSigns.length)];
    let number1 = Math.floor(Math.random() * 100) + 1;
    let number2 = Math.floor(Math.random() * 100) + 1;
    let question = `What is ${number1} ${randomSign} ${number2}?`;
    let answer = eval(`${number1} ${randomSign} ${number2}`);
    res.send({ question, number1, number2, answer });
});

app.get('/api/math_question/hard', async (req, res) => {
    let mathSigns = ['+', '-', '*', '/'];
    let randomSign = mathSigns[Math.floor(Math.random() * mathSigns.length)];
    let number1 = Math.floor(Math.random() * 1000) + 1;
    let number2 = Math.floor(Math.random() * 1000) + 1;
    let question = `What is ${number1} ${randomSign} ${number2}?`;
    let answer = eval(`${number1} + ${number2}`);
    res.send({ question, number1, number2, answer });
});


module.exports = app;
