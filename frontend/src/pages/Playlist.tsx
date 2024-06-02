import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Playlist as PlaylistType } from './Home'
import { Movie } from './Home'
import { Link } from 'react-router-dom'

function Playlist() {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState<PlaylistType>()
    const [movies, setMovies] = useState<Movie[]>([])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_playlist/${id}`, { withCredentials: true })
        if (response.data.status) {
          console.log(response.data.playlist)
            setPlaylist(response.data.playlist)
            setMovies(response.data.playlist.movieList)
        }
      } catch (err) {
        console.log("Error during token validation:", err)
      }
    })()
  }, [])
  return (
    <div className='text-white'>
        <h1
            className='text-3xl font-bold text-center mt-10 mb-10 text-primary'
        >{playlist?.name}</h1>
        <div className='flex flex-row flex-wrap'>
            {movies?.length > 0 && movies.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`}  key={movie.imdbID} className='flex flex-col items-center justify-center bg-gray-800 p-5 m-5 rounded-lg w-2/12 cursor-pointer'>
                <img src={movie.Poster} alt={movie.Title} className='w-32 h-48'/>
                <h1 className='text-lg font-bold'>{movie.Title}</h1>
                <h1 className='text-sm'>{movie.Genre}</h1>
                <h1 className='text-sm'>{movie.imdbRating}</h1>
            </Link>
            ))}
        </div>
    </div>
  )
}

export default Playlist