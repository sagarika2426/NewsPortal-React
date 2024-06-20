import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    articles: [],
    currentPage: 1,
    articlesPerPage: 3, // number of articles you want to show on each page
    selectedCategory: "",
    loading: false,
    error: null,
    searchQuery: "",
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
}

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1; // reset to first page when you change the category
        },
        setCurrentPage : (state, action) => {
            state.currentPage = action.payload;

        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        addToFavorites: (state, action) => {
            const articleToAdd = action.payload;
            const exists = state.favorites.some((article) => article.title === articleToAdd.title);
            if (!exists) {
                state.favorites.push(articleToAdd);
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        },
        removeFromFavorites: (state, action) => {
            const titleToRemove = action.payload;
            state.favorites = state.favorites.filter(article => article.title !== titleToRemove);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },

        
    }

})

export const {
    setArticles,
    setSelectedCategory,
    setCurrentPage,
    setLoading,
    setError,
    setSearchQuery,
    addToFavorites,
    removeFromFavorites
} = articlesSlice.actions;

export default articlesSlice.reducer;