import { useParams } from "react-router-dom";

const FavArticleDetails = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const { title } = useParams();

  // Find the article with matching title
  const article = favorites.find((favArticle) => favArticle.title === title);

  if (!article) {
    return (
      <div className="container mx-auto text-center mt-8">
        Article not found.
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
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-4 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Article Details
          </h2>
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
    </div>
  );
};

export default FavArticleDetails;
