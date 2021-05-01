const mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
beautifyUnique = require('mongoose-beautiful-unique-validation');

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

const movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Synopsis: {type: String, required: true},
    Directors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Director'}],
    Genres: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
    Actors: [String],
    ImaagePath: String,
    Featured: Boolean,
    Release: String
});

const userSchema = mongoose.Schema({
    Username: {type: String, required: [true, 'Username is required'], unique: '({VALUE}) is already registered', minLength: [3, 'Username minimum length of 3 characters']},
    Password: {type: String, required: [true, 'Password is required']},
    Email: {type: String, required: [true, 'Email is required'], unique: '({VALUE}) is already registered'},
    Birthday: Date,
    Favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//make salty hasbrowns
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

userSchema.plugin(beautifyUnique);
userSchema.plugin(require('mongoose-autopopulate'));


const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);
const Genre= mongoose.model('Genre', genreSchema);
const Director = mongoose.model('Director', directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;