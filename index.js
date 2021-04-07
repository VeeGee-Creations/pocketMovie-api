const express = require('express'),
    morgan = require('morgan'),
    uuidv4 = require('uuid/v4'),
    mongoose = require('mongoose'),
    passport = require('passport');
const { restart } = require('nodemon');

require('./passport');

const app = express();
const uuid = uuidv4();
const models = require('./models.js'),
    auth = require('./auth')(app);
const Movies = models.Movie;
const Users = models.User;
const Genres = models.Genre;
const Directors = models.Director;
const passAuth =  passport.authenticate('jwt', {session: false});
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
app.get('/movies', passAuth, (req, res) => {
    Movies.find().populate([
        {path: 'Genres',  model: Genres},
        {path: 'Directors',  model: Directors}
    ])
    .then(Movies => res.json(Movies))
    .catch((error) => res.status(500).send(`Error: ${error}`));
});

// get movie by title
app.get('/movies/:Title', passAuth, (req, res) => {
    Movies.findOne({Title: req.params.Title})
    .populate([
        {path: 'Genres',  model: Genres},
        {path: 'Directors',  model: Directors}
    ])
    .then((movie) => res.json(movie))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

// get list of featured movies
app.get('/featured', passAuth, (req, res) => {
    Movies.find({Featured: true}).populate([
        {path: 'Genres', model: Genres},
        {path: 'Directors', model: Directors}
    ])
    .then((movie) => res.json(movie))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

// get list of directors
app.get('/directors', passAuth, (req, res) => {
    Directors.find().then((director) => res.json(director))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

// get director by name
app.get('/directors/:Name', passAuth, (req, res) => {
    Directors.find({Name: req.params.Name})
    .then((director) => res.json(director))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

//get list of users
// app.get('/users', (req, res) => {
//     Users.find().populate({
//         path: 'Favorites', model: Movies,
//         populate: [{path: 'Directors', model: Directors}, {path: 'Genres', model: Genres}]
//     })
//     .then((user) => res.json(user))
//     .catch((err) => res.status(500).send(`Error: ${err}`));
// });

// get user by username
app.get('/users/:Username', passAuth, (req, res) => {
    Users.findOne({Username: req.params.Username})
    .populate({
        path: 'Favorites', model: Movies,
        populate: [{path: 'Directors', model: Directors}, {path: 'Genres', model: Genres}]
    })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

//add favorite movie
app.post('/users/:Username/favorites/push/:MovieID', passAuth, (req, res) => {
    const MovieID = mongoose.Types.ObjectId(req.params.MovieID);
    Users.findOneAndUpdate({Username: req.params.Username},
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
app.post('/users/:Username/favorites/pull/:MovieID', passAuth, (req, res) => {
    const MovieID = mongoose.Types.ObjectId(req.params.MovieID);
    Users.findOneAndUpdate({Username: req.params.Username},
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
    Users.create({
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
app.put('/users/:Username', passAuth, (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username },
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

app.delete('/users/:Username', passAuth, (req, res) => {
    Users.findOneAndRemove({Username: req.params.Username})
    .then((user) => {
        if(!user) return res.status(400).send(`${req.params.Username} was not found`);

        return res.status(200).send(`${req.params.Username} was deleted`);
    })
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));