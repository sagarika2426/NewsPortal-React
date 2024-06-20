import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

const PaginationBar = ({ onPageChange }) => {
  // Select necessary state variables from Redux store
  const { articles, currentPage, articlesPerPage } = useSelector((state) => state.articles);
  const totalArticles = articles.length; // Total number of articles based on current state

  return (
    <div className="flex justify-center mt-8">
      <Pagination
        count={Math.ceil(totalArticles / articlesPerPage)} // Calculate total pages based on articles and items per page
        page={currentPage} // Current active page
        onChange={onPageChange} // Handle page change callback
        color="primary" // Pagination color theme
      />
    </div>
  );
};

export default PaginationBar;
