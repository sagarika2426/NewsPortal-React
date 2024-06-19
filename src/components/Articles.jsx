import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setArticles,
  setCurrentPage,
  setLoading,
  setSelectedCategory,
} from '../store/articlesSlice';
import PaginationBar from './Pagination';
import CategoryFilter from './CategoryFilter';
import data from '/src/Data.json';
import { Link } from 'react-router-dom';

const Articles = () => {
  const dispatch = useDispatch();
  const {
    articles,
    currentPage,
    articlesPerPage,
    selectedCategory,
    loading,
    searchQuery,
  } = useSelector(state => state.articles);

  const categoriesArray = [
    'Business',
    'Entertainment',
    'General',
    'Health',
    'Science',
    'Technology',
    'Sports'
  ];

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setArticles(data.articles.slice(0, 10))); 
      dispatch(setLoading(false));
    }, 1000); 
  }, [dispatch]);

  // Function to to short the description
  const shortDescription = description => {
    if (!description) return '';
    const words = description.split(' ');
    return words.length > 10 ? `${words.slice(0, 10).join(' ')}...` : description;
  };

  // Function to handle pagination page change
  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  // Filter articles based on searchQuery
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slice filtered articles for current page
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Function to handle category filter click
  const handleCategoryClick = category => {
    dispatch(setSelectedCategory(category.toLowerCase()));
    dispatch(setCurrentPage(1)); // Reset current page to 1 when category changes
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
          // Display loading while fetching data
          <div className="flex items-center justify-center col-span-4">
            <CircularProgress color="primary" />
          </div>
        ) : currentArticles.length === 0 ? (
          <div className="col-span-4 text-center text-gray-600 py-8">
            No articles found.
          </div>
        ) : (
          currentArticles.map((article, index) => (
            <Link key={index} to={`/article/${article.title}`}>

            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg bg-white my-3 transition-all duration-300 hover:shadow-2xl"
            >
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
                  By {article.author || 'Unknown'}
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
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <PaginationBar onPageChange={handlePageChange} />
    </div>
  );
};

export default Articles;
