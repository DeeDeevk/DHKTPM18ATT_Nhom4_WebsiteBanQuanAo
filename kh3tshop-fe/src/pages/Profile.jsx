// File: src/pages/Profile.jsx

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Calendar, User, Phone, Mail, Save } from "lucide-react";

// Định nghĩa API base URL và hàm fetch có kèm JWT token
const API_BASE = "http://localhost:8080";

const api = {
    async get(url) {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${API_BASE}${url}`, {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Lỗi mạng hoặc xác thực");
        // api.get trả về data.result (chính là AccountResponse)
        return data.result;
    },
    async put(url, body) {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${API_BASE}${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || "Lỗi cập nhật");
        return data.result;
    },
};

// Hàm tiện ích: Format Date object hoặc ISO string thành định dạng yyyy-MM-dd
const formatDateForInput = (dateValue) => {
    if (!dateValue) return "";
    let date;

    // Nếu là Date object (từ API Java), chuyển sang ISO string rồi cắt
    if (dateValue instanceof Date) {
        date = dateValue;
    }
    // Nếu là ISO string (ví dụ: '2025-11-27T00:00:00.000+00:00')
    else if (typeof dateValue === 'string') {
        // Thử tạo Date object từ chuỗi
        date = new Date(dateValue);
        // Kiểm tra Date object có hợp lệ không
        if (isNaN(date.getTime())) {
            // Nếu không hợp lệ, giả sử chuỗi đã ở định dạng YYYY-MM-DD
            return dateValue.split('T')[0];
        }
    } else {
        return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Hàm tiện ích: So sánh xem dữ liệu đã bị thay đổi chưa
const isProfileChanged = (profile, initialProfile) => {
    // So sánh các trường cơ bản
    if (!initialProfile) return false;
    if (profile.fullName !== initialProfile.fullName) return true;
    if (profile.phoneNumber !== initialProfile.phoneNumber) return true;
    if (profile.gender !== initialProfile.gender) return true;

    // So sánh ngày sinh (Date objects hoặc chuỗi ISO cần so sánh cẩn thận)
    // Tốt nhất là so sánh chuỗi đã được format
    const formattedDate = formatDateForInput(profile.dateOfBirth);
    const initialFormattedDate = formatDateForInput(initialProfile.dateOfBirth);

    return formattedDate !== initialFormattedDate;
};


const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [initialProfile, setInitialProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        id: null, // Thêm ID của Customer để phục vụ PUT request
        fullName: "",
        phoneNumber: "",
        gender: "MALE",
        dateOfBirth: "", // Định dạng yyyy-MM-dd
    });


    // 1. Fetch dữ liệu hồ sơ
    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            // api.get("/accounts/myinfor") trả về AccountResponse
            const accountResponseData = await api.get("/accounts/myinfor");

            // SỬA LỖI: Sử dụng Optional Chaining (?) để kiểm tra an toàn
            // vì customerResponse có thể là null/undefined (ví dụ: tài khoản ADMIN)
            const customerData = accountResponseData.customerResponse;

            const newProfile = {
                // Lấy ID từ CustomerResponse (nếu có) để dùng cho PUT request
                // Customer ID cần thiết cho CustomerUpdateRequest.java
                id: customerData?.id || null,
                // Dùng Optional Chaining để truy cập an toàn các trường
                fullName: customerData?.fullName || "",
                phoneNumber: customerData?.phoneNumber || "",
                // Username của Account là email đăng nhập (luôn có)
                email: accountResponseData.username,
                gender: customerData?.gender || "MALE", // Default to MALE nếu không có
                dateOfBirth: customerData?.dateOfBirth || null,
            };

            setProfile(newProfile);
            setInitialProfile(newProfile); // Lưu trạng thái ban đầu

            // Cập nhật formData cho form
            setFormData({
                id: newProfile.id,
                fullName: newProfile.fullName,
                phoneNumber: newProfile.phoneNumber,
                gender: newProfile.gender,
                // Format ngày tháng cho input type="date"
                dateOfBirth: formatDateForInput(newProfile.dateOfBirth),
            });

        } catch (err) {
            console.error("Lỗi lấy thông tin hồ sơ:", err);
            setError(err.message || "Không thể tải hồ sơ người dùng.");
            toast.error(err.message || "Lỗi tải hồ sơ.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // 2. Xử lý thay đổi form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Cập nhật luôn profile state để dùng cho isProfileChanged
        setProfile((prev) => ({
            ...prev,
            [name]: name === 'dateOfBirth' ? new Date(value) : value,
        }));
    };

    // 3. Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Chỉ cho phép cập nhật nếu có Customer ID (tức là không phải ADMIN)
        if (!formData.id) {
            toast.error("Tài khoản này không có hồ sơ khách hàng để cập nhật.");
            return;
        }

        setSaving(true);
        setError(null);

        // Chuẩn bị dữ liệu gửi lên (phải khớp với CustomerUpdateRequest.java)
        const updatePayload = {
            id: formData.id,
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            // Đảm bảo email được gửi lên theo yêu cầu của CustomerUpdateRequest
            email: profile.email,
            gender: formData.gender,
            // Chuyển chuỗi 'yyyy-MM-dd' thành Date object cho Java backend
            dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : null,
        };


        try {
            // Endpoint cập nhật hồ sơ khách hàng
            const updatedCustomerData = await api.put("/customers/update-profile", updatePayload);

            // Sau khi cập nhật thành công, fetch lại dữ liệu mới nhất (hoặc cập nhật state thủ công)
            // Cập nhật state thủ công từ response
            const newProfile = {
                id: updatedCustomerData.id,
                fullName: updatedCustomerData.fullName,
                phoneNumber: updatedCustomerData.phoneNumber,
                email: profile.email, // email là username, không đổi
                gender: updatedCustomerData.gender,
                dateOfBirth: updatedCustomerData.dateOfBirth,
            };

            setProfile(newProfile);
            setInitialProfile(newProfile);
            setFormData({
                id: newProfile.id,
                fullName: newProfile.fullName,
                phoneNumber: newProfile.phoneNumber,
                gender: newProfile.gender,
                dateOfBirth: formatDateForInput(newProfile.dateOfBirth),
            });


            toast.success("Cập nhật hồ sơ thành công!");
        } catch (err) {
            console.error("Lỗi cập nhật hồ sơ:", err);
            setError(err.message || "Không thể cập nhật hồ sơ.");
            toast.error(err.message || "Lỗi cập nhật.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                <p className="ml-4 text-lg text-gray-600">Đang tải hồ sơ...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center">
                <p className="text-xl text-red-600 mb-4">Lỗi: {error}</p>
                <button
                    onClick={fetchProfile}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Thử tải lại
                </button>
            </div>
        );
    }

    const hasChanged = isProfileChanged(profile, initialProfile);
    const isCustomerProfile = profile && profile.id !== null;

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                Hồ sơ cá nhân
            </h1>

            {/* Cảnh báo nếu không phải hồ sơ khách hàng */}
            {!isCustomerProfile && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Lưu ý</p>
                    <p>Tài khoản này là tài khoản hệ thống (ví dụ: Admin) và không có hồ sơ khách hàng để cập nhật. Chỉ có thể xem thông tin đăng nhập.</p>
                </div>
            )}

            <div className="bg-white shadow-xl rounded-lg p-6">
                <form onSubmit={handleSubmit}>
                    {/* Trường Email (Username) - Chỉ đọc */}
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            <Mail size={16} className="inline mr-2 text-red-500" />
                            Email đăng nhập
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={profile?.email || ""}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600"
                        />
                    </div>

                    {/* Họ và tên */}
                    <div className="mb-6">
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            <User size={16} className="inline mr-2 text-red-500" />
                            Họ và tên
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            disabled={!isCustomerProfile}
                            className={`w-full p-3 border rounded-lg ${
                                isCustomerProfile
                                    ? "border-gray-300 focus:ring-red-500 focus:border-red-500"
                                    : "bg-gray-100 cursor-not-allowed"
                            }`}
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div className="mb-6">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            <Phone size={16} className="inline mr-2 text-red-500" />
                            Số điện thoại
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            disabled={!isCustomerProfile}
                            className={`w-full p-3 border rounded-lg ${
                                isCustomerProfile
                                    ? "border-gray-300 focus:ring-red-500 focus:border-red-500"
                                    : "bg-gray-100 cursor-not-allowed"
                            }`}
                        />
                    </div>

                    {/* Ngày sinh */}
                    <div className="mb-6">
                        <label
                            htmlFor="dateOfBirth"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            <Calendar size={16} className="inline mr-2 text-red-500" />
                            Ngày sinh
                        </label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            disabled={!isCustomerProfile}
                            className={`w-full p-3 border rounded-lg ${
                                isCustomerProfile
                                    ? "border-gray-300 focus:ring-red-500 focus:border-red-500"
                                    : "bg-gray-100 cursor-not-allowed"
                            }`}
                        />
                    </div>

                    {/* Giới tính */}
                    <div className="mb-6">
                        <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Giới tính
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            disabled={!isCustomerProfile}
                            className={`w-full p-3 border rounded-lg appearance-none ${
                                isCustomerProfile
                                    ? "border-gray-300 focus:ring-red-500 focus:border-red-500"
                                    : "bg-gray-100 cursor-not-allowed"
                            }`}
                        >
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                        </select>
                    </div>

                    {/* Nút lưu */}
                    <button
                        type="submit"
                        disabled={saving || !hasChanged || !isCustomerProfile}
                        className={`w-full flex items-center justify-center gap-2 p-3 text-white font-semibold rounded-lg transition-all duration-200 ${
                            saving || !hasChanged || !isCustomerProfile
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg"
                        }`}
                    >
                        {saving ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Đang lưu...
                            </>
                        ) : (
                            <>
                                <Save size={20} /> Lưu thay đổi
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;