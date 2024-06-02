import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { link } from 'fs';

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
}

function Home() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_playlists`, { withCredentials: true })
        if (response.data.status) {
          console.log(response.data.playlists)
          setPlaylists(response.data.playlists)
        }
      } catch (err) {
        console.log("Error during token validation:", err)
      }
    })()
  }, [])

  const calculateUpdateDays = (updatedAt: string) => {
    const today = moment()
    const updated = moment(updatedAt)
    const days = today.diff(updated, 'days')
    if(days === 0) {
      return 'Today'
    }else{
      return `${days} days ago`
    }
  }

  return (
    <div className='text-white'>
      <h1
        className='text-3xl font-bold text-center mt-10 mb-10 text-primary'
      >Playlists</h1>
      <div className='flex flex-row flex-wrap'>
        {playlists?.length > 0 && playlists.map((playlist) => (
          <Link key={playlist._id} className='flex flex-col items-center justify-center bg-gray-800 p-5 m-5 rounded-lg w-2/12 cursor-pointer' to={`/playlist/${playlist._id}`}>
            <img src={playlist.firstMoviePoster} alt="" className=' w-full' />
            <h2>{playlist.name}</h2>
            <p>{playlist.isPublic ? 'Public' : 'Private'}</p>
            <p>Updated : {calculateUpdateDays(playlist.updatedAt)}</p>

          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home