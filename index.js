const express = require('express'),
    morgan = require('morgan'),
    movies = require('./movies');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(morgan('common'));
app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.get('/documentation', (req, res) => {
    res.redirect('/documentation.html');
});

app.get('/movies', (req, res) => res.json(movies));

app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) =>
    {return movie.title === req.params.title}));
});

app.get('/featured', (req, res) => {
    res.json(movies.filter((movie) =>
    {return movie.featured}));
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));