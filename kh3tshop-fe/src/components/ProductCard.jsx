// ProductCard.jsx
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const isSoldOut = product.quantity === 0;

  const goToDetail = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  // LOGIC MỚI: Tính toán giảm giá dựa trên price (gốc) và costPrice (bán)
  const hasDiscount = product.price > product.costPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.costPrice) / product.price) * 100)
    : 0;
    
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 group cursor-pointer"
      onClick={goToDetail}
    >
      <div className="relative overflow-hidden h-80">
        <img
          src={product.imageUrlFront}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* SOLD OUT - Nổi bật */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-bold tracking-wider shadow-2xl border-4 border-white transform -rotate-12">
              SOLD OUT
            </div>
          </div>
        )}

        {/* Giảm giá - Dùng LOGIC MỚI: hasDiscount và discountPercentage */}
        {!isSoldOut && hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{discountPercentage}%
        {/* Giảm giá */}
        {!isSoldOut && product.discountAmount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{product.discountAmount}%
          </div>
        )}

        {/* Nút yêu thích - HIỂN THỊ KỂ CẢ SOLD OUT */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Xử lý thêm vào wishlist
              console.log("Add to wishlist:", product.id);
            }}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 h-14">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {/* GIÁ CHÍNH: Hiển thị costPrice (Giá bán cuối cùng) */}
            <p className="text-2xl font-bold text-red-500">
              {formatPrice(product.costPrice)} 
            </p>
            {/* GIÁ GẠCH NGANG: Hiển thị price (Giá gốc) nếu có giảm giá */}
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
            <p className="text-2xl font-bold text-red-500">
              {formatPrice(product.price)}
            </p>
            {!isSoldOut && product.discountAmount > 0 && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.price * (1 + product.discountAmount / 100))}
              </p>
            )}
          </div>

          {/* Nút giỏ hàng → Xem chi tiết (to hơn) */}
          <button
            onClick={goToDetail}
            className="p-4 rounded-full bg-black text-white hover:bg-red-500 transition flex items-center justify-center"
          >
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;