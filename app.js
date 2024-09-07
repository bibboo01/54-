const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, './pubilc')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views', 'Index.html'));
});
app.get('/pass', (req, res) => {
    res.sendFile(path.join(__dirname, './views', 'index_pass.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, './views', 'Form.html'));
});

app.get('/manage', (req, res) => {
    res.sendFile(path.join(__dirname, './views', 'list_user.html'));
});

app.get('/std/manage', (req, res) => {
    res.sendFile(path.join(__dirname, './views', 'std_info.html'));
});


mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log("MONGO DB connected") })
    .catch(err => console.log(err));


const Mystudent = require('./routes/student_route');
const Myauth = require('./routes/auth_route');

app.use('/std', Mystudent);
app.use('/auth', Myauth);


app.listen(process.env.PORT,
    () => console.log("Server run on http://localhost:" + process.env.PORT));