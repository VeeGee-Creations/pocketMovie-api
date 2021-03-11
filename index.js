const express = require('express'),
    morgan = require('morgan'),
    topTen = require('./top-ten');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('common'));
app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.send(`<h1>Cult Watcher</h1>
    <h2>Find your new obsession</h2>`);
});

app.get('/movies', (req, res) => res.json(topTen));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));