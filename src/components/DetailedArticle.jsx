import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DetailedArticle = () => {
    const { title } = useParams();
    const articles = useSelector((state) => state.articles.articles);
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            // Simulating fetch from API or data source
            setTimeout(() => {
                const selectedArticle = articles.find(article => article?.title === title);
                setArticle(selectedArticle);
                setLoading(false);
            }, 1000); // Simulated delay
        };

        fetchArticle();
    }, [title, articles]);

    if (loading) {
        return (
            <div className="container mx-auto py-8 flex justify-center">
                <CircularProgress color="primary" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container mx-auto py-8">
                <h1>Article not found.</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto lg:py-8 py-2">
            <div className="lg:max-w-8xl mx-auto flex bg-white shadow-md rounded-lg overflow-hidden flex-col lg:flex-row">
                {/* Content Section */}
                <div className="lg:w-1/2 lg:p-6 p-2">
                    <h1 className="lg:text-3xl text-2xl font-bold text-gray-800 mb-4">{article.title}</h1>
                    <p className="text-sm text-gray-700 mb-4">{article.description}</p>
                    <div className="flex justify-between mb-4 flex-col">
                        <p className="text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</p>
                        <p className="text-gray-500">By {article.author || 'Unknown'}</p>
                    </div>
               
                    {article.content && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Content</h2>
                            <p className="text-gray-700">{article.content}</p>
                        </div>
                    )}
                     <a
                        href={article.url}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition duration-300 inline-block mt-2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read More
                    </a>
                </div>
                {/* Image Section */}
                <div className="lg:w-1/2 lg:p-4 p-2">
                    <img className="w-full h-auto object-cover" src={article.urlToImage} alt={article.title} />
                </div>
               
            </div>

            {/* Article Details Section */}
            <div className="max-w-84xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Article Details</h2>
                <p className="text-gray-700"><span className="font-semibold">Source:</span> {article.source?.name || 'Unknown'}</p>
                <p className="text-gray-700"><span className="font-semibold">Published:</span> {new Date(article.publishedAt).toLocaleString()}</p>
                <p className="text-gray-700"><span className="font-semibold">URL:</span> <a href={article.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{article.url}</a></p>
            </div>
        </div>
    );
}

export default DetailedArticle;
