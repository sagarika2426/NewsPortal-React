import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

const PaginationBar = ({ onPageChange }) => {
  const { articles, currentPage, articlesPerPage, searchQuery } = useSelector((state) => state.articles);

  // Filter articles based on search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalArticles = filteredArticles.length;

  return (
    <div className="flex justify-center mt-8">
      <Pagination
        count={Math.ceil(totalArticles / articlesPerPage)}
        page={currentPage} 
        onChange={onPageChange} 
        color="primary"
      />
    </div>
  );
};

export default PaginationBar;
