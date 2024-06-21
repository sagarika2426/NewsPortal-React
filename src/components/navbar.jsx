import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/articlesSlice";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";

const NavBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.articles.searchQuery);
  const favorites = useSelector((state) => state.articles.favorites);

  // Handle Search Functionality
  const handleSearch = (event) => {
    const { value } = event.target;
    dispatch(setSearchQuery(value));
  };

  return (
    <nav className="bg-gradient-to-b from-sky-700 to-sky-600 px-4 lg:py-6 py-4 sticky top-0 z-10 lg:px-6">
      <div className="mx-auto flex justify-between lg:items-center flex-col lg:flex-row">
        {/* Logo */}
        <a
          href="/"
          className="lg:text-3xl text-xl font-bold flex items-center gap-2 text-white"
        >
          <span className="text-yellow-400">News</span>
          <span className="text-white">Portal</span>
        </a>

        {/* Search and Favorites */}
        <div className="flex items-center lg:gap-6 gap-3 lg:w-1/3 justify-between">
          {/* Search input */}
          <div className="relative w-full">
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

          {/* Favorites */}
          <Link to="/favorites" className="relative items-center text-white ">
            <IconButton className="bg-blue-200 rounded-full">
              <FavoriteBorderIcon style={{ color: "white" }} />
            </IconButton>
            {favorites.length > 0 && (
              <span className="absolute -top-0 right-4 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {favorites.length}
              </span>
            )}
            <span className="text-sm">Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
