import { useParams } from "react-router-dom";

const FavArticleDetails = () => {
  // Retrieve favorites from localStorage or initialize as empty array
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Extract 'title' parameter from URL using useParams hook
  const { title } = useParams();

  // Find the article with matching title in favorites array
  const article = favorites.find((favArticle) => favArticle.title === title);

  // If article is not found, display 'Article not found' message
  if (!article) {
    return (
      <div className="container mx-auto text-center mt-8">
        Article not found.
      </div>
    );
  }

  // Render article details if found
  return (
    <div className="container mx-auto lg:py-8 py-3 px-2">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Article Image */}
          <div className="md:w-1/2 lg:p-4">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
          {/* Article Details */}
          <div className="md:w-1/2 lg:p-4 p-2">
            <div className="flex justify-between items-center">
              {/* Published Date */}
              <span className="text-gray-600 text-sm">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
              {/* Author */}
              <span className="text-gray-600 text-sm">
                By {article.author || "Unknown"}
              </span>
            </div>
            {/* Article Title */}
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              {article.title}
            </h1>
            {/* Article Description */}
            <p className="mt-2 text-gray-600">{article.description}</p>
            {/* Read More Button */}
            <div className="mt-4">
              <a
                href={article.url}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition duration-300 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
        {/* Additional Article Details */}
        <div className="bg-gray-200 p-4 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Article Details
          </h2>
          {/* Article Source */}
          <p className="text-gray-700">
            <span className="font-semibold">Source:</span>{" "}
            {article.source?.name || "Unknown"}
          </p>
          {/* Published Date */}
          <p className="text-gray-700">
            <span className="font-semibold">Published:</span>{" "}
            {new Date(article.publishedAt).toLocaleString()}
          </p>
          {/* Article URL */}
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
        {/* Article Content (if available) */}
        {article.content && (
          <div className="lg:p-4 p-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Content</h2>
            <p className="text-gray-700">{article.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavArticleDetails;
