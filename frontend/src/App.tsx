import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider } from './contexts/UserContext';
import Login from './pages/Login';
import Layout from './layouts/Layout';
import PrivateRoute from './components/PrivateRoute';
import Playlist from './pages/Playlist';
import Movie from './pages/Movie';

function App() {
  return (
    <UserProvider>
      <div
        className="min-h-screen bg-zinc-900 flex-1 flex-shrink-0 px-4 md:px-16 lg:px-20"
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='/' element={<Layout/>}>
              <Route index element={<PrivateRoute element={<Home />} />} />
              <Route path='playlist/:id' element={<PrivateRoute element={<Playlist />} />} />
              <Route path='movie/:imdbID' element={<PrivateRoute element={<Movie />} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
