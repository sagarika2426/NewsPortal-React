import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import PaginationBar from "./Pagination";
import data from "/src/Data.json"

import {
  setArticles,
  setCurrentPage,
  setError,
  setLoading,
  setSelectedCategory,
} from "../store/articlesSlice";
import { useDispatch, useSelector } from "react-redux";
import CategoryFilter from "./CategoryFilter";

const Articles = () => {

  
  const dispatch = useDispatch();
  const {
    articles,
    currentPage,
    articlesPerPage,
    selectedCategory,
    loading,
  } = useSelector((state) => state.articles);

  const categoriesArray = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Technology",
  ];

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     dispatch(setLoading(true)); // Dispatch loading state true before fetching
  //     try {
  //       const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  //       let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
  //       if (selectedCategory) {
  //         url += `&category=${selectedCategory.toLowerCase()}`;
  //       }
  //       const response = await axios.get(url);
  //       const fetchedArticles = response.data.articles.filter(
  //         (article) => article.urlToImage
  //       );
  //       dispatch(setArticles(fetchedArticles.slice(0,1)));
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //       dispatch(setError(error.message));
  //     } finally {
  //       dispatch(setLoading(false)); // Dispatch loading state false after fetching
  //     }
  //   };
  //   fetchArticles();
  // }, [dispatch, selectedCategory]);


  useEffect(() => {
    dispatch(setLoading(true)); // Dispatch loading state true before fetching
    setTimeout(() => {
      dispatch(setArticles(data.articles.slice(0, 10))); // Use only a portion for initial display
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const shortDescription = (description) => {
    if (!description) return "";
    const words = description.split(" ");
    return words.length > 10
      ? `${words.slice(0, 10).join(" ")}...`
      : description;
  };

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category.toLowerCase()));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="container mx-auto lg:py-8 py-3">
      {/* Header */}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 mx-4">
        {loading ? (
          <div className="flex items-center justify-center col-span-3">
            <CircularProgress color="primary" />
          </div>
        ) : (
          currentArticles.map((article, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg bg-white my-3"
            >
              <img
                className="w-full h-48 object-cover"
                src={article.urlToImage}
                alt={article.title}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  {shortDescription(article.description)}
                </p>
                <p className="text-gray-500 font-semibold mb-2">
                  By {article.author || "Unknown"}
                </p>
                <a
                  href={article.url}
                  className="text-blue-500 font-semibold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <PaginationBar onPageChange={handlePageChange} />
    </div>
  );
};

export default Articles;
