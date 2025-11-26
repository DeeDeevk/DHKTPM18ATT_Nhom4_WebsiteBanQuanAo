import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaStar, FaEye, FaMailBulk } from "react-icons/fa";

export default function Customers() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // Create / Edit state
  const [showCreate, setShowCreate] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  
  
  const [form, setForm] = useState(
    {
      id: "",
      customer: {
        fullName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        dateOfBirth: ""
      },
      username: "",
      role: "",
      createAt: "",
      updateAt: "",
      statusLogin: ""
    }
  );

  // Loading / error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");
  // Load customer list
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/customers", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error(`API lỗi: ${res.status}`);
      const data = await res.json();
      setAccounts(data?.result || []);
      console.log(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Lỗi khi tải danh sách khách hàng");
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const openDetail = (account) => {
    setSelectedCustomer(account.customer);
    setShowDetail(true);
  };

  const openCreate = () => {
    setEditingAccount(null);
    setForm({ name: "", email: "", phone: "", rewardPoints: 0, level: "Silver", password: "" });
    setShowCreate(true);
  };

  const openEdit = (account) => {
    setEditingAccount(account);
    setForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      rewardPoints: customer.rewardPoints || 0,
      level: customer.level || "Silver",
      password: ""
    });
    setShowCreate(true);
  };

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const createCustomer = async () => {
    // basic validation
    if (!form.name || !form.email) {
      alert("Vui lòng nhập tên và email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          rewardPoints: form.rewardPoints,
          level: form.level,
          password: form.password
        })
      });

      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      await loadCustomers();
      setShowCreate(false);
    } catch (err) {
      console.error(err);
      alert(err.message || "Lỗi khi tạo khách hàng");
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async () => {
    if (!editingCustomer) return;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/customers/${editingCustomer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          rewardPoints: form.rewardPoints,
          level: form.level
        })
      });

      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      await loadCustomers();
      setShowCreate(false);
      setEditingCustomer(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Lỗi khi cập nhật khách hàng");
    } finally {
      setLoading(false);
    }
  };

  const submitForm = () => {
    if (editingCustomer) updateCustomer();
    else createCustomer();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaUser /> Quản Lý Khách Hàng
        </h1>

        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={openCreate}>
            + Thêm Khách Hàng
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaMailBulk /> Gửi Email
          </button>
        </div>
      </div>

      {/* Status */}
      {loading && <div className="text-gray-600">Đang tải...</div>}
      {error && <div className="text-red-600">Lỗi: {error}</div>}

      {/* Customer Table */}
      <div className="bg-white shadow rounded border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Tên</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Số điện thoại</th>
              <th className="px-4 py-2 text-left">Điểm thưởng</th>
              <th className="px-4 py-2 text-left">Cấp bậc</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold">{c.name}</td>
                <td className="px-4 py-3 flex items-center gap-1"><FaEnvelope className="text-gray-400" /> {c.email}</td>
                <td className="px-4 py-3">{c.phone}</td>
                <td className="px-4 py-3">{c.rewardPoints}</td>
                <td className="px-4 py-3 flex items-center gap-1"><FaStar className="text-yellow-500" /> {c.level}</td>

                <td className="px-4 py-3 flex justify-end gap-3">
                  <button className="text-gray-600" onClick={() => { setSelectedCustomer(c); setShowDetail(true); }}>
                    <FaEye /> Xem
                  </button>

                  <button className="text-blue-600" onClick={() => openEdit(c)}>
                    Sửa
                  </button>
                </td>
              </tr>
            ))}

            {customers.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">Không có khách hàng</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showDetail && selectedCustomer && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-[650px] rounded p-6 space-y-4 shadow-lg">
            <h2 className="text-2xl font-bold">Chi tiết khách hàng</h2>

            <p><strong>Tên:</strong> {selectedCustomer.name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>SĐT:</strong> {selectedCustomer.phone}</p>
            <p><strong>Điểm thưởng:</strong> {selectedCustomer.rewardPoints}</p>
            <p><strong>Cấp độ:</strong> {selectedCustomer.level}</p>

            <div>
              <strong>Lịch sử mua hàng:</strong>
              <ul className="list-disc ml-6 mt-1">
                {selectedCustomer.orderHistory?.map((o, i) => (
                  <li key={i}>Mã đơn: {o.orderId} — {o.total.toLocaleString()} đ — {o.date}</li>
                ))}
                {(!selectedCustomer.orderHistory || selectedCustomer.orderHistory.length === 0) && (
                  <li>Không có lịch sử mua hàng</li>
                )}
              </ul>
            </div>

            <div className="flex justify-end pt-3">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowDetail(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-[520px] rounded p-6 space-y-4 shadow-lg">
            <h2 className="text-2xl font-bold">{editingCustomer ? 'Chỉnh sửa khách hàng' : 'Tạo khách hàng'}</h2>

            <div className="grid grid-cols-1 gap-3">
              <input className="border p-2 rounded" placeholder="Tên" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
              <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
              <input className="border p-2 rounded" placeholder="Số điện thoại" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />

              {!editingCustomer && (
                <input type="password" className="border p-2 rounded" placeholder="Mật khẩu" value={form.password} onChange={(e) => handleChange('password', e.target.value)} />
              )}

              <div className="grid grid-cols-2 gap-3">
                <input type="number" className="border p-2 rounded" placeholder="Điểm thưởng" value={form.rewardPoints} onChange={(e) => handleChange('rewardPoints', Number(e.target.value))} />
                <select className="border p-2 rounded" value={form.level} onChange={(e) => handleChange('level', e.target.value)}>
                  <option>Silver</option>
                  <option>Gold</option>
                  <option>Platinum</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => { setShowCreate(false); setEditingCustomer(null); }}>Hủy</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={submitForm}>{editingCustomer ? 'Lưu' : 'Tạo'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
