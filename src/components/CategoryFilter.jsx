
const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex justify-center space-x-1 lg:space-x-4 mb-4 flex-wrap gap-2">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-lg border-2
            ${selectedCategory === category.toLowerCase()
              ? "bg-blue-500 border-blue-500 text-white"
              : "bg-gradient-to-r from-blue-200 to-blue-100 border-gray-300 text-gray-800"}
            hover:bg-blue-600 hover:border-blue-600 focus:outline-none`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
