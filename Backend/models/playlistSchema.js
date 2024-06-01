import mongoose from "mongoose";

const movie = new mongoose.Schema({
    imdbID : {
        type : String,
        required : true
    },
    Title : {
        type : String,
        required : true
    },
    Genre : {
        type : String,
        required : true
    },
    Poster : {
        type : String,
        required : true
    },
    imdbRating : {
        type : String,
        required : true
    }
});

const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    movieList : {
        type : [movie],
        required : true
    },
    isPublic : {
        type : Boolean,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date
    }
});

// Middleware to update `updatedAt` before save
playlistSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;