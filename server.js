const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'messages.json');

app.use(express.static(__dirname));
app.use(bodyParser.json());

//GET messages
app.get('/messages', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send(err);
        res.json(JSON.parse(data));
    });
});

//POST new message
app.post('/messages', (req, res) => {
    const {text} = req.body;
    if(!text) return res.status(400).send('Message text required.');

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if(err) return res.status(500).send(err);

        const messages = JSON.parse(data);
        messages.push({id: Date.now(), text});
        fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), (err) => {
            if (err) return res.status(500).send(err);
            res.json({success: true, message: {id: Date.now(), text}});
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));