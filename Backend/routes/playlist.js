import express from "express";
const router = express.Router();
import Playlist from "../models/playlistSchema.js";
import authenticate from "../middlewares/authenticate.js";
import mongoose from "mongoose";

router.post("/create_playlist", authenticate, async (req, res) => {
    try {
        // console.log(req.userId, req.body);
        // const {name, isPublic, }
        console.log("Create Playlist")
        const { name, isPublic} = req.body;
        if (!name || !isPublic) {
            return res.status(400).json({ status: false, error: "Please fill all the fields" });
        }
        const playlist = new Playlist({
            name,
            isPublic : isPublic === "true",
            userId: mongoose.Types.ObjectId.createFromHexString(req.userId)
        });
        // console.log(playlist)
        await playlist.save();
        return res.status(200).json({ status: true, message: "Playlist created successfully" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, error: error.message});
    }
});

router.get("/get_playlists", authenticate, async (req, res) => {
    try {
        console.log("Get Playlists")
        //req.userId is string 
        const playlists = await Playlist.find({ userId: mongoose.Types.ObjectId.createFromHexString(req.userId) }).select('_id name isPublic createdAt updatedAt');
        if(!playlists) {
            return res.status(400).json({ status: false, error: "No playlists found" });
        }
        return res.status(200).json({ status: true, playlists: playlists });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, error: error.message });
    }
})

router.get("/get_playlist/:id", authenticate, async (req, res) => {
    try {
        console.log("Get Playlist")
        const playlist = await Playlist.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) });
        if(!playlist) {
            return res.status(400).json({ status: false, error: "No playlist found" });
        }
        if(playlist.userId.toString() !== req.userId && !playlist.isPublic) {
            return res.status(400).json({ status: false, error: "Cannot view playlist" });
        }
        return res.status(200).json({ status: true, playlist: playlist });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, error: error.message });
    }
})

router.put("/update_playlist_name/:id", authenticate, async (req, res) => {
    try {
        console.log("Update Playlist")
        const { name } = req.body;
        if (!name ) {
            return res.status(400).json({ status: false, error: "Please fill all the fields" });
        }
        if(!req.params.id){
            return res.status(400).json({ status: false, error: "Please provide playlist id" });
        }
        const playlist = await Playlist.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) });
        if(!playlist) {
            return res.status(400).json({ status: false, error: "No playlist found" });
        }
        if(playlist.userId.toString() !== req.userId) {
            return res.status(400).json({ status: false, error: "Cannot update playlist" });
        }
        playlist.name = name;
        await playlist.save();
        return res.status(200).json({ status: true, message: "Playlist updated successfully" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, error: error.message });
    }
})

router.put("/update_playlist_privacy/:id", authenticate, async (req, res) => {
    try {
        console.log("Update Playlist Privacy")
        const { isPublic } = req.body;
        if (!isPublic ) {
            return res.status(400).json({ status: false, error: "Please fill all the fields" });
        }
        if(!req.params.id){
            return res.status(400).json({ status: false, error: "Please provide playlist id" });
        }
        const playlist = await Playlist.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) });
        if(!playlist) {
            return res.status(400).json({ status: false, error: "No playlist found" });
        }
        if(playlist.userId.toString() !== req.userId) {
            return res.status(400).json({ status: false, error: "Cannot update playlist" });
        }
        playlist.isPublic = isPublic === "true";
        await playlist.save();
        return res.status(200).json({ status: true, message: "Playlist updated successfully" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, error: error.message });
    }
});

router.delete("/delete_playlist/:id", authenticate, async (req, res) => {
    try {
        console.log("Delete Playlist")
        if(!req.params.id){
            return res.status(400).json({ status: false, error: "Please provide playlist id" });
        }
        const playlist = await Playlist.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) });
        if(!playlist) {
            return res.status(400).json({ status: false, error: "No playlist found" });
        }
        if(playlist.userId.toString() !== req.userId) {
            return res.status(400).json({ status: false, error: "Cannot delete playlist" });
        }
        await Playlist.deleteOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) });
        return res.status(200).json({ status: true, message: "Playlist deleted successfully" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, error: error.message });
    }
});

router.put("/add_movie/:id", authenticate, async (req, res) => {
    try {
        console.log("Add Movie")
        const { imdbID, Title, Genre, Poster, imdbRating } = req.body;
        if (!imdbID || !Title || !Genre || !Poster || !imdbRating) {
            return res.status(400).json({ status: false, error: "please fill all the fields" });
        }
        if(!req.params.id){
            return res.status(400).json({ status: false, error: "Please provide playlist id" });
        }
        const playlist = await Playlist.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) });
        if(!playlist) {
            return res.status(400).json({ status: false, error: "No playlist found" });
        }
        if(playlist.userId.toString() !== req.userId) {
            return res.status(400).json({ status: false, error: "Cannot add movie to playlist" });
        }
        playlist.movieList.push({ imdbID, Title, Genre, Poster, imdbRating });
        await playlist.save();
        return res.status(200).json({ status: true, message: "Movie added to playlist successfully" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, error: error.message });
    }
})

router.put("/remove_movie/:id", authenticate, async (req, res) => {
    try {
        console.log("Remove Movie")
        const { imdbID } = req.body;
        if (!imdbID) {
            return res.status(400).json({ status: false, error: "please fill all the fields" });
        }
        if(!req.params.id){
            return res.status(400).json({ status: false, error: "Please provide playlist id" });
        }
        const playlist = await Playlist.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) });
        if(!playlist) {
            return res.status(400).json({ status: false, error: "No playlist found" });
        }
        if(playlist.userId.toString() !== req.userId) {
            return res.status(400).json({ status: false, error: "Cannot remove movie from playlist" });
        }
        playlist.movieList = playlist.movieList.filter(movie => movie.imdbID !== imdbID);
        await playlist.save();
        return res.status(200).json({ status: true, message: "Movie removed from playlist successfully" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, error: error.message });
    }
})

export default router;