// src/pages/Wishlist.jsx
import React, { useState } from "react";
import { ChevronRight, MoreVertical, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [wishlistList, setWishlistList] = useState([
    { id: 1, name: "Favorited" },
    { id: 2, name: "Mùa thu" },
    { id: 3, name: "Mùa đông" },
  ]);

  const handleClick = (id) => {
    navigate(`/wishlist/${id}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setName("");
  };

  const handleCreate = () => {
    if (!name.trim()) return;

    const newId = Math.max(...wishlistList.map((w) => w.id), 0) + 1;
    const newWishlist = { id: newId, name: name.trim() };

    setWishlistList([...wishlistList, newWishlist]);
    closeModal();
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>

          {/* Nút + mở modal */}
          <button
            onClick={openModal}
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-shadow hover:shadow-md"
            title="New Wishlist"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {wishlistList.map((item) => (
            <div
              key={item.id}
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <button
                onClick={() => handleClick(item.id)}
                className="flex items-center gap-3 flex-1 text-left"
              >
                {/* Icon cũ: Sparkles → Giữ nguyên emoji Sparkles */}
                <div className="text-2xl">✨</div>
                <span className="font-medium text-gray-800">{item.name}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Edit/Delete: ${item.name}`);
                  }}
                  className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <MoreVertical size={20} />
                </button>
                <ChevronRight className="text-gray-400" size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Chỉ blur nền, không đen */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop: blur + nền trắng mờ */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/30"
            onClick={closeModal}
          />

          {/* Modal content */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">NEW PROJECT</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="Example: The thao, Du lich..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                autoFocus
              />
            </div>

{/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}