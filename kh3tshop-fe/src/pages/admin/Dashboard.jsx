import React from 'react';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Tổng Khách Hàng', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { label: 'Tổng Sản Phẩm', value: '567', icon: Package, color: 'bg-green-500' },
    { label: 'Đơn Hàng', value: '89', icon: ShoppingCart, color: 'bg-purple-500' },
    { label: 'Doanh Thu', value: '₫45.2M', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const recentCustomers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', date: '15/11/2025' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', date: '14/11/2025' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', date: '13/11/2025' }
  ];

  const recentProducts = [
    { id: 1, name: 'Sản phẩm A', category: 'Điện tử', price: '₫500,000', stock: 50 },
    { id: 2, name: 'Sản phẩm B', category: 'Thời trang', price: '₫300,000', stock: 100 },
    { id: 3, name: 'Sản phẩm C', category: 'Gia dụng', price: '₫200,000', stock: 75 }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Khách Hàng Mới</h2>
          <div className="space-y-3">
            {recentCustomers.map(customer => (
              <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{customer.name}</p>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
                <span className="text-sm text-gray-500">{customer.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sản Phẩm</h2>
          <div className="space-y-3">
            {recentProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{product.price}</p>
                  <p className="text-sm text-gray-500">Kho: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}