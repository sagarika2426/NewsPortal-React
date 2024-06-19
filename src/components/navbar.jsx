const NavBar = () => {
  // const categories = ['Home', 'Technology', 'Health', 'Sports', 'Entertainment', 'Business'];

  return (
    <nav className="bg-blue-600 px-3 lg:py-6 py-4 sticky top-0 z-10">
      <div className="flex justify-between flex-col lg:flex-row gap-3">
        <div className=" lg:text-2xl text-xl font-bold flex gap-2">
          <p className="text-yellow-400">News </p>
          <p className="text-white">Portal</p>
        </div>

        {/* Search */}
         <div className="flex items-center w-1/4">
          <input
            type="text"
            className="input border border-gray-300 rounded px-3 py-2 mr-2 w-full"
            placeholder="Search articles..."
          />
          {/* <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">Search</button> */}
        </div>    
      </div>
    </nav>
  );
};

export default NavBar;
