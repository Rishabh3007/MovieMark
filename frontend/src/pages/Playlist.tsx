import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Playlist as PlaylistType } from './Home'
import { Movie } from './Home'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
import AddPlaylist from '../components/AddPlaylist'
import { useNavigate } from 'react-router-dom'
import { calculateUpdateDays } from './Home'
import { useUser } from '../contexts/UserContext';

function Playlist() {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState<PlaylistType>()
    const [movies, setMovies] = useState<Movie[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { userId } = useUser();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_playlist/${id}`, { withCredentials: true })
      if (response.data.status) {
        console.log(response.data.playlist)
          setPlaylist(response.data.playlist)
          setMovies(response.data.playlist.movieList)
      }
    } catch (err : any) {
      console.log("error fetching movies", err)
      if(err.response.data.error){
        setError(err.response.data.error)
      }
    }
  }

  const removeFromPlaylist = async (imdbID: string, playlistId : string | undefined) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/remove_movie/${playlistId}`, {
        imdbID
      }, { withCredentials: true })
      // console.log(response.data.status)
      if (response.data.status) {
        setMovies(movies.filter((movie) => movie.imdbID !== imdbID))
      }
    } catch (err) {
      console.log("Error during token validation:", err)
    }
  }

  const deletePlaylist = async (playlistId: string | undefined) => {
    try {
      setLoading(true)
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_playlist/${playlistId}`, { withCredentials: true })
      if (response.data.status) {
        console.log(response.data.message)
        navigate('/')
      }
    } catch (err) {
      console.log("Error during token validation:", err)
    }finally{
      setLoading(false)
    }
  }

  // console.log(userId, playlist?.userId)

  return (
    <div className='text-white'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-bold text-primary'>{playlist?.name}</h1>
        {
          userId == playlist?.userId && (
            <div className='flex space-x-2'>
            <button
            className='bg-primary text-white px-3 py-2 rounded hover:bg-teal-600 transition duration-150 ease-in-out'
            onClick={openModal}
          >
            Update Playlist
          </button>
          <button
            className='bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition duration-150 ease-in-out'
            onClick={() => deletePlaylist(playlist?._id)}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Playlist"}
          </button>
            </div>
          )
        }
        
          
        
      </div>
      {error ? <p className="text-red-500 mb-4">{error}</p> : (
        <div className='flex justify-between'>
        <h1 className='text-xl'>Privacy: {playlist?.isPublic ? 'Public' : 'Private'}</h1>
        <h1 className='text-xl'>Updated : {calculateUpdateDays(playlist?.updatedAt)}</h1>
        <h1 className='text-xl'>Created by: {playlist?.userName}</h1>
      </div>
      )}
      
        <div className='flex flex-row flex-wrap justify-start'>
            {movies?.length > 0 && movies.map((movie) => (
            <div key={movie.imdbID} className='flex flex-col items-center justify-center bg-gray-800 p-5 m-5 rounded-lg w-[90%] md:w-3/12 lg:w-2/12 cursor-pointer'>
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} className='w-full'/>
                <h1 className='text-lg font-bold'>{movie.Title}</h1>
                <h1 className='text-sm'>{movie.Genre}</h1>
                <h1 className='text-sm'>{movie.imdbRating}</h1>
              </Link>
                <button
                  className='bg-primary text-white px-3 py-2 rounded hover:bg-teal-600 transition duration-150 ease-in-out mt-2'
                  onClick={() => removeFromPlaylist(movie.imdbID, playlist?._id)}
                >
                  Remove
                </button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <AddPlaylist closeModal={closeModal}
                    refreshPlaylists={fetchMovies}
                    isUpdateMode={true}
                    playlistId={playlist?._id}
                    playlistName={playlist?.name}
                    isItPublic={playlist?.isPublic}
                    />
                </Modal>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Playlist