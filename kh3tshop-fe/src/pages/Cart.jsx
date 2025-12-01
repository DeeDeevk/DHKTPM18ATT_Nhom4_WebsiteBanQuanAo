import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const formatVND = (amount) => {
    // Đảm bảo giá trị là số
    const numericAmount = typeof amount === "number" && isFinite(amount) ? amount : 0;
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(numericAmount);
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

    // Tính subtotal chỉ dựa trên các item được chọn
    const selectedItems = items.filter((item) => item.selected);
    // **FIX:** Đảm bảo sử dụng giá trị `subtotal` hoặc tính toán lại: quantity * priceAtTime
    const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);

    const minFreeShipping = 1000000;
    const standardShippingFee = 0; // Giả định phí ship chuẩn
    const discount = 0; // Giả định không có mã giảm giá

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
    const [select, setSelect] = useState([]);
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

    const hanldeFetchCart = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            console.log("Token: ", token);
            const res = await fetch(
                `http://localhost:8080/cart-details/cart/${cart.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();

            console.log("Cart API: ", data);

            // **FIX:** Kiểm tra cấu trúc dữ liệu từ API và chuẩn hóa
            const items = Array.isArray(data)
                ? data
                : data.result || data.cartDetails || [];

            // **FIX:** Thêm thuộc tính `selected: true` mặc định cho các item mới load
            const itemsWithSelection = items.map(item => ({...item, selected: item.selected || true}));

            setCartItems(itemsWithSelection);
        } catch (err) {
            console.error("Lỗi: ", err);
            // Xử lý khi cart rỗng (API trả về lỗi hoặc mảng rỗng)
            setCartItems([]);
        }
    };

    // FETCH CART DETAILS KHI CÓ CART ID
    useEffect(() => {
        if (cart?.id) {
            hanldeFetchCart();
        }
    }, [cart]);


    // HÀM XỬ LÝ CHỌN/BỎ CHỌN SẢN PHẨM
    const handleToggleSelect = async (cartDetailId) => {
        const updatedItems = cartItems.map((item) =>
            item.id === cartDetailId ? { ...item, selected: !item.selected } : item
        );

        setCartItems(updatedItems);

        try {
            const token = localStorage.getItem("accessToken");
            const selectedStatus = updatedItems.find((i) => i.id === cartDetailId).selected;

            await fetch(`http://localhost:8080/cart-details/${cartDetailId}/select`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    selected: selectedStatus,
                }),
            });
        } catch (err) {
            console.error("Lỗi update select: ", err);
            // Rollback state nếu API lỗi
            setCartItems(cartItems);
        }
    };

    // CẬP NHẬT DANH SÁCH SẢN PHẨM ĐƯỢC CHỌN KHI cartItems THAY ĐỔI
    useEffect(() => {
        const selectedItems = cartItems.filter((item) => item.selected);
        setSelect(selectedItems);
    }, [cartItems]);

    // HÀM TĂNG SỐ LƯỢNG
    const handleToggleIncrease = async (cartDetailId, priceAtTime) => {
        try {
            const token = localStorage.getItem("accessToken");

            // 1. Cập nhật Cart Detail
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

            // **FIX:** Kiểm tra lỗi từ API
            if (!res.ok) {
                toast.error(data.message || "Failed to increase quantity.");
                return;
            }

            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === cartDetailId ? { ...item, ...data } : item
                )
            );

            // 2. Cập nhật Cart tổng (totalAmount)
            const resCart = await fetch(
                `http://localhost:8080/carts/update/${cart.id}/increase`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ price: priceAtTime }),
                }
            );

            if (resCart.ok) {
                window.dispatchEvent(new Event("cartUpdated"));
            }

        } catch (err) {
            console.error("Lỗi update quantity (increase): ", err);
            toast.error("Lỗi khi tăng số lượng.");
        }
    };

    // HÀM GIẢM SỐ LƯỢNG
    const handleToggleDecrease = async (cartDetailId, priceAtTime) => {
        try {
            const token = localStorage.getItem("accessToken");

            // 1. Cập nhật Cart Detail
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

            if (!res.ok) {
                toast.error(data.message || "Failed to decrease quantity.");
                return;
            }

            // 2. Xử lý khi số lượng về 0 (xóa item)
            if (data && data.quantity === 0) {
                setCartItems((prev) => prev.filter((i) => i.id !== cartDetailId));

                // 3. Cập nhật Cart tổng (totalAmount) sau khi xóa item
                const resCart = await fetch(
                    `http://localhost:8080/carts/update/${cart.id}/decrease`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        // Gửi priceAtTime để backend tính toán tổng tiền
                        body: JSON.stringify({ price: priceAtTime }),
                    }
                );

                if (resCart.ok) {
                    window.dispatchEvent(new Event("cartUpdated"));
                }
                toast.info("Item removed from cart.");
                return;
            }

            // 2. Xử lý khi số lượng > 0 (chỉ cập nhật item)
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === cartDetailId ? { ...item, ...data } : item
                )
            );

            // 3. Cập nhật Cart tổng (totalAmount)
            const resCart = await fetch(
                `http://localhost:8080/carts/update/${cart.id}/decrease`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ price: priceAtTime }),
                }
            );

            if (resCart.ok) {
                window.dispatchEvent(new Event("cartUpdated"));
            }
        } catch (err) {
            console.error("Lỗi update quantity (decrease): ", err);
            toast.error("Lỗi khi giảm số lượng.");
        }
    };

    // HÀM XÓA SẢN PHẨM
    const handleDelete = async (cartDetailId, quantity, subtotal) => {
        try {
            const token = localStorage.getItem("accessToken");

            // 1. Xóa Cart Detail
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
                // 2. Cập nhật state (xóa item)
                setCartItems(cartItems.filter((item) => item.id !== cartDetailId));
                toast.success("Item removed successfully.");

                // 3. Cập nhật Cart tổng (totalAmount)
                const resCart = await fetch(
                    `http://localhost:8080/carts/update/${cart.id}/delete`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        // Gửi subtotal và quantity để backend trừ đi
                        body: JSON.stringify({ price: subtotal, quantity: quantity }),
                    }
                );

                if (resCart.ok) {
                    window.dispatchEvent(new Event("cartUpdated"));
                }
            } else {
                const errorData = await res.json();
                console.error("Delete failed:", errorData.message || res.statusText);
                toast.error("Failed to delete item.");
            }
        } catch (err) {
            console.error("Lỗi delete item: ", err);
            toast.error("Lỗi kết nối khi xóa sản phẩm.");
        }
    };

    const summary = calculateSummary(cartItems);

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.warning("Giỏ hàng rỗng!!!");
        } else if (select.length === 0) {
            toast.warning("Vui lòng chọn sản phẩm muốn thanh toán!!!");
        } else {
            // **FIX:** Gửi danh sách sản phẩm đã chọn (select)
            localStorage.setItem("selectedCartItems", JSON.stringify(select));
            navigate("/checkout", {
                state: { userId: user.id, select: select },
            });
        }
    };

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
                        <div
                            className="grid grid-cols-6 font-semibold border-b pb-3 text-gray-700 text-sm uppercase"
                        >
                            <div className="col-span-3">Item</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-right">Unit Price</div>
                            <div className="text-center"></div>
                        </div>

                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-6 items-center border-b py-6"
                                >
                                    <div className="col-span-3 flex items-start space-x-4">
                                        <input
                                            type="checkbox"
                                            checked={item.selected}
                                            onChange={() => handleToggleSelect(item.id)}
                                            className="mt-2 w-4 h-4 border-gray-300 rounded"
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
                                            {/* **FIX:** Xóa dòng sizeName cũ (đang bị lặp) */}
                                            {/* <div className="text-gray-500 text-sm">
                        {item.productName ? item.productName.split(",")[0] : ""}
                      </div> */}
                                            <div className="text-gray-500 text-sm">
                                                Size: {item.sizeName}
                                            </div>
                                        </div>
                                    </div>

                                    {/* QUANTITY CONTROLS */}
                                    <div className="text-center">
                                        <div className="flex items-center justify-center border border-gray-300 rounded-full w-24 mx-auto p-1">
                                            <button
                                                className="text-lg px-2 hover:bg-gray-100 rounded-full"
                                                // **FIX:** Chỉ giữ lại một onClick, truyền tham số
                                                onClick={() =>
                                                    handleToggleDecrease(item.id, item.priceAtTime)
                                                }
                                            >
                                                -
                                            </button>

                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                readOnly
                                                className="w-10 text-center text-sm bg-transparent"
                                            />

                                            <button
                                                className="text-lg px-2 hover:bg-gray-100 rounded-full"
                                                // **FIX:** Chỉ giữ lại một onClick, truyền tham số
                                                onClick={() =>
                                                    handleToggleIncrease(item.id, item.priceAtTime)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* UNIT PRICE / SUBTOTAL */}
                                    {/* **FIX:** Nếu `item.subtotal` là tổng tiền (quantity * priceAtTime), thì hiển thị `item.subtotal / item.quantity` ở cột Unit Price */}
                                    <div className="text-right font-semibold text-lg">
                                        {formatVND(item.priceAtTime)} {/* Hiển thị giá đơn vị */}
                                    </div>

                                    {/* DELETE BUTTON */}
                                    <div className="text-center">
                                        <button
                                            // **FIX:** Chỉ giữ lại một onClick, truyền tham số
                                            onClick={() =>
                                                handleDelete(item.id, item.quantity, item.subtotal)
                                            }
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                Cart is empty.
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
                                <button
                                    className="bg-black text-white px-4 py-3 rounded-r font-semibold hover:bg-gray-800 transition"
                                >
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
                            onClick={handleCheckout}
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