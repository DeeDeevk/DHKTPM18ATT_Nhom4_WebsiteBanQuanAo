import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

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
      shippingFee: 30000,
      total: 0,
    };

  const selectedItems = items.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((s, i) => s + i.subtotal, 0);
  const discount = 0;
  const shippingFee = 30000;
  const total = subtotal - discount + shippingFee;

  return { subtotal, discount, shippingFee, total };
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addresses, setAddresses] = useState([]);
  const userId = location.state?.userId;
  const selectedCartItems = location.state?.select || [];
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    discount: 0,
    shippingFee: 0,
    total: 0,
  });

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
  });
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`http://localhost:8080/addresses/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setAddresses(data);
      } catch (error) {
        console.log("Lỗi fetch Addreses: ", error);
      }
    };
    if (userId) fetchAddresses();
  }, [userId]);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCartItems(parsed);
      setSummary(calculateSummary(parsed));
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSelectAddress = (index) => {
    if (index === "") return;

    const addr = addresses[index];

    setForm((prev) => ({
      ...prev,
      address: addr.delivery_address,
      province: addr.province,
      district: addr.city,
      ward: addr.ward || "",
      note: addr.delivery_note || "",
    }));
  };
  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const fullAddress = `${form.address}${
        form.ward ? ", " + form.ward : ""
      }, ${form.district}, ${form.province}`;

      const requestBody = {
        receiverName: form.name,
        receiverPhone: form.phone,
        receiverEmail: form.email,
        receiverAddress: fullAddress,
        totalAmount: summary.total,
      };

      const res = await fetch("http://localhost:8080/customer-trading/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const data = await res.json();
      console.log(data);
      const orderBody = {
        customerTradingId: data.id,
        note: form.note || "",
      };

      const orderRes = await fetch("http://localhost:8080/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderBody),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");

      const orderData = await orderRes.json();
      console.log("Order created:", orderData);
      if (orderData.ok) {
        alert("Đặt hàng thành công!!");
      }
      for (const item of selectedCartItems) {
        await fetch(`http://localhost:8080/order-details/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity: item.quantity,
            unitPrice: item.priceAtTime,
            totalPrice: item.subtotal,
            orderId: orderData.id,
            productId: item.id,
          }),
        });
      }
      localStorage.removeItem("cartItems");
      navigate("/");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">
        <div>
          <h1 className="text-3xl font-bold mb-5">Shipping Information</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-3 rounded"
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border p-3 rounded"
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="border p-3 rounded"
              onChange={handleChange}
            />

            <select
              name="address"
              className="border p-3 rounded md:col-span-2"
              onChange={(e) => handleSelectAddress(e.target.value)}
            >
              <option value="">-- Select saved address --</option>
              {addresses.map((addr, index) => (
                <option key={index} value={index}>
                  {addr.delivery_address} ({addr.province})
                </option>
              ))}
            </select>

            <textarea
              name="note"
              placeholder="Notes (optional)"
              className="border p-3 rounded md:col-span-2"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">Delivery Method</h2>
          <div className="border p-4 rounded flex justify-between items-center">
            <span>Standard (3–5 business days)</span>
            <span className="font-semibold">{formatVND(30000)}</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">Payment Method</h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
              <input type="radio" name="payment" />
              <span>Cash on Delivery (COD)</span>
            </label>

            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
              <input type="radio" name="payment" />
              <span>Bank Transfer</span>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t-4 border-red-500 p-6 rounded-lg bg-gray-50 shadow-md h-fit">
        <h2 className="text-3xl font-bold mb-6 text-red-500">Order Summary</h2>

        <div className="space-y-4 text-lg">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">{formatVND(summary.subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping fee:</span>
            <span>{formatVND(summary.shippingFee)}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount:</span>
            <span>{formatVND(summary.discount)}</span>
          </div>
        </div>

        <div className="flex justify-between text-xl font-bold border-t pt-5 mt-5">
          <span>Total:</span>
          <span className="text-red-500">{formatVND(summary.total)}</span>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full mt-8 bg-black text-white py-3 rounded font-bold text-lg hover:bg-gray-800 transition"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
