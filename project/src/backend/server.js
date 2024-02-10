const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');


const admin = require("firebase-admin");
var firebaseCredentials = require('../../secrets/code-for-change-2024-firebase-adminsdk-ia6uq-98abbd7a40.json');
admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials)
  });

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../src/views'));
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Info page
app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/signup', (req, res) => {
    res.render('signup');
    console.log("sign up selected");
});

app.post('/signupcreated', async(req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    const userResponse = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        emailVerified: false,
        disabled: false
    })
    console.log("sign up submitted");
    res.json(userResponse);
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
