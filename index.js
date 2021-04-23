const express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    cors = require('cors'),
    {check, validationResult} = require('express-validator');

require('./passport');

const app = express();
const models = require('./models.js'),
    auth = require('./auth')(app);
const Movies = models.Movie;
const Users = models.User;
const Genres = models.Genre;
const Directors = models.Director;
const passAuth =  passport.authenticate('jwt', {session: false});
const PORT = process.env.PORT || 8080;

//middleware
app.options('*', cors());
app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/pocketMovies', {
mongoose.connect(process.env.CONNECTION_URI, {
useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
});

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
    Movies.find().populate([
        {path: 'Genres',  model: Genres},
        {path: 'Directors',  model: Directors}
    ])
    .then(Movies => res.json(Movies))
    .catch((error) => res.status(500).send(`Error: ${error}`));
});

// get movie by title
app.get('/movies/:Title', passAuth, (req, res) => {
    Movies.find({Title: { $regex: req.params.Title, $options: "i"}})
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

// get user profile

app.get('/users/profile', passAuth, (req, res) => {
    Users.findOne({Username: req.user.Username})
    .populate({
        path: 'Favorites', model: Movies,
        populate: [{path: 'Directors', model: Directors}, {path: 'Genres', model: Genres}]
    })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

//add favorite movie
app.post('/users/favorites/push/:MovieID', passAuth, (req, res) => {
    const MovieID = mongoose.Types.ObjectId(req.params.MovieID);
    Users.findOneAndUpdate({Username: req.user.Username},
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
app.post('/users/favorites/pull/:MovieID', passAuth, (req, res) => {
    const MovieID = mongoose.Types.ObjectId(req.params.MovieID);
    Users.findOneAndUpdate({Username: req.user.Username},
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
app.post('/users', [
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password minimum length of 8 characters.').isLength({min: 8}),
    check('Email', 'Email does not appear to be valid.').isEmail()
], (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(422).json({Error: errors.array()});

    const hashedPassword = Users.hashPassword(req.body.Password);

    Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
        Favorites: []
    })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(422).send(`Error: ${err}`))
});

//change user information
app.put('/users/', passAuth, [
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password minimum length of 8 characters.').isLength({min: 8}),
    check('Email', 'Email does not appear to be valid.').isEmail()
], (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(422).json({Error: errors.array()});

    const hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOneAndUpdate({ Username: req.user.Username },
    { $set:
        {
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    { new: true },
    (err, updatedUser) => {
        if(err) return res.status(422).send('Error: ' + err);

        return res.json(updatedUser);
    });
});

app.delete('/users', passAuth, (req, res) => {
    Users.findOneAndRemove({Username: req.user.Username})
    .then((user) => {
        if(!user) return res.status(400).send(`${req.user.Username} was not found`);

        return res.status(200).send(`${req.user.Username} was deleted`);
    })
});

app.listen(PORT, '0.0.0.0', () => console.log(`Listening on port ${PORT}.`));