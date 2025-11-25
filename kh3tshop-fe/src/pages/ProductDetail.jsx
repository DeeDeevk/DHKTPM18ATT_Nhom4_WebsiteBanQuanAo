// Full Updated ProductDetail.jsx with discount_amount price logic
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  CreditCard,
  X,
  ZoomIn,
  Minus,
  Plus,
} from "lucide-react";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [currentImage, setCurrentImage] = useState("front");
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [cart, setCart] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`http://localhost:8080/accounts/myinfor`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Tài khoản đang login: ", data.result);
      setUser(data.result);
    } catch (error) {
      console.error("Lỗi fetch user", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:8080/carts/account/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("Cart của user: ", data.result);
      setCart(data.result);
    } catch (error) {
      console.error("Lỗi fetch cart: ", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.result || null);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchOtherProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        if (response.ok) {
          const data = await response.json();
          let products = data.result || [];

          products.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          products = products.filter((p) => p.id !== parseInt(id)).slice(0, 4);
          setOtherProducts(products);
        }
      } catch (error) {
        console.error("Error fetching other products:", error);
      }
    };
    fetchOtherProducts();
  }, [id]);

  const formatPrice = (price) => {
    // Đảm bảo giá là một số hợp lệ
    const numericPrice =
      typeof price === "number" && isFinite(price) ? price : 0;

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numericPrice);
  };

  // ✅ LOGIC TÍNH TOÁN GIÁ GỐC DỰA TRÊN PERCENTAGE DISCOUNT
  const costPrice =
    product?.discount_amount > 0 && product?.price > 0
      ? Math.round(product.price / (1 - product.discount_amount / 100))
      : product?.price;

  const handleAddToCart = async () => {
    if (uniqueSizes.length > 0) {
      if (!selectedSize) return alert("Please select a size");
    }
    if (!user?.id) {
      alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng");
    }
    if (quantity < 1) return alert("Quantity must be at least 1");

    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);

    const dataSend = {
      productId: parseInt(id),
      cartId: cart.id,
      quantity: quantity,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:8080/cart-details/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataSend),
        }
      );
    } catch (error) {
      console.log("Lỗi thêm vào cart: ", error);
    }
  };

  const handleBuyNow = () => {
    if (uniqueSizes.length > 0) {
      if (!selectedSize) return alert("Please select a size");
    }
    if (quantity < 1) return alert("Quantity must be at least 1");

    alert(`Proceeding to checkout with ${quantity} items...`);
  };

  const handleZoom = (imageType) => {
    setZoomImage(
      imageType === "front" ? product.imageUrlFront : product.imageUrlBack
    );
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const changeQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    setZoomLevel((prev) => Math.max(1, Math.min(prev + delta, 5)));
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (moveE) => {
      setPosition({
        x: moveE.clientX - startX,
        y: moveE.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          {error || "Product not found"}
        </h3>
        <Link to="/product" className="text-red-500 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const uniqueSizes = [];
  const sizeMap = new Map();

  product.sizeDetails?.forEach((size) => {
    if (sizeMap.has(size.sizeName)) {
      const existing = sizeMap.get(size.sizeName);
      existing.quantity += size.quantity;
    } else {
      sizeMap.set(size.sizeName, { ...size });
    }
  });

  sizeMap.forEach((value) => uniqueSizes.push(value));
  uniqueSizes.sort((a, b) => {
    const order = ["S", "M", "L", "XL"];
    return order.indexOf(a.sizeName) - order.indexOf(b.sizeName);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-black to-gray-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-gray-200">
            Discover this item from KH3T Studio
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* IMAGE SECTION */}
          <div className="bg-white rounded-xl shadow-md p-6 relative">
            <div className="relative group">
              <img
                src={
                  currentImage === "front"
                    ? product.imageUrlFront
                    : product.imageUrlBack
                }
                alt={product.name}
                className="w-full h-auto rounded-lg object-cover cursor-pointer"
                onClick={() => handleZoom(currentImage)}
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={24} className="text-gray-600" />
              </div>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => setCurrentImage("front")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  currentImage === "front"
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setCurrentImage("back")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  currentImage === "back"
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Back
              </button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>

            {/* ✅ PRICE SECTION UPDATED */}
            <div className="flex items-center gap-3 mb-4">
              {/* Giá sale (Giá sau khi giảm) */}
              <span className="text-3xl font-bold text-red-500">
                {formatPrice(product.price)}
              </span>

              {/* Giá gốc (Tính từ discount_amount) */}
              {product.discount_amount > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(costPrice)}
                </span>
              )}

              {/* Badge giảm */}
              {product.discount_amount > 0 && (
                <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full shadow">
                  -{product.discount_amount}%
                </span>
              )}
            </div>

            <div className="flex items-center mb-4">
              <Star className="text-yellow-400" size={20} />
              <span className="ml-1 font-medium">
                {product.rating || "N/A"}
              </span>
            </div>

            {/* SIZE SELECT */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Select Size</h3>
              <div className="flex gap-2 flex-wrap">
                {uniqueSizes.map((size) => (
                  <button
                    key={size.sizeName}
                    onClick={() => setSelectedSize(size.sizeName)}
                    disabled={size.quantity <= 0}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size.sizeName
                        ? "bg-red-500 text-white border-red-500"
                        : "border-gray-300 hover:bg-gray-100"
                    } ${
                      size.quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {size.sizeName}
                  </button>
                ))}
                {uniqueSizes.length === 0 && <p>No sizes available</p>}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Quantity</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(-1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => changeQuantity(1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={20} />{" "}
                {isAddedToCart ? "Added" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <CreditCard size={20} /> Buy Now
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Description</h3>
              <p className="text-gray-600">{product.description}</p>

              <h3 className="font-bold text-lg">Details</h3>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Form: {product.form}</li>
                <li>Material: {product.material}</li>
                <li>Unit: {product.unit}</li>
              </ul>

              <h3 className="font-bold text-lg">Size Chart</h3>
              <img
                src={product.category?.imageUrl}
                alt="Size Chart"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* YOU MAY ALSO LIKE */}
        {otherProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ZOOM MODAL */}
      {zoomImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-hidden transition-opacity duration-300 ease-in-out">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              ref={imageRef}
              src={zoomImage}
              alt="Zoomed product"
              className="rounded-lg cursor-grab transition-transform duration-200 ease-in-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                maxHeight: "90vh",
                objectFit: "contain",
              }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
            />
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <X size={24} className="text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
