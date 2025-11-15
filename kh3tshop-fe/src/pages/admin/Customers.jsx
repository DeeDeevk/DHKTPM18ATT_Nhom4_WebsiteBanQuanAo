import React from 'react';

export default function Customers() {
  const customers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', date: '15/11/2025' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', date: '14/11/2025' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', date: '13/11/2025' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', date: '12/11/2025' },
    { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@email.com', date: '11/11/2025' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Quản Lý Khách Hàng</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Thêm Khách Hàng
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày Đăng Ký
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map(customer => (
              <tr key={customer.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-500 hover:text-blue-700 font-medium mr-3">
                    Sửa
                  </button>
                  <button className="text-red-500 hover:text-red-700 font-medium">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}