import React, { useState } from "react";
import { useNavigate } from "react-router";

const Product = [
  {
    product_id: "P001",
    name: "Áo Phông Unisex",
    description: "Cotton 100%, Trắng",
    unit_price: 150000.0,
    stock_quantity: 50,
    category_id: "C101",
    status: "ACTIVE",
    created_at: "2025-11-01T08:00:00Z",
    updated_at: "2025-11-01T08:00:00Z",
    image_url:
      "https://cdn.hstatic.net/products/200001044768/img_5733_8701f4f429ee45b780667745a0894d98_9adf01edd3c54a52baf275a794a06843_master.jpg",
  },
  {
    product_id: "P002",
    name: "Quần Jeans Slim Fit",
    description: "Denim co giãn, Xanh",
    unit_price: 450000.0,
    stock_quantity: 30,
    category_id: "C102",
    status: "ACTIVE",
    created_at: "2025-11-01T08:00:00Z",
    updated_at: "2025-11-01T08:00:00Z",
    image_url:
      "https://cdn.hstatic.net/products/200001044768/img_5733_8701f4f429ee45b780667745a0894d98_9adf01edd3c54a52baf275a794a06843_master.jpg",
  },
  {
    product_id: "P003",
    name: "Giày Thể Thao",
    description: "Da lộn, Đen, size 40",
    unit_price: 700000.0,
    stock_quantity: 15,
    category_id: "C103",
    status: "ACTIVE",
    created_at: "2025-11-01T08:00:00Z",
    updated_at: "2025-11-01T08:00:00Z",
    image_url:
      "https://cdn.hstatic.net/products/200001044768/img_5733_8701f4f429ee45b780667745a0894d98_9adf01edd3c54a52baf275a794a06843_master.jpg",
  },
  {
    product_id: "P004",
    name: "Tai Nghe Bluetooth",
    description: "Chống ồn, Pin 8h",
    unit_price: 350000.0,
    stock_quantity: 100,
    category_id: "C104",
    status: "ACTIVE",
    created_at: "2025-11-01T08:00:00Z",
    updated_at: "2025-11-01T08:00:00Z",
    image_url:
      "https://cdn.hstatic.net/products/200001044768/img_5733_8701f4f429ee45b780667745a0894d98_9adf01edd3c54a52baf275a794a06843_master.jpg",
  },
];

const Cart_Detail = [
  {
    cart_detail_id: "CD001",
    cart_id: "CT001",
    product_id: "P001",
    quantity: 2,
    unit_price: 150000.0,
    subtotal: 300000.0,
    is_selected: false,
    created_at: "2025-11-15T10:10:00Z",
    updated_at: "2025-11-15T10:10:00Z",
  },
  {
    cart_detail_id: "CD002",
    cart_id: "CT001",
    product_id: "P004",
    quantity: 1,
    unit_price: 350000.0,
    subtotal: 350000.0,
    is_selected: true,
    created_at: "2025-11-15T10:15:00Z",
    updated_at: "2025-11-15T10:15:00Z",
  },
  {
    cart_detail_id: "CD003",
    cart_id: "CT002",
    product_id: "P002",
    quantity: 1,
    unit_price: 450000.0,
    subtotal: 450000.0,
    is_selected: true,
    created_at: "2025-11-15T10:20:00Z",
    updated_at: "2025-11-15T10:20:00Z",
  },
  {
    cart_detail_id: "CD004",
    cart_id: "CT002",
    product_id: "P003",
    quantity: 1,
    unit_price: 700000.0,
    subtotal: 700000.0,
    is_selected: false,
    created_at: "2025-11-15T10:25:00Z",
    updated_at: "2025-11-15T10:25:00Z",
  },
];

const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const calculateSummary = (items) => {
  const selectedItems = items.filter((item) => item.is_selected);
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
  const currentCartId = "CT001";
  const navigate = useNavigate();
  const filterCart = Cart_Detail.filter((item) => item.cart_id === "CT001");
  const cartItems = Cart_Detail.filter(
    (detail) => detail.cart_id === currentCartId
  ).map((detail) => {
    const product = Product.find((p) => p.product_id === detail.product_id);
    return {
      ...detail,
      product_name: product ? product.name : "Unknown Product",
      product_description: product ? product.description : "No description",
      image_url: product.image_url,
    };
  });

  const summary = calculateSummary(
    Cart_Detail.filter((item) => item.cart_id === currentCartId)
  );

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
                  key={item.cart_detail_id}
                  className="grid grid-cols-5 items-center border-b py-6"
                >
                  <div className="col-span-3 flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={item.is_selected}
                      readOnly
                      className="mt-2 w-4 h-4 text-black border-gray-300 rounded"
                    />

                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div className="flex flex-col">
                      <div className="font-semibold text-base hover:text-red-500">
                        {item.product_name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {item.product_description.split(",")[0]}
                      </div>
                      <div className="text-gray-500 text-sm">Size: L</div>
                      <button className="text-red-500 text-sm mt-1 text-left hover:text-red-700">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center border border-gray-300 rounded-full w-24 mx-auto p-1">
                      <button className="text-lg px-2 hover:bg-gray-100 rounded-full">
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        readOnly
                        className="w-10 text-center text-sm focus:outline-none border-0 bg-transparent p-0 m-0"
                      />
                      <button className="text-lg px-2 hover:bg-gray-100 rounded-full">
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
