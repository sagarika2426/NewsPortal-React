import { useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {
  setArticles,
  setCurrentPage,
  setError,
  setLoading,
  setSelectedCategory,
} from "../store/articlesSlice";
import PaginationBar from "./Pagination";
import CategoryFilter from "./CategoryFilter";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ArticleGrid from "./ArticleGrid";

const Articles = () => {
  const dispatch = useDispatch();
  const {
    articles,
    currentPage,
    articlesPerPage,
    selectedCategory,
    loading,
    searchQuery,
    error
  } = useSelector((state) => state.articles);

  const categoriesArray = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Technology",
    "Sports",
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      dispatch(setLoading(true));
      try {
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
        let url = `https://news-portal-2x31.onrender.com/latest-news`;
        if (selectedCategory) {
          url += `?category=${selectedCategory.toLowerCase()}`;
        }
        const response = await axios.get(url);
        const fetchedArticles = response.data.articles.filter(
          (article) => article.urlToImage
        );
        dispatch(setArticles(fetchedArticles));
      } catch (error) {
        console.error("Error fetching articles:", error);
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false)); 
      }
    };
    fetchArticles();
  }, [dispatch, selectedCategory]);

  // Function to to short the description
  const shortDescription = (description) => {
    if (!description) return "";
    const words = description.split(" ");
    return words.length > 10
      ? `${words.slice(0, 10).join(" ")}...`
      : description;
  };

  // Function to handle pagination page change
  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  // Calculate index of first and last article for pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  // Filter articles based on search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slice filtered articles for current page
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Function to handle category filter click
  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category.toLowerCase()));
    dispatch(setCurrentPage(1));
  };

  const handleAddToFav = (article) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.some((favArticle) => favArticle.title === article.title);
    if (exists) {
      toast.warning("Article is already in favorites!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { fontSize: "14px" }
      });
    } else {
      favorites.push(article);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      console.log("Article added to the fav");
      toast.success("Article added to favorites!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { fontSize: "14px" }
      });
    }
  };

  return (
    <div className="container mx-auto lg:py-8 py-3">
      {error ? (
        <div className="text-center text-red-500 my-4">
          <p className="text-lg font-semibold">Failed to fetch articles. Please try again later.</p>
        </div>
      ) : (
        <>
          <h1 className="lg:text-3xl text-xl font-bold text-center text-gray-800 mb-4">
            Latest News
          </h1>
  
          {/* Category Selection */}
          <CategoryFilter
            categories={categoriesArray}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryClick}
          />
  
          {/* Articles Grid */}
          <ArticleGrid
            articles={articles}
            loading={loading}
            currentArticles={currentArticles}
            handleAddToFav={handleAddToFav}
            shortDescription={shortDescription}
          />
  
          {/* Pagination */}
          {!loading && (
            <PaginationBar onPageChange={handlePageChange} />
          )}
        </>
      )}
  
      {/* Toast */}
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

export default Articles;
