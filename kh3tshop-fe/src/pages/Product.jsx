import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Folder,
  DollarSign,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import ChatBot from "../components/ChatBot"; 

const Product = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  // Pagination: 3 dòng × 3 cột = 9 sản phẩm/trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Read sort parameter from URL query on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortParam = params.get("sort");
    if (sortParam === "bestselling" || sortParam === "newest") {
      setSortBy(sortParam);
    }
  }, [location.search]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.result || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.result || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Reset to first page whenever user changes category filter
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Reset to first page whenever sort order changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  // Filter & Sort
  const processedProducts = useMemo(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      const catId = parseInt(selectedCategory);
      filtered = filtered.filter((p) => p.category?.id === catId);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case "bestselling":
        filtered.sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const paginatedProducts = processedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const sortOptions = [
    { value: "default", label: "Default Order" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "bestselling", label: "Best Selling" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 overflow-hidden">
        {/* White gradient overlay from bottom to top */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent opacity-30 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 z-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Our Products</h1>
            <p className="text-md text-gray-300 mt-1">
              Discover the latest fashion trends from KH3T Studio
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar: Categories */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                <Folder size={20} className="text-red-500" />
                Categories
              </h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === "all"
                        ? "bg-red-500 text-white shadow-sm"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() =>
                        setSelectedCategory(category.id.toString())
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id.toString()
                          ? "bg-red-500 text-white shadow-sm"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Search + Sort + Price Range */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1 w-full">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Sort Dropdown - ĐẸP HƠN */}
                <div className="relative w-full md:w-64">
                  <select
                    className="appearance-none w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={20} className="text-gray-500" />
                  </div>
                </div>

                {/* Price Range Toggle */}
                <button
                  onClick={() => setShowPriceRange(!showPriceRange)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-200 font-medium w-full md:w-auto justify-center ${
                    showPriceRange
                      ? "bg-red-50 border-2 border-red-500 text-red-700"
                      : "bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <DollarSign size={18} className="text-green-600" />
                  <span>Price Range</span>
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-200 ${
                      showPriceRange ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Price Range Slider */}
              {showPriceRange && (
                <div className="mt-5 pt-5 border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Price Range: {formatPrice(priceRange[0])} —{" "}
                    {formatPrice(priceRange[1])}
                  </label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="range"
                      min="0"
                      max="2000000"
                      step="50000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000000"
                      step="50000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 font-medium">
                Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, processedProducts.length)}{" "}
                of {processedProducts.length} products
              </p>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
              </div>
            )}
            {/* Product Grid: 3 cột */}
            {!loading && paginatedProducts.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`p-2.5 rounded-lg border transition-all ${
                        currentPage === 1
                          ? "text-gray-400 border-gray-300 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          currentPage === i + 1
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-white text-gray-700 border hover:bg-gray-50 hover:shadow-sm"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={`p-2.5 rounded-lg border transition-all ${
                        currentPage === totalPages
                          ? "text-gray-400 border-gray-300 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* No Results */}
            {!loading && processedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </main>
        </div>
         <ChatBot />
      </div>
    </div>
  );
};

export default Product;
