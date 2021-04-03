const express = require('express'),
    morgan = require('morgan');
const { restart } = require('nodemon');
    uuidv4 = require('uuid/v4'),
    mongoose = require('mongoose'),
    models = require('./models.js');

const app = express();
const uuid = uuidv4();
const movies = models.Movie;
const users = models.User;
const genres = models.Genre;
const directors = models.Director;
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/pocketMovies', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

//middleware
app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());

// Error catch all
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//calls index.html on site load
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

//allows documentation access without .html
app.get('/documentation', (req, res) => {
    res.redirect('/documentation.html');
});

// get list of movies
app.get('/movies', (req, res) => {
    movies.find().populate([
        {path: 'Genres',  model: genres},
        {path: 'Directors',  model: directors}
    ])
    .then(movies => res.json(movies))
    .catch((error) => res.status(500).send(`Error: ${error}`));
});

// get movie by title
app.get('/movies/:Title', (req, res) => {
    movies.findOne({Title: req.params.Title})
    .populate([
        {path: 'Genres',  model: genres},
        {path: 'Directors',  model: directors}
    ])
    .then((movie) => res.json(movie))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

// get list of featured movies
app.get('/featured', (req, res) => {
    movies.find({Featured: true}).populate([
        {path: 'Genres', model: genres},
        {path: 'Directors', model: directors}
    ])
    .then((movie) => res.json(movie))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

// get list of directors
app.get('/directors', (req, res) => {
    directors.find().then((director) => res.json(director))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

// get director by name
app.get('/directors/:Name', (req, res) => {
    directors.find({Name: req.params.Name})
    .then((director) => res.json(director))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

//get list of users
app.get('/users', (req, res) => {
    users.find().populate({
        path: 'Favorites', model: movies,
        populate: [{path: 'Directors', model: directors}, {path: 'Genres', model: genres}]
    })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

// get user by username
app.get('/users/:Username', (req, res) => {
    users.findOne({Username: req.params.Username})
    .populate({
        path: 'Favorites', model: movies,
        populate: [{path: 'Directors', model: directors}, {path: 'Genres', model: genres}]
    })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

//add favorite movie
app.post('/users/:Username/favorites/push/:MovieID', (req, res) => {
    const MovieID = mongoose.Types.ObjectId(req.params.MovieID);
    users.findOneAndUpdate({Username: req.params.Username},
    {$addToSet:
        {Favorites: MovieID}
    },
    {new: true},
    (err, updatedUser) => {
        if(err) return res.status(500).send(`Error: ${err}`);

        return res.json(updatedUser);
    });
});

//remove favorite movie
app.post('/users/:Username/favorites/pull/:MovieID', (req, res) => {
    const MovieID = mongoose.Types.ObjectId(req.params.MovieID);
    users.findOneAndUpdate({Username: req.params.Username},
    {$pull:
        {Favorites: MovieID}
    },
    {new: true},
    (err, updatedUser) => {
        if(err) return res.status(500).send(`Error: ${err}`);

        return res.json(updatedUser);
    });
});

//add new user
app.post('/users', (req, res) => {
    users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
        Favorites: []
    })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).send(`Error: ${err}`))
});

//change user name
app.put('/users/:Username', (req, res) => {
    users.findOneAndUpdate({ Username: req.params.Username },
    { $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    { new: true },
    (err, updatedUser) => {
        if(err) return res.status(500).send('Error: ' + err);

        return res.json(updatedUser);
    });
});

app.delete('/users/:Username', (req, res) => {
    users.findOneAndRemove({Username: req.params.Username})
    .then((user) => {
        if(!user) return res.status(400).send(`${req.params.Username} was not found`);

        return res.status(200).send(`${req.params.Username} was deleted`);
    })
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));