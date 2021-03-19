const express = require('express'),
    morgan = require('morgan'),
    movies = require('./movies'),
    directors = require('./directors')
    uuidv4 = require('uuid/v4');

const app = express();
const uuid = uuidv4();
const PORT = process.env.PORT || 8080;

let users = [
    {
        "id": "5788b548-94b3-437d-8f4d-9c85278bd6f7",
        "name": "TheWatcher",
        "email": "thewatcher@email.com",
    }
];
let favorites = [
    {
        "id": "5788b548-94b3-437d-8f4d-9c85278bd6f7",
        "favorites": [] 
    }
]
class user {
    constructor(name, email) {
        this.id = uuid;
        this.name = name;
        this.email = email;
    }
}
class favorite {
    constructor(id) {
        this.id = id;
        this.favorites = [];
    }
}

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
app.get('/movies', (req, res) => res.json(movies));

// get movie by title
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) =>
    {return movie.title === req.params.title}));
});

// get list of featured movies
app.get('/featured', (req, res) => {
    res.json(movies.filter((movie) =>
    {return movie.featured}));
});

// get list of directors
app.get('/directors', (req, res) => res.json(directors));

// get director by name
app.get('/directors/:name', (req, res) => {
    res.json(directors.find((director) =>
    {return director.name === req.params.name}));
});

//get list of users
app.get('/users', (req, res) => res.json(users));

//get list of favorites
app.get('/favorites/:id?', (req, res) => res.json(favorites));

//add favorite movie
app.put('/favorites/:id/:title', (req, res) => {
    const userFav = favorites.find((favList) =>
    {return favList.id === req.params.id});
    const titleExists = movies.find((movie) =>
    {return movie.title === req.params.title});

    if (!userFav) {
        const message = `id:${req.params.id} was not found.`;
        return res.status(400).send(message);
    }

    const favExists = userFav.favorites.includes(req.params.title);
    const titleIndex = userFav.favorites.indexOf(req.params.title);

    if (!titleExists) {
        const message = `${req.params.title} is not in our library.`;
        return res.status(400).send(message);
    }

    //removes title from favorites if exists
    if (favExists) {
        userFav.favorites.splice(titleIndex, 1);
    return res.status(201).send(`${req.params.title} has been removed from your favorites.`)
    }

    userFav.favorites.push(req.params.title);
    return res.status(201).send(`${req.params.title} added to your favorites.`)
})

//add new user
app.post('/users', (req, res) => {
    const reqBody = req.body;
    const newUser = new user(reqBody.name, reqBody.email)
    const newFav = new favorite(newUser.id);
    const emailExists = users.find((user) =>
    {return user.email === reqBody.email});
    const userExists = users.find((user) =>
    {return user.name === reqBody.name});
    if (!reqBody.name) {
        const message = 'Missing name in request body';
        return res.status(400).send(message);
    }

    if (!reqBody.email) {
        const message = 'Missing email in the request body';
        return res.status(400).send(message);
    }

    if (userExists) {
        const message = `${reqBody.name} is already taken.`
        return res.status(400).send(message);
    }

    if (emailExists) {
        const message = `${reqBody.email} is already registered.`
        return res.status(400).send(message);
    }

    users.push(newUser);
    favorites.push(newFav)
    res.status(201).send(newUser);
});

//change user name
app.put('/users/:name/:newName', (req, res) => {
    const user = users.find((user) =>
    {return user.name === req.params.name});
    const userExists = users.find((user) =>
    {return user.name === req.params.newName});

    if (userExists) {
        const message = `The username "${req.params.newName}" is already taken.`
        return res.status(400).send(message);
    }

    if (user) {
        user.name = req.params.newName;
        return res.status(201).send(`Username changed to ${req.params.name}`);
    }

    res.status(404).send(`Username "${req.params.name}" was not found.`);
});

app.delete('/users/:email', (req, res) => {
    const user = users.find((user) => 
    {return user.email === req.params.email});

    if (user) {
        users = users.filter((obj) => 
        {return obj.id !== user.id});
        favorites = favorites.filter((obj) => 
        {return obj.id !== user.id});
        res.status(201).send(`${user.email} is no longer registered.`)
    }

    res.status(404).send(`User id:${req.params.id} was not found.`);
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));