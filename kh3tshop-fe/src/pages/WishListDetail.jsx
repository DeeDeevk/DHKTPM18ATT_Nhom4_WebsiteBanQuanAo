// src/pages/WishlistDetail.jsx
import React from "react";
import { X, ShoppingCart, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const wishlistData = {
  1: [
    {
      id: 1,
      name: "Quần Short Basic",
      price: 420000,
      image: "https://cdn.hstatic.net/products/200001044768/maverik10808_0deb646363e04d099c308c4716d9650e_1848b3194eb54339bbc8efd8ce7dbea5_master.jpg",
    },
    {
      id: 2,
      name: "Áo Thun Trắng",
      price: 250000,
      image: "https://cdn.shopify.com/s/files/1/0274/1234/products/tshirt_white.jpg",
    },
  ],
  2: [
    {
      id: 3,
      name: "Áo Khoác Len Mùa Thu",
      price: 750000,
      image: "https://product.hstatic.net/1000286959/product/ao_khoac_len_mau_thu_1.jpg",
    },
  ],
  3: [
    {
      id: 4,
      name: "Áo Phao Lông Vũ",
      price: 1290000,
      image: "https://product.hstatic.net/1000286959/product/ao_phao_mua_dong.jpg",
    },
  ],
};

const wishlistNames = {
  1: "Favorited",
  2: "Mùa thu",
  3: "Mùa đông",
};

export default function WishlistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const items = wishlistData[id] || [];
  const wishlistName = wishlistNames[id] || "Wishlist";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6">My Wishlist - {wishlistName}</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No items in this wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl p-4 relative group hover:shadow-lg transition"
            >
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 z-10">
                <X size={20} />
              </button>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300?text=No+Image";
                }}
              />
              <h2 className="font-bold text-lg mb-2">{item.name}</h2>
              <p className="text-red-500 font-semibold mb-4">
                {item.price.toLocaleString()}₫
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}