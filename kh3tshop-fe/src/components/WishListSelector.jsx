
import React from "react";
import { X, Plus, Heart } from "lucide-react";

const API_BASE = "http://localhost:8080";

const api = {
  get: async (url) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${API_BASE}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lỗi");
    return data;
  },
  post: async (url, body) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Lỗi");
    return data;
  },
  del: async (url) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${API_BASE}${url}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Lỗi");
    }
  },
};

export default function WishlistSelectorModal({ productId, isOpen, onClose, onSuccess }) {
  const [wishlists, setWishlists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [savingIds, setSavingIds] = React.useState(new Set());
  
  // Tạo wishlist mới
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newDesc, setNewDesc] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) return;

    const fetchWishlists = async () => {
      try {
        setLoading(true);
        const data = await api.get("/wishlists");
        const list = data.result || [];

        const updated = await Promise.all(
          list.map(async (wl) => {
            try {
              const check = await api.get(`/wishlists/${wl.id}/items`);
              const items = check.result || [];
              return { ...wl, hasProduct: items.some(i => i.productId === productId) };
            } catch {
              return { ...wl, hasProduct: false };
            }
          })
        );
        setWishlists(updated);
      } catch (err) {
        alert("Không tải được wishlist: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlists();
  }, [isOpen, productId]);

  const toggleProductInWishlist = async (wishlistId, currentHasProduct) => {
    if (savingIds.has(wishlistId)) return;

    setSavingIds(prev => new Set(prev).add(wishlistId));

    try {
      if (currentHasProduct) {
        await api.del(`/wishlists/${wishlistId}/items/${productId}`);
      } else {
        // SỬA: Gửi đúng key "productId"
        await api.post(`/wishlists/${wishlistId}/items`, { productId });
      }

      setWishlists(prev =>
        prev.map(wl =>
          wl.id === wishlistId ? { ...wl, hasProduct: !currentHasProduct } : wl
        )
      );

      onSuccess?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingIds(prev => {
        const next = new Set(prev);
        next.delete(wishlistId);
        return next;
      });
    }
  };

  // TẠO WISHLIST MỚI
  const handleCreateWishlist = async () => {
    if (!newName.trim()) {
      alert("Tên wishlist không được để trống!");
      return;
    }

    try {
      const data = await api.post("/wishlists", {
        name: newName.trim(),
        description: newDesc.trim() || null
      });

      const newWishlist = data.result;
      setWishlists(prev => [...prev, { ...newWishlist, hasProduct: false }]);
      setNewName("");
      setNewDesc("");
      setShowCreateForm(false);

      // Tự động thêm sản phẩm vào wishlist vừa tạo
      await toggleProductInWishlist(newWishlist.id, false);
    } catch (err) {
      alert("Tạo wishlist thất bại: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-semibold">Thêm vào Wishlist</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Nội dung cuộn */}
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Đang tải...</div>
          ) : showCreateForm ? (
            // FORM TẠO MỚI
            <div className="p-5 space-y-4">
              <input
                type="text"
                placeholder="Tên wishlist..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <textarea
                placeholder="Mô tả (tùy chọn)"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateWishlist}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tạo & Thêm
                </button>
              </div>
            </div>
          ) : wishlists.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>Chưa có wishlist nào</p>
            </div>
          ) : (
            <div className="divide-y">
              {wishlists.map((wl) => (
                <button
                  key={wl.id}
                  onClick={() => toggleProductInWishlist(wl.id, wl.hasProduct)}
                  disabled={savingIds.has(wl.id)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition disabled:opacity-70"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl"></div>
                    <div className="text-left">
                      <div className="font-medium">{wl.name}</div>
                      {wl.description && (
                        <div className="text-xs text-gray-500">{wl.description}</div>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        {wl.itemCount || 0} sản phẩm
                      </div>
                    </div>
                  </div>
                  {savingIds.has(wl.id) ? (
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                  ) : (
                    <Heart
                      size={24}
                      fill={wl.hasProduct ? "#ef4444" : "none"}
                      className={wl.hasProduct ? "text-red-500" : "text-gray-400"}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NÚT TẠO MỚI */}
        {!showCreateForm && (
          <div className="p-4 border-t bg-gray-50">
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full py-3 flex items-center justify-center gap-2 text-blue-600 hover:bg-gray-100 rounded-lg transition font-medium"
            >
              <Plus size={20} />
              Tạo wishlist mới
            </button>
          </div>
        )}
      </div>
    </div>
  );
}