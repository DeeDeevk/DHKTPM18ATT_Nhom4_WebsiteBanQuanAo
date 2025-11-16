import React, { useState, useEffect } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
        }

        const response = await fetch('http://localhost:8080/customers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Lỗi khi tải dữ liệu: ${response.statusText}`);
        }
        
        const data = await response.json();

        // CHANGED: Truy cập vào mảng dữ liệu thông qua `data.result`
        // Đồng thời kiểm tra xem `data.result` có phải là một mảng không
        if (data && Array.isArray(data.result)) {
          setCustomers(data.result);
        } else {
          console.error("Dữ liệu API không chứa mảng 'result' hợp lệ.");
          setCustomers([]); // Đặt lại là mảng rỗng để tránh lỗi
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading data from customer table...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Add Customer
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {/* CHANGED: Đổi ID thành STT vì API không trả về ID */}
                Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {/* CHANGED: Đổi thành Ngày Sinh cho khớp dữ liệu */}
                Birthday
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Không có dữ liệu khách hàng.
                </td>
              </tr>
            ) : (
              // CHANGED: Thêm `index` để làm key và hiển thị số thứ tự
              customers.map((customer, index) => (
                // CHANGED: Dùng `index` làm key. Lý tưởng nhất là API nên trả về một ID duy nhất.
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {/* CHANGED: Hiển thị số thứ tự */}
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {/* CHANGED: `customer.name` -> `customer.fullName` */}
                    {customer.fullName}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {/* CHANGED: `customer.name` -> `customer.fullName` */}
                    {customer.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {/* CHANGED: `customer.date` -> `customer.dateOfBirth` và định dạng lại */}
                    {new Date(customer.dateOfBirth).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-500 hover:text-blue-700 font-medium mr-3">
                      Update
                    </button>
                    <button className="text-red-500 hover:text-red-700 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}