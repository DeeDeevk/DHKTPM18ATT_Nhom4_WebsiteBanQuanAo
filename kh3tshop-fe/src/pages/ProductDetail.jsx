// Updated ProductDetail.jsx (with smoother zoom using CSS transitions and wheel zoom)
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, CreditCard, X, ZoomIn, Minus, Plus } from "lucide-react";
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
  const [zoomLevel, setZoomLevel] = useState(1); // THÊM: Level zoom ban đầu
  const [position, setPosition] = useState({ x: 0, y: 0 }); // THÊM: Vị trí pan
  const imageRef = useRef(null); // THÊM: Ref cho ảnh zoom

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8081/products/${id}`);
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
        const response = await fetch("http://localhost:8081/products");
        if (response.ok) {
          const data = await response.json();
          let products = data.result || [];
          products.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
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
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }
    alert(`Proceeding to checkout with ${quantity} items...`);
  };

  const getSizeChartCategory = (catId) => {
    switch (catId) {
      case 1:
        return "Tops";
      case 2:
        return "Bottoms";
      case 3:
        return "Accessories";
      default:
        return "General";
    }
  };

  const handleZoom = (imageType) => {
    setZoomImage(imageType === "front" ? product.imageUrlFront : product.imageUrlBack);
    setZoomLevel(1); // Reset zoom level
    setPosition({ x: 0, y: 0 }); // Reset position
  };

  const changeQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // THÊM: Handle wheel for zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    setZoomLevel((prev) => Math.max(1, Math.min(prev + delta, 5))); // Zoom từ 1x đến 5x
  };

  // THÊM: Handle mouse down for pan
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
        <h3 className="text-2xl font-bold text-gray-700 mb-2">{error || "Product not found"}</h3>
        <Link to="/product" className="text-red-500 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  // Deduplicate sizes
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
    const order = ['S', 'M', 'L', 'XL'];
    return order.indexOf(a.sizeName) - order.indexOf(b.sizeName);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-black to-gray-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-200">
            Discover this item from KH3T Studio
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="bg-white rounded-xl shadow-md p-6 relative">
            <div className="relative group">
              <img
                src={currentImage === "front" ? product.imageUrlFront : product.imageUrlBack}
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
                  currentImage === "front" ? "bg-red-500 text-white" : "bg-white text-gray-700"
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setCurrentImage("back")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  currentImage === "back" ? "bg-red-500 text-white" : "bg-white text-gray-700"
                }`}
              >
                Back
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-red-500">{formatPrice(product.costPrice)}</span>
              <span className="text-xl text-gray-500 line-through">{formatPrice(product.price)}</span>
            </div>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400" size={20} />
              <span className="ml-1 font-medium">{product.rating || "N/A"}</span>
            </div>

            {/* Sizes as buttons - only sizeName */}
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
                    } ${size.quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {size.sizeName}
                  </button>
                ))}
                {uniqueSizes.length === 0 && <p>No sizes available</p>}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Quantity</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(-1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-lg">{quantity}</span>
                <button
                  onClick={() => changeQuantity(1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={20} />
                {isAddedToCart ? "Added" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <CreditCard size={20} />
                Buy Now
              </button>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Description</h3>
              <p className="text-gray-600">{product.description}</p>
              
              <h3 className="font-bold text-lg">Details</h3>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Form: {product.form}</li>
                <li>Material: {product.material}</li>
                <li>Unit: {product.unit}</li>
              </ul>

              <h3 className="font-bold text-lg">Size Chart ({getSizeChartCategory(product.category?.id)})</h3>
              <img
                src={product.category?.imageUrl}
                alt="Size Chart"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Other Products */}
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

      {/* Zoom Modal - smoother with animation, wheel zoom, and pan */}
      {zoomImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-hidden transition-opacity duration-300 ease-in-out"
          style={{ opacity: zoomImage ? 1 : 0 }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              ref={imageRef}
              src={zoomImage}
              alt="Zoomed product"
              className="rounded-lg cursor-grab transition-transform duration-200 ease-in-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                maxHeight: '90vh',
                objectFit: 'contain',
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