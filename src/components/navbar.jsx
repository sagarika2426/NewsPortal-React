import { AiOutlineSearch } from "react-icons/ai";



const NavBar = () => {
  // const categories = ['Home', 'Technology', 'Health', 'Sports', 'Entertainment', 'Business'];

  return (
    <nav className="bg-blue-600 px-3 lg:py-6 py-4 sticky top-0 z-10 lg:px-6">
      <div className="flex justify-between flex-col lg:flex-row gap-3">
        <div className=" lg:text-2xl text-xl font-bold flex gap-2">
          <p className="text-yellow-400">News </p>
          <p className="text-white">Portal</p>
        </div>

        {/* Search */} 
        <div className="flex items-center lg:w-1/4 relative">
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="Search articles..."
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-white">
            <AiOutlineSearch />
          </div>
        </div>



      </div>
    </nav>
  );
};

export default NavBar;
