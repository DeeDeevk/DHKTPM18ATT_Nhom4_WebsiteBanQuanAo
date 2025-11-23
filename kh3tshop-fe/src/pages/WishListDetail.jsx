// src/pages/WishlistDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import ProductCard from "../components/ProductCard";

const API_BASE = "http://localhost:8080";

const api = {
  async request(url, options = {}) {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  },

  get(url) {
    return this.request(url, { method: "GET" });
  },

  del(url) {
    return this.request(url, { method: "DELETE" });
  },
};

export default function WishlistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await api.get(`/wishlists/${id}/items`);
        const items = data.result || [];

        const productList = items.map(item => ({
          id: item.productId,
          name: item.productName,
          imageUrlFront: item.productImage,
          price: item.productPrice,
          costPrice: item.productCostPrice || item.productPrice,
          discountAmount: item.discountAmount || 0,
          quantity: 1,
          rating: 4.5,
        }));

        setProducts(productList);
      } catch (err) {
        setError(err.message);
        if (err.message.includes("Unauthorized")) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistDetail();
  }, [id, navigate]);

  const handleRemoveItem = async (productId) => {
    if (!window.confirm("Xóa sản phẩm khỏi wishlist này?")) return;

    try {
      await api.del(`/wishlists/${id}/items/${productId}`);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      alert(err.message || "Xóa thất bại");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* HEADER - Chỉ hiện số lượng */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Quay lại</span>
        </button>

        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800">
            {products.length} sản phẩm
          </h1>
          <p className="text-sm text-gray-500 mt-1">Trong wishlist của bạn</p>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* ERROR */}
      {error && !loading && (
        <div className="text-center py-16 text-red-500 font-medium">{error}</div>
      )}

      {/* DANH SÁCH SẢN PHẨM */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <div className="text-6xl mb-4">Empty Box</div>
              <p className="text-xl text-gray-500">Chưa có sản phẩm nào trong wishlist</p>
              <button
                onClick={() => navigate("/product")}
                className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition inline-flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="relative group">
                  {/* NÚT XÓA - hiện khi hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(product.id);
                    }}
                    className="absolute top-3 right-3 z-30 bg-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-600"
                    title="Xóa khỏi wishlist"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* PRODUCT CARD + TẮT CHỈ NÚT TIM */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="cursor-pointer [&_button]:pointer-events-none [&_button]:opacity-60"
                  >
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}