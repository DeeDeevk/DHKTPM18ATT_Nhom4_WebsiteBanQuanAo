import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const calculateSummary = (items) => {
  if (!Array.isArray(items))
    return {
      subtotal: 0,
      discount: 0,
      shippingFee: 0,
      total: 0,
      shippingText: "Not Yet",
      minFreeShipping: 1000000,
    };

  const selectedItems = items.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
  const minFreeShipping = 1000000;
  const standardShippingFee = 0;
  const discount = 0;

  const shippingFee = subtotal >= minFreeShipping ? 0 : standardShippingFee;
  const shippingText = subtotal >= minFreeShipping ? "Free" : "Not Yet";

  const total = subtotal - discount + shippingFee;

  return {
    subtotal,
    discount,
    shippingFee,
    total,
    shippingText,
    minFreeShipping,
  };
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const hanldeFetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token: ", token);
      const res = await fetch(`http://localhost:8080/cart-details/cart/6`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Cart API: ", data);
      const items = Array.isArray(data) ? data : data.cartDetails || [];
      setCartItems(data);
    } catch (err) {
      console.error("Lỗi: ", err);
    }
  };

  const handleToggleSelect = async (cartDetailId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === cartDetailId ? { ...item, selected: !item.selected } : item
    );

    setCartItems(updatedItems);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:8080/cart-details/${cartDetailId}/select`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            selected: updatedItems.find((i) => i.id === cartDetailId).selected,
          }),
        }
      );

      const data = await res.json();
      console.log("Update select response: ", data);
    } catch (err) {
      console.error("Lỗi update select: ", err);
    }
  };

  const handleToggleIncrease = async (cartDetailId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:8080/cart-details/${cartDetailId}/increase-quantity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setCartItems(
        cartItems.map((item) => (item.id === cartDetailId ? data : item))
      );
      console.log("Update quantity response: ", data);
    } catch (err) {
      console.error("Lỗi update select: ", err);
    }
  };

  const handleToggleDecrease = async (cartDetailId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:8080/cart-details/${cartDetailId}/decrease-quantity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setCartItems(
        cartItems.map((item) => (item.id === cartDetailId ? data : item))
      );
      console.log("Update quantity response: ", data);
    } catch (err) {
      console.error("Lỗi update select: ", err);
    }
  };

  const handleDelete = async (cartDetailId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:8080/cart-details/delete/${cartDetailId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setCartItems(cartItems.filter((item) => item.id !== cartDetailId));
      } else {
        console.error("Delete failed:", res.statusText);
      }
    } catch (err) {
      console.error("Lỗi update select: ", err);
    }
  };

  useEffect(() => {
    hanldeFetchCart();
  }, []);

  const summary = calculateSummary(cartItems);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900">Cart</h1>
              <span className="text-sm font-semibold text-gray-500 cursor-pointer hover:text-red-500">
                🔍︎ Track Order
              </span>
            </div>
            <div className="grid grid-cols-5 font-semibold border-b pb-3 text-gray-700 text-sm uppercase">
              <div className="col-span-3">Item</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Unit Price</div>
            </div>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 items-center border-b py-6"
                >
                  <div className="col-span-3 flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      readOnly
                      className="mt-2 w-4 h-4 text-black border-gray-300 rounded"
                      onChange={() => handleToggleSelect(item.id)}
                    />

                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div className="flex flex-col">
                      <div className="font-semibold text-base hover:text-red-500">
                        {item.productName}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {item.productName ? item.productName.split(",")[0] : ""}
                      </div>
                      <div className="text-gray-500 text-sm">Size: L</div>
                      <button
                        className="text-red-500 text-sm mt-1 text-left hover:text-red-700"
                        onClick={() => handleDelete(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center border border-gray-300 rounded-full w-24 mx-auto p-1">
                      <button
                        className="text-lg px-2 hover:bg-gray-100 rounded-full"
                        onClick={() => handleToggleDecrease(item.id)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        readOnly
                        className="w-10 text-center text-sm focus:outline-none border-0 bg-transparent p-0 m-0"
                      />
                      <button
                        className="text-lg px-2 hover:bg-gray-100 rounded-full"
                        onClick={() => handleToggleIncrease(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold text-lg">
                    {formatVND(item.subtotal)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                Giỏ hàng rỗng.
              </div>
            )}

            <div className="mt-8 flex justify-start">
              <button
                onClick={() => navigate("/product")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md transition font-semibold hover:bg-black hover:text-white"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 border-t-4 border-red-500 p-6 rounded-lg bg-gray-50 shadow-md h-fit">
            <h2 className="text-3xl font-bold mb-6 text-red-500">Summary</h2>

            <div className="mb-6 pb-4 border-b">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Discount Code"
                  className="flex-grow border border-gray-300 p-3 rounded-l focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button className="bg-black text-white px-4 py-3 rounded-r font-semibold hover:bg-gray-800 transition">
                  Apply
                </button>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg text-gray-800">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  {formatVND(summary.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping fee:</span>
                <span>{summary.shippingText}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount:</span>
                <span>{formatVND(summary.discount)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total:</span>
              <span className="text-red-500">{formatVND(summary.total)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-8 bg-black text-white py-3 rounded font-bold text-lg hover:bg-gray-800 transition shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
