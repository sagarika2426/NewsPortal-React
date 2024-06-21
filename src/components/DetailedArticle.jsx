import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToFavorites, removeFromFavorites } from "../store/articlesSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailedArticle = () => {
  const { title } = useParams();
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const favorites = useSelector((state) => state.articles.favorites);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      // Simulating fetch from API or data source
      setTimeout(() => {
        const selectedArticle = articles.find(
          (article) => article?.title === title
        );
        setArticle(selectedArticle);
        setLoading(false);
      }, 1000); // Simulated delay
    };

    fetchArticle();
  }, [title, articles]);

  const isArticleInFavorites = (article) => {
    return favorites.some((favArticle) => favArticle.title === article.title);
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Article not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:py-8 py-3 px-2">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 lg:p-4">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
          <div className="md:w-1/2 lg:p-4 p-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
              <span className="text-gray-600 text-sm">
                By {article.author || "Unknown"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              {article.title}
            </h1>
            <p className="mt-2 text-gray-600">{article.description}</p>
            <div className="mt-4">
              <a
                href={article.url}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition duration-300 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
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
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-4 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Article Details</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Source:</span>{" "}
            {article.source?.name || "Unknown"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Published:</span>{" "}
            {new Date(article.publishedAt).toLocaleString()}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">URL:</span>{" "}
            <a
              href={article.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.url}
            </a>
          </p>
        </div>
        {article.content && (
          <div className="lg:p-4 p-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Content</h2>
            <p className="text-gray-700">{article.content}</p>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontSize: "14px" }}
      />
    </div>
  );
};

export default DetailedArticle;
