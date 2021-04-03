const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Synopsis: {type: String, required: true},
    Directors: [{type: mongoose.Schema.Types.ObjectId, ref: 'directors'}],
    Genres: [{type: mongoose.Schema.Types.ObjectId, ref: 'genres'}],
    Actors: [String],
    ImaagePath: String,
    Featured: Boolean,
    Release: String
});

const userSchema = mongoose.Schema({
    Username: {type: String, required: true, unique: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true, unique: true},
    Birthday: Date,
    Favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'movies'}]
});

const genreSchema = mongoose.Schema({
    Name: String,
    Description: String
});

const directorSchema = mongoose.Schema({
    Name: String,
    Bio: String,
    Birth: String,
    Death: String
});

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);
const Genre= mongoose.model('Genre', genreSchema);
const Director = mongoose.model('Director', directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;