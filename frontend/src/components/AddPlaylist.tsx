import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AddPlaylistProps {
    closeModal: () => void;
    refreshPlaylists: () => void;
}

const  AddPlaylist:React.FC<AddPlaylistProps> = ({closeModal, refreshPlaylists}) =>  {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsPublic(e.target.value === 'public');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('Name:', name);
    console.log('Is Public:', isPublic);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_playlist`, {
        name,
        isPublic,
      }, { withCredentials: true });

      if (response.data.status) {
        history('/'); // Redirect to home or playlists page after successful creation
        closeModal();
        refreshPlaylists();
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError('Error adding playlist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-lg text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Playlist</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">Playlist Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="w-full p-2 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="privacy">Privacy</label>
          <select
            id="privacy"
            value={isPublic ? 'public' : 'private'}
            onChange={handlePrivacyChange}
            className="w-full p-2 rounded text-black"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-150 ease-in-out"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Playlist'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPlaylist;
