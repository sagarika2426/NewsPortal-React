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
            <div className="flex items-center justify-center h-screen">
                <CircularProgress color="primary" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">Article not found.</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto lg:py-8 py-3 px-2">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 lg:p-4">
                        <img src={article.urlToImage} alt={article.title} className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
                    </div>
                    <div className="md:w-1/2 lg:p-4 p-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">{new Date(article.publishedAt).toLocaleDateString()}</span>
                            <span className="text-gray-600 text-sm">By {article.author || 'Unknown'}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mt-2">{article.title}</h1>
                        <p className="mt-2 text-gray-600">{article.description}</p>
                        <div className="mt-4">
                            <a href={article.url} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition duration-300 inline-block" target="_blank" rel="noopener noreferrer">
                                Read More
                            </a>

                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 p-4 mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Article Details</h2>
                    <p className="text-gray-700"><span className="font-semibold">Source:</span> {article.source?.name || 'Unknown'}</p>
                    <p className="text-gray-700"><span className="font-semibold">Published:</span> {new Date(article.publishedAt).toLocaleString()}</p>
                    <p className="text-gray-700"><span className="font-semibold">URL:</span> <a href={article.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{article.url}</a></p>
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
}

export default DetailedArticle;
