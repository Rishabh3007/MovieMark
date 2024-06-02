import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const fetchMovies = useCallback(debounce(async (query: string) => {
        if (query.trim() === '') {
            setMovies([]);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=${query}&page=1&apikey=${process.env.REACT_APP_API_KEY}`);
            if (response.data.Search) {
                setMovies(response.data.Search);
            } else {
                setMovies([]);
                setError('No movies found.');
            }
        } catch (err) {
            setMovies([]);
            setError('Error fetching movies.');
        } finally {
            setLoading(false);
        }
    }, 500), []);

    useEffect(() => {
        fetchMovies(searchTerm);
    }, [searchTerm, fetchMovies]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 100); // Delay to allow click events on suggestions
    };

    const handleMovieClick = (imdbID: string) => {
        console.log(imdbID);
        setSearchTerm('');
        setIsFocused(false);
    };

    return (
        <div className="bg-transparent text-white">
            <div className="max-w-lg mx-auto relative">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full text-black"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {isFocused && movies?.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 bg-gray-800 rounded shadow-lg z-50">
                        <ul className="space-y-1 p-1">
                            {movies.slice(0, 7).map((movie: any) => (
                                <li key={movie.imdbID} className="flex items-center p-1 hover:bg-gray-700 rounded"
                                    onClick={() => handleMovieClick(movie.imdbID)}
                                >
                                    <img src={movie.Poster} alt={movie.Title} className="w-10 h-16 object-cover rounded mr-4" />
                                    <div>
                                        <h2 className="text-md">{movie.Title}</h2>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {loading && <div className="text-center mt-4">Loading...</div>}
            {error && <div className="text-center mt-4 text-red-500">{error}</div>}
        </div>
    );
};

export default SearchBar;
