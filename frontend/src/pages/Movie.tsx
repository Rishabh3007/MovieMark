import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import AddToPlaylist from "../components/AddToPlaylist";

interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    BoxOffice: string;
}

function Movie() {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState<Movie>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.REACT_APP_API_KEY}`
                );
                if (response.data) {
                    // console.log(response.data)
                    setMovie(response.data);
                } else {
                    console.log("No movie found");
                }
            } catch (err) {
                console.log("error fetching movie: ", err);
            }
        })();
    }, []);
    return (
        <div>
            <div className="max-w-4xl mt-4 mx-auto p-4 bg-transparent text-white">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 text-center">
                        <img
                            className="w-full md:w-64 rounded-md"
                            src={movie?.Poster}
                            alt={movie?.Title}
                        />
                        {/* add to playlist button */}
                        <button
                            className="bg-primary text-white px-4 py-2 rounded-md mt-3 hover:bg-teal-600 transition duration-150 ease-in-out"
                            onClick={openModal}
                        >
                            Add to Playlist
                        </button>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                        <h1 className="text-2xl font-bold text-white">{movie?.Title}</h1>
                        <p className="text-white">({movie?.Year})</p>
                        <p className="mt-2 text-white">{movie?.Plot}</p>

                        <div className="mt-4">
                            <p>
                                <span className="font-semibold">Director:</span>{" "}
                                {movie?.Director}
                            </p>
                            <p>
                                <span className="font-semibold">Writer:</span> {movie?.Writer}
                            </p>
                            <p>
                                <span className="font-semibold">Actors:</span> {movie?.Actors}
                            </p>
                            <p>
                                <span className="font-semibold">Genre:</span> {movie?.Genre}
                            </p>
                            <p>
                                <span className="font-semibold">Language:</span>{" "}
                                {movie?.Language}
                            </p>
                            <p>
                                <span className="font-semibold">Country:</span> {movie?.Country}
                            </p>
                            <p>
                                <span className="font-semibold">Awards:</span> {movie?.Awards}
                            </p>
                            <p>
                                <span className="font-semibold">Box Office:</span>{" "}
                                {movie?.BoxOffice}
                            </p>
                        </div>

                        <div className="mt-4 flex flex-col md:flex-row md:items-center">
                            <div className="mr-4">
                                <p>
                                    <span className="font-semibold">Metascore:</span>{" "}
                                    {movie?.Metascore}
                                </p>
                                <p>
                                    <span className="font-semibold">IMDb Rating:</span>{" "}
                                    {movie?.imdbRating}
                                </p>
                                <p>
                                    <span className="font-semibold">IMDb Votes:</span>{" "}
                                    {movie?.imdbVotes}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="text-center">
                    {/* <h2 className="text-2xl font-bold mb-4 text-white">Add To Playlist</h2> */}
                    {/* <p className="mb-4 text-white">This is the content of the modal.</p> */}
                    <AddToPlaylist
                        imdbID={imdbID}
                        closeModal={closeModal}
                        Title={movie?.Title}
                        Poster={movie?.Poster}
                        imdbRating={movie?.imdbRating}
                        Genre={movie?.Genre}
                    />
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-primary text-white rounded-md"
                    >
                        Close Modal
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Movie;
