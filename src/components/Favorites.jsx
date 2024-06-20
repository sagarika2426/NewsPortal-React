import { useSelector, useDispatch } from "react-redux";
import ArticleGrid from "./ArticleGrid";
import { removeFromFavorites } from "../store/articlesSlice";
import { ToastContainer, toast } from "react-toastify";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.articles.favorites);


  const handleRemoveFromFavorites = (article) => {
    dispatch(removeFromFavorites(article.title));
    toast.error('Article removed from favorites!', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { fontSize: '14px' },
    });
  };

  return (
    <div className="container mx-auto lg:py-8 py-3">
      <h1 className="lg:text-3xl text-xl font-bold text-center text-gray-800 mb-4">
        My Favorites
      </h1>

      <ArticleGrid
        loading={false} 
        currentArticles={favorites}
        removeFromFavorites={handleRemoveFromFavorites}
        shortDescription={(description) =>
          description.slice(0, 50) + "..."
        }
        isFavoritePage={true}
      />
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

export default Favorites;
