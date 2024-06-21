import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

const PaginationBar = ({ onPageChange }) => {
  const { articles, currentPage, articlesPerPage } = useSelector((state) => state.articles);
  const totalArticles = articles.length;

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
