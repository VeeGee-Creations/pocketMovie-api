const express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    cors = require('cors'),
    {check, validationResult} = require('express-validator');

require('./passport');

/**
 * cors options
 * @constant
 * @type {object}
 * @default
 */
const corsOptions = {
    origin: process.env.CORS_WHITELIST,
    optionsSuccessStatus: 200,
    methods: 'GET, PUT, POST, DELETE, OPTIONS'
}
    
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
app.use(cors(corsOptions));
app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URI, {
useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
});

/**
 * catches uncaught errors
 * @param {express.error} err
 * @param {express.request} req
 * @param {express.response} res
 * @param {express.NextFunction} next
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/**
 * redirects root to index.html
 * @param {express.request} req
 * @param {express.response} res
 */
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

/**
 * redirects /documentation to documentation.html
 * @param {express.request} req
 * @param {express.response} res
 */
app.get('/documentation', (req, res) => {
    res.redirect('/documentation.html');
});

/**
 * /movies endpoint
 * method: get
 * get all movies and populates
 * @param {express.request} req
 * @param {express.response} res
 */
app.get('/movies', passAuth, (req, res) => {
    Movies.find().populate([
        {path: 'Genres',  model: Genres},
        {path: 'Directors',  model: Directors}
    ])
    .then(Movies => res.json(Movies))
    .catch((error) => res.status(500).send(`Error: ${error}`));
});

/**
 * /movies/:Title endpoint
 * get: movie by title and populates
 * @param {express.request} req
 * @param {express.response} res
 */
app.get('/movies/:Title', passAuth, (req, res) => {
    Movies.find({Title: { $regex: req.params.Title, $options: "i"}})
    .populate([
        {path: 'Genres',  model: Genres},
        {path: 'Directors',  model: Directors}
    ])
    .then((movie) => res.json(movie))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

/**
 * /featured endpoint
 * get: movies with featured tag and populates
 * @param {express.request} req
 * @param {express.response} res
 */
app.get('/featured', passAuth, (req, res) => {
    Movies.find({Featured: true}).populate([
        {path: 'Genres', model: Genres},
        {path: 'Directors', model: Directors}
    ])
    .then((movie) => res.json(movie))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

/**
 * /directors endpoint
 * get: all directors
 * @param {express.request} req
 * @param {express.response} res
 */
app.get('/directors', passAuth, (req, res) => {
    Directors.find().then((director) => res.json(director))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

/**
 * /genres endpoint
 * method: get
 * all genres
 * @param {express.request} req
 * @param {express.response} res
 */
app.get('/genres', passAuth, (req, res) => {
    Genres.find().then((genre) => res.json(genre))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

/**
 * /directors/:Name endpoint
 * method: get
 * director by name
 * @param {express.request} req
 * @param {express.response} res
 */
app.get('/directors/:Name', passAuth, (req, res) => {
    Directors.find({Name: req.params.Name})
    .then((director) => res.json(director))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

/**
 * /users/profile endpoint
 * method: get
 * user profile
 * @param {express.request} req
 * @param {express.response} res
 */
app.get('/users/profile', passAuth, (req, res) => {
    Users.findOne({Username: req.user.Username})
    .populate({
        path: 'Favorites', model: Movies,
        populate: [
            {path: 'Directors', model: Directors},
            {path: 'Genres', model: Genres}
        ]
    })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).send(`Error: ${err}`));
});

/**
 * /users/favorites/push/:MovieID endpoint
 * method: post
 * add MovieID to user favorites
 * @param {express.request} req
 * @param {express.response} res
 */
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

/**
 * /users/favorites/pull/:MovieID endpoint
 * method post
 * remove MovieID from user favorites
 * @param {express.request} req
 * @param {express.response} res
 */
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

/**
 * /users endpoint
 * method: post
 * register user profile
 * expects Username, Password, Email, Birthday
 * @param {express.request} req
 * @param {express.response} res
 */
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

/**
 * /users/ endpoint
 * method: put
 * update user profile
 * expects Username, Password, Email, Birthday
 * @param {express.request} req
 * @param {express.response} res
 */
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

/**
 * /users endpoint
 * method: delete
 * delete user profile
 * @param {express.request} req
 * @param {express.response} res
 */
app.delete('/users', passAuth, (req, res) => {
    Users.findOneAndRemove({Username: req.user.Username})
    .then((user) => {
        if(!user) return res.status(400).send(`${req.user.Username} was not found`);

        return res.status(200).send(`${req.user.Username} was deleted`);
    })
});

app.listen(PORT, '0.0.0.0', () => console.log(`Listening on port ${PORT}.`));