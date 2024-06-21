import { CircularProgress, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/articlesSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import articlNotFound from "../assets/article-not-found.gif"

const ArticleGrid = ({
  loading,
  currentArticles,
  shortDescription,
  isFavoritePage = false,
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.articles.favorites);

  // Function to check if article is in favorites using Redux state
  const isArticleInFavorites = (article) => {
    return favorites.some((favArticle) => favArticle.title === article.title);
  };

  // Function to handle adding to favorites
  const handleAddToFav = (article) => {
    if (!isArticleInFavorites(article)) {
      dispatch(addToFavorites(article));
      toast.success("Article added to favorites!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { fontSize: "14px" },
      });
    } else {
      toast.warning("Article is already in favorites!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { fontSize: "14px" },
      });
    }
  };

  // Function to handle removing from favorites
  const handleRemoveFromFav = (article) => {
    dispatch(removeFromFavorites(article.title));
    toast.success("Article removed from favorites!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { fontSize: "14px" },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 mx-4">
      {loading ? (
        <div className="flex items-center justify-center col-span-4">
          <CircularProgress color="primary" />
        </div>
      ) : currentArticles.length === 0 ? (
        <div className="col-span-4 text-center text-gray-600 py-8">
         <img src={articlNotFound} className="items-center m-auto w-96"/>
         <p className="my-4">No Artcles Found!</p>
         <Link to="/">
         <button className="bg-blue-700 text-white px-2 py-1 rounded-md">Explore Latest News</button>
         </Link>
        </div>
      ) : (
        currentArticles.map((article, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-lg bg-white my-3 transition-all duration-300 hover:shadow-2xl"
          >
            <Link
              to={
                isFavoritePage
                  ? `/favorites/${(article.title)}`
                  : `/article/${encodeURIComponent(article.title)}`
              }
            >
              {" "}
              <div>
                <img
                  className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                  src={article.urlToImage}
                  alt={article.title}
                />
                <div className="p-4">
                  <h2 className="text-md font-semibold text-gray-800 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-700 mb-4">
                    {shortDescription(article.description)}
                  </p>
                  <p className="text-gray-500 font-semibold mb-2">
                    By {article.author || "Unknown"}
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex justify-between items-center p-4">
              <Link
                to={
                  isFavoritePage
                    ? `/favorites/${encodeURIComponent(article.title)}`
                    : `/article/${encodeURIComponent(article.title)}`
                }
                className="text-blue-700 font-semibold"
              >
                Read More
              </Link>

              {isFavoritePage ? (
                // If it's the Favorites page, show remove button
                <button
                  onClick={() => handleRemoveFromFav(article)}
                  className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
              ) : (
                // Otherwise, show add to favorites button if not already in favorites
                <IconButton
                onClick={() =>
                  isArticleInFavorites(article)
                    ? handleRemoveFromFav(article)
                    : handleAddToFav(article)
                }
              >
                {isArticleInFavorites(article) ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ArticleGrid;
