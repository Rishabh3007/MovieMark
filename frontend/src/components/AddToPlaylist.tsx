import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Playlist } from '../pages/Home';

interface AddToPlaylistProps {
    imdbID: string | undefined;
    closeModal: () => void;
    Title: string | undefined;
    Poster: string | undefined;
    imdbRating: string | undefined;
    Genre: string | undefined;
}

const AddToPlaylist: React.FC<AddToPlaylistProps> = ({ imdbID, closeModal, Title, Poster, imdbRating, Genre }) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
    const [error, setError] = useState('');
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_playlists`, { withCredentials: true });
                if (response.data.status) {
                    setPlaylists(response.data.playlists);
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log("Error during token validation:", err);
            }
        })();
    }, []);

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlaylist(e.target.value);
    };

    const handleSubmit = async () => {
        // console.log('Selected Playlist:', selectedPlaylist);
        // console.log('imdbID:', imdbID);
        // console.log('Title:', Title);
        // console.log('Poster:', Poster);
        // console.log('imdbRating:', imdbRating);
        // console.log('Genre:', Genre);
        // Add your submission logic here
        if (selectedPlaylist && imdbID) {
            try {
                const response = await axios.put(
                    `${process.env.REACT_APP_BACKEND_URL}/add_movie/${selectedPlaylist}`,
                    { playlistId: selectedPlaylist, imdbID: imdbID, Title: Title, Poster: Poster, imdbRating, Genre: Genre },
                    { withCredentials: true }
                );
                if (response.data.status) {
                    console.log('Movie added to playlist successfully.');
                    closeModal();
                } else {
                    console.log('Failed to add movie to playlist.');
                }
            } catch (err: any) {
                //if axios error 
                if (err.response.data.status === false) {
                    console.log(err.response.data.error);
                    setError(err.response.data.error);
                }
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-white">Select Playlist</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p className="text-red-500">{error}</p>}
                    <ul className='flex flex-col'>
                        {playlists.length > 0 ? (
                            playlists.map((playlist) => (
                                <li key={playlist._id} className="mb-2 text-white">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="playlist"
                                            value={playlist._id}
                                            onChange={handleRadioChange}
                                            className="mr-2"
                                        />
                                        {playlist.name}
                                    </label>
                                </li>
                            ))
                        ) : (
                            <p>No playlists found.</p>
                        )}
                    </ul>
                </>
            )}
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
            >
                Save
            </button>
        </div>
    );
};

export default AddToPlaylist;
