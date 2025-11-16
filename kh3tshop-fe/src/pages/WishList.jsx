// src/pages/Wishlist.jsx
import React, { useState, useEffect } from "react";
import { ChevronRight, MoreVertical, Plus, X, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  post(url, body) {
    return this.request(url, { method: "POST", body: JSON.stringify(body) });
  },

  put(url, body) {
    return this.request(url, { method: "PUT", body: JSON.stringify(body) });
  },

  del(url) {
    return this.request(url, { method: "DELETE" });
  },
};

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlistList, setWishlistList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Load wishlists
  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.get("/wishlists");
        setWishlistList(data.result || []);
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
    fetchWishlists();
  }, [navigate]);

  // Open modals
  const openCreate = () => {
    setName("");
    setDescription("");
    setIsCreateOpen(true);
  };

  const openEdit = (item) => {
    setCurrentItem(item);
    setName(item.name);
    setDescription(item.description || "");
    setIsEditOpen(true);
  };

  const openDelete = (item) => {
    setCurrentItem(item);
    setIsDeleteOpen(true);
  };

  // Close modals
  const closeAll = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setCurrentItem(null);
    setName("");
    setDescription("");
  };

  // CREATE
  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      const data = await api.post("/wishlists", { name: name.trim(), description: description.trim() });
      setWishlistList((prev) => [...prev, data.result]);
      closeAll();
    } catch (err) {
      alert(err.message);
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!name.trim()) return;
    try {
      const data = await api.put(`/wishlists/${currentItem.id}`, {
        name: name.trim(),
        description: description.trim(),
      });
      setWishlistList((prev) =>
        prev.map((item) => (item.id === currentItem.id ? data.result : item))
      );
      closeAll();
    } catch (err) {
      alert(err.message);
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      await api.del(`/wishlists/${currentItem.id}`);
      setWishlistList((prev) => prev.filter((item) => item.id !== currentItem.id));
      closeAll();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClick = (id) => {
    navigate(`/wishlists/${id}`);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Wishlists</h1>
          <button
            onClick={openCreate}
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-shadow hover:shadow-md"
            title="New Wishlist"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-8 text-red-500 font-medium">{error}</div>
        )}

        {/* Danh sách */}
        {!loading && !error && (
          <div className="space-y-3">
            {wishlistList.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Chưa có wishlist nào.</p>
                <p className="text-sm mt-1">Nhấn nút + để tạo mới!</p>
              </div>
            ) : (
              wishlistList.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <button
                    onClick={() => handleClick(item.id)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <div className="text-2xl">✨</div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-800 block">{item.name}</span>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                      )}
                      {item.itemCount > 0 && (
                        <span className="text-xs text-gray-400">• {item.itemCount} sản phẩm</span>
                      )}
                    </div>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(item);
                      }}
                      className="text-gray-400 hover:text-blue-600 p-1.5 rounded-full hover:bg-blue-50 transition"
                      title="Sửa"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDelete(item);
                      }}
                      className="text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* MODAL: TẠO MỚI */}
      {isCreateOpen && (
        <Modal
          title="NEW WISHLIST"
          name={name}
          description={description}
          setName={setName}
          setDescription={setDescription}
          onConfirm={handleCreate}
          onClose={closeAll}
          confirmText="Create"
          disabled={!name.trim()}
        />
      )}

      {/* MODAL: SỬA */}
      {isEditOpen && (
        <Modal
          title="EDIT WISHLIST"
          name={name}
          description={description}
          setName={setName}
          setDescription={setDescription}
          onConfirm={handleUpdate}
          onClose={closeAll}
          confirmText="Update"
          disabled={!name.trim()}
        />
      )}

      {/* MODAL: XÓA */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/30" onClick={closeAll} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-red-600">Xóa Wishlist</h2>
              <button onClick={closeAll} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Bạn có chắc muốn xóa <strong>"{currentItem?.name}"</strong>?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Hành động này sẽ xóa vĩnh viễn và không thể hoàn tác.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeAll}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// REUSABLE MODAL COMPONENT
function Modal({ title, name, description, setName, setDescription, onConfirm, onClose, confirmText, disabled }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !disabled && onConfirm()}
              placeholder="Tên wishlist..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả (tùy chọn)..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={disabled}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}