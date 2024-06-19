const NavBar = () => {
  // const categories = ['Home', 'Technology', 'Health', 'Sports', 'Entertainment', 'Business'];

  return (
    <nav className="bg-blue-600 px-3 py-6 sticky top-0 z-10">
      <div className="flex justify-between flex-col lg:flex-row gap-3">
        <div className=" text-2xl font-bold flex gap-2">
          <p className="text-yellow-400">News </p>
          <p className="text-white">Portal</p>
        </div>

        {/* Search */}
         <div className="flex items-center">
          <input
            type="text"
            className="input border border-gray-300 rounded px-10 py-2 mr-2 w-full"
            placeholder="Search articles..."
          />
          <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">Search</button>
        </div>    
      </div>
    </nav>
  );
};

export default NavBar;
