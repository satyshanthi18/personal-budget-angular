// Budget API

const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const fs = require('fs');
const cors = require('cors');

// app.use ('/', express.static('public'));



// app.get('/hello', (req, res) => {
//     res.send('Hello World!');
// });

app.use(cors());

app.get('/budget', (req, res) => {
    fs.readFile('Data.json','utf8',(err,data) => {
        if(err) {
            console.error(err);
            return res.status(500).send('Error reading budget data');
        }
        const budget = JSON.parse(data);
        res.json(budget);
    });
});

app.listen(port, () => {
console.log(`API served at http://localhost:${port}`);
});