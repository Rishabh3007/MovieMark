import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import AddPlaylist from '../components/AddPlaylist';

export interface Movie {
  imdbID: string;
  Title: string;
  Genre: string;
  Poster: string;
  imdbRating: string;
}

export interface Playlist {
  _id: string;
  name: string;
  movieList?: Movie[];
  isPublic: boolean;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  firstMoviePoster?: string;
  userName : string
}

export const calculateUpdateDays = (updatedAt: string | undefined) => {
  const today = moment()
  const updated = moment(updatedAt)
  const days = today.diff(updated, 'days')
  if(days === 0) {
    return 'Today'
  }else{
    return `${days} days ago`
  }
}

function Home() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

  useEffect(() => {
    fetchPlaylists()
  }, [])

    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_playlists`, { withCredentials: true })
        if (response.data.status) {
          console.log(response.data.playlists)
          setPlaylists(response.data.playlists)
        }
      } catch (err) {
        console.log("Error during token validation:", err)
      }
    }
  

  

  return (
    <>
    <div className='text-white'>
      <h1
        className='text-3xl font-bold text-center mt-10 mb-10 text-primary'
        >Playlists</h1>
      <div className='flex flex-row flex-wrap justify-start'>
        {playlists?.length > 0 && playlists.map((playlist) => (
          <Link key={playlist._id} className='flex flex-col items-center justify-center bg-gray-800 p-5 m-5 rounded-lg w-[90%] md:w-3/12 lg:w-2/12 cursor-pointer' to={`/playlist/${playlist._id}`}>
            <img src={playlist.firstMoviePoster} alt="" className=' w-full' />
            <h2>{playlist.name}</h2>
            <p>{playlist.isPublic ? 'Public' : 'Private'}</p>
            <p>Updated : {calculateUpdateDays(playlist.updatedAt)}</p>

          </Link>
        ))}
        <div className='flex flex-col items-center justify-center bg-gray-800 p-5 m-5 rounded-lg w-[90%] md:w-3/12 lg:w-2/12 cursor-pointer min-h-96'>
          <button className='flex items-center justify-center w-full h-full text-4xl text-primary'
            onClick={openModal}
          >
            +
          </button>
        </div>
      </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="text-center">
                    {/* <h2 className="text-2xl font-bold mb-4 text-white">Add To Playlist</h2> */}
                    {/* <p className="mb-4 text-white">This is the content of the modal.</p> */}
                    <AddPlaylist
                        closeModal={closeModal}
                        refreshPlaylists={fetchPlaylists}
                    />
                    {/* <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-primary text-white rounded-md"
                    >
                        Close Modal
                    </button> */}
                </div>
            </Modal>
        </>
  )
}

export default Home