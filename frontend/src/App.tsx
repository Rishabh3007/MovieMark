import React from 'react';
import Navbar from './layouts/Navbar';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div
      className="min-h-screen bg-zinc-900 flex-1 flex-shrink-0 px-4 md:px-16 lg:px-20"
    >
      <Navbar />
      <SearchBar />
      {/* <p className='text-white'>
      the content starts here Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex eligendi voluptatem necessitatibus magni iure deleniti, a sed voluptates provident ad aperiam earum consequatur possimus saepe, impedit libero voluptate sint ab? Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur dolores accusamus id mollitia veniam, explicabo adipisci minus perspiciatis aliquam nesciunt quibusdam debitis asperiores sed, quo at possimus quam dicta eum?
      </p> */}
    </div>
  );
}

export default App;
