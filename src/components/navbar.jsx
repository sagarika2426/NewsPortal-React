
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/articlesSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.articles.searchQuery);

  const handleSearch = event => {
    const { value } = event.target;
    dispatch(setSearchQuery(value));
  };

  return (
    <nav className="bg-gradient-to-b from-blue-700 to-blue-800 px-3 lg:py-6 py-4 sticky top-0 z-10 lg:px-6">
      <div className="flex justify-between flex-col lg:flex-row gap-3">
        <div className="lg:text-2xl text-xl font-bold flex gap-2 text-yellow-400">
          <p>News</p>
          <p className="text-white">Portal</p>
        </div>

        {/* Search */}
        <div className="relative lg:w-1/4 w-full">
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <AiOutlineSearch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
