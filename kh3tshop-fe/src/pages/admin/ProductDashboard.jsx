import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, AlertTriangle, TrendingUp, DollarSign, Download, RefreshCw, Calendar, ChevronRight, Star, ShoppingBag, ArrowUpRight, AlertCircle, Truck, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const satisfactionData = [
  { star: 5, count: 450, percent: 70 },
  { star: 4, count: 120, percent: 20 },
  { star: 3, count: 50, percent: 8 },
  { star: 2, count: 10, percent: 2 },
];

const ProductDashboard = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('week');
  const [topProducts, setTopProducts] = useState([]);
  const [type, setType] = useState("week");
  const [chartData, setChartData] = useState([]);
const [statsData, setStatsData] = useState([
  {
    id: 'total', 
    title: "Total Products", 
    value: "61", // Ví dụ số liệu
    icon: Package,
    color: "from-blue-500 to-blue-600",
    filterType: "ALL",        
    isClickable: true
  },
  {
    id: 'lowstock', 
    title: "Low Stock Alert", 
    value: "14", 
    icon: AlertTriangle,
    color: "from-orange-500 to-orange-600",
    filterType: "LOW_STOCK",         
    isClickable: true
  }
]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchTopProducts();
    fetchSetData();
    fetchProfit(timeFilter);
  }, [type, timeFilter]);

  const fetchTopProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/products/top-trending?type=${type}`
      );
      const data = await res.json();
      setTopProducts(data);
    } catch (error) {
      console.error("Error fetching top products:", error);
    }
  };

  const fetchSetData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/products/stats`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      const data = await res.json();
      setStatsData(prev => prev.map(item => {
        if (item.id === "total") return { ...item, value: data.result.totalProducts };
        if (item.id === "lowstock") return { ...item, value: data.result.lowStock };
        return item;
      }));
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchProfit = async (filter) => {
    let url = `http://localhost:8080/invoices/${filter}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const mapDayToEN = (dayEn) => {
        const days = {
          "MONDAY": "Mon", "TUESDAY": "Tue", "WEDNESDAY": "Wed",
          "THURSDAY": "Thu", "FRIDAY": "Fri", "SATURDAY": "Sat", "SUNDAY": "Sun"
        };
        return days[dayEn] || dayEn;
      };

      const formatted = data.map((item) => {
        let rawValue = item.profit;
        
        if (typeof rawValue === 'string') {
          rawValue = parseFloat(rawValue.replace(/,/g, ''));
        }

        if (!rawValue || isNaN(rawValue)) {
          rawValue = 0;
        }

        let displayName = "";
        if (filter === "week") {
          displayName = mapDayToEN(item.day);
        } else if (filter === "month") {
          displayName = `M${item.month}`;
        } else {
          displayName = `${item.year}`;
        }

        return {
          name: displayName,
          profitRaw: rawValue,
          profitFormatted: new Intl.NumberFormat('en-US').format(rawValue)
        };
      });

      setChartData(formatted);
    } catch (e) {
      console.error("Error fetching profit:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Hello Admin, here's your business performance today
                </p>
              </div>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group">
            <Download size={20} className="group-hover:animate-bounce" />
            <span>Export Weekly Report</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => {
                  if (item.isClickable && onNavigate) {
                    onNavigate(item.filterType); // Truyền 'ALL' hoặc 'LOW_STOCK'
                  }
                }}
                className={`relative group bg-white rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  item.isClickable ? 'cursor-pointer hover:-translate-y-2 hover:border-blue-300' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={26} strokeWidth={2.5} />
                    </div>
                    {item.isClickable && (
                      <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-blue-50 transition-colors">
                        <ChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{item.title}</p>
                  <h3 className="text-4xl font-bold text-gray-900 mb-3">{item.value}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* PROFIT CHART */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Profit Performance</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Auto-updated data
                  </p>
                </div>
                
                <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl">
                  {["week", "month", "year"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeFilter(t)}
                      className={`px-5 py-2 text-sm font-bold rounded-lg capitalize transition-all duration-300 ${
                        timeFilter === t
                          ? "bg-white text-blue-600 shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af"
                    tick={{ fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    tickFormatter={(value) => new Intl.NumberFormat('en', { notation: "compact" }).format(value)}
                    tick={{ fontSize: 12, fontWeight: 600 }}
                  />
                  <Tooltip
                    formatter={(value, name, props) => [props.payload.profitFormatted + " đ", "Profit"]}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                      padding: "12px 16px"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="profitRaw"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#profitGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* INVENTORY HEALTH */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Inventory Health</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <span className="font-semibold text-gray-700">Available Stock</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">85%</span>
                  </div>
                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-50 rounded-lg">
                        <AlertCircle className="text-amber-600" size={20} />
                      </div>
                      <span className="font-semibold text-gray-700">Low Stock</span>
                    </div>
                    <span className="text-xl font-bold text-amber-600">12%</span>
                  </div>
                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg" style={{ width: '12%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <Clock className="text-red-600" size={20} />
                      </div>
                      <span className="font-semibold text-gray-700">Dead Stock</span>
                    </div>
                    <span className="text-xl font-bold text-red-600">3%</span>
                  </div>
                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-full shadow-lg" style={{ width: '3%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            
            {/* TOP PRODUCTS */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Products</h2>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="px-4 py-2 text-sm font-semibold border-2 border-slate-200 rounded-xl bg-slate-50 hover:border-blue-300 focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>

              <div className="space-y-4">
                {topProducts.map((prod, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-200"
                  >
                    <div className="relative">
                      {prod.img ? (
                        <img
                          src={prod.img}
                          alt={prod.name}
                          className="w-14 h-14 rounded-xl object-cover ring-2 ring-gray-100 group-hover:ring-blue-300 transition-all"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-2xl">
                          📦
                        </div>
                      )}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-sm text-gray-500">{prod.category}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">{prod.sales} <span className="text-xs text-gray-500">sold</span></p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
                        <TrendingUp size={14} />
                        {prod.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-blue-50 hover:to-indigo-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                <span>View Full Rankings</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* CUSTOMER SATISFACTION */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 mb-6 border-2 border-amber-200">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Star className="text-amber-500 fill-amber-500" size={32} />
                  <span className="text-5xl font-bold text-gray-900">4.8</span>
                  <span className="text-gray-500 text-lg">/ 5.0</span>
                </div>
                <p className="text-center text-sm text-gray-600 font-medium">
                  (Based on 1,204 reviews)
                </p>
              </div>

              <div className="space-y-4">
                {satisfactionData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700 w-12 flex items-center gap-1">
                      {item.star} <Star size={12} className="text-amber-400 fill-amber-400" />
                    </span>
                    <div className="flex-1 relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-12 text-right">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDashboard;