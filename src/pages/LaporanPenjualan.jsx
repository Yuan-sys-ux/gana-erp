import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { BarChart2, Trophy, DollarSign, Calendar, Loader2, Package } from 'lucide-react';
import api from '../utils/api';
import { getOrders, getProducts } from '../utils/mockDb';

export default function LaporanPenjualan() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('06');
  const [selectedYear, setSelectedYear] = useState('2026');

  const [reportData, setReportData] = useState({
    totalRevenue: 0,
    totalDus: 0,
    avgOrder: 0,
    topCustomers: [],
    brandBreakdown: []
  });

  const months = [
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' }
  ];

  const years = ['2024', '2025', '2026', '2027'];

  const loadLocalLaporan = (targetMonth) => {
    const orders = getOrders();
    const products = getProducts();
    const monthsId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    
    const parseToMonthKey = (dateStr) => {
      if (!dateStr) return '';
      const parts = dateStr.split(' ');
      if (parts.length < 3) return '';
      const monthName = parts[1];
      const year = parts[2];
      const monthIdx = monthsId.indexOf(monthName);
      if (monthIdx === -1) return '';
      const monthStr = String(monthIdx + 1).padStart(2, '0');
      return `${year}-${monthStr}`;
    };

    if (targetMonth > '2026-06') {
      return {
        totalRevenue: 0,
        totalDus: 0,
        avgOrder: 0,
        topCustomers: [],
        brandBreakdown: []
      };
    }

    const monthlyOrders = orders.filter(o => parseToMonthKey(o.date) === targetMonth);

    const totalRevenue = monthlyOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    const totalDus = monthlyOrders.reduce((sum, o) => sum + Number(o.qty || 0), 0);
    const avgOrder = monthlyOrders.length > 0 ? totalRevenue / monthlyOrders.length : 0;

    const customerMap = {};
    monthlyOrders.forEach(o => {
      customerMap[o.customer] = (customerMap[o.customer] || 0) + Number(o.total || 0);
    });
    
    const topCustomers = Object.keys(customerMap).map(name => {
      const orderSample = monthlyOrders.find(o => o.customer === name);
      return {
        name,
        city: orderSample?.address ? (orderSample.address.split(',').pop().trim()) : 'Banjarmasin',
        total: customerMap[name],
        percentage: totalRevenue > 0 ? Math.round((customerMap[name] / totalRevenue) * 100) : 0
      };
    }).sort((a, b) => b.total - a.total).slice(0, 5);

    const brandTotals = {};
    monthlyOrders.forEach(o => {
      if (o.items && Array.isArray(o.items)) {
        o.items.forEach(item => {
          const prod = products.find(p => p.name === item.name || p.id === item.id);
          const brand = prod?.brand || 'Petronas';
          const qty = Number(item.qty) || 0;
          const price = Number(prod?.harga || item.harga || 400000);
          brandTotals[brand] = (brandTotals[brand] || 0) + (qty * price);
        });
      }
    });

    const totalBrandSum = Object.values(brandTotals).reduce((sum, v) => sum + v, 0);
    const brandBreakdown = Object.keys(brandTotals).map(brand => ({
      brand,
      total: brandTotals[brand],
      percentage: totalBrandSum > 0 ? Math.round((brandTotals[brand] / totalBrandSum) * 100) : 0
    })).sort((a, b) => b.total - a.total);

    return {
      totalRevenue,
      totalDus,
      avgOrder,
      topCustomers,
      brandBreakdown
    };
  };

  const fetchReport = (monthKey) => {
    setIsLoading(true);
    api.get(`/api/laporan-penjualan`, { params: { bulan: monthKey } })
      .then(res => {
        if (res.data && res.data.success) {
          setReportData(res.data.data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Gagal memuat laporan dari API, gunakan fallback lokal:", err);
        const localData = loadLocalLaporan(monthKey);
        setReportData(localData);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchReport(`${selectedYear}-${selectedMonth}`);
  }, [selectedMonth, selectedYear]);

  // Is future check
  const isFuture = `${selectedYear}-${selectedMonth}` > '2026-06';

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header & Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Laporan Penjualan</h2>
            <p className="text-sm text-[#64748B] mt-1">Laporan performa penjualan dan top pelanggan</p>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-[#E2E8F0] bg-white rounded-lg px-4 py-2 text-sm font-semibold text-[#1E293B] shadow-sm outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-[#E2E8F0] bg-white rounded-lg px-4 py-2 text-sm font-semibold text-[#1E293B] shadow-sm outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-[#4F46E5] animate-spin" />
            <p className="text-sm font-bold text-[#64748B]">Memuat laporan...</p>
          </div>
        ) : isFuture || (reportData.totalRevenue === 0 && reportData.totalDus === 0) ? (
          /* Empty State / Future Date */
          <div className="flex flex-col items-center justify-center py-24 bg-white border border-[#E2E8F0] rounded-2xl gap-4 shadow-sm">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-[#EF4444]">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg text-[#1E293B]">Data Tidak Ada</h3>
              <p className="text-sm text-[#64748B] mt-1 px-4">
                Periode laporan belum terjadi atau tidak memiliki data penjualan.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-[#2563EB]" />
                </div>
                <p className="text-sm font-bold text-[#64748B] mb-1 uppercase tracking-wide">Total Omset</p>
                <h3 className="text-3xl font-black text-[#1E293B] mb-2">
                  Rp {reportData.totalRevenue.toLocaleString('id-ID')}
                </h3>
                <p className="text-xs font-semibold text-[#64748B]">
                  Berdasarkan seluruh transaksi bulan ini
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
                <div className="w-12 h-12 bg-[#FEF2F2] rounded-xl flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-[#DC2626]" />
                </div>
                <p className="text-sm font-bold text-[#64748B] mb-1 uppercase tracking-wide">Total Dus Terjual</p>
                <h3 className="text-3xl font-black text-[#1E293B] mb-2">
                  {reportData.totalDus} Karton
                </h3>
                <p className="text-xs font-semibold text-[#64748B]">
                  Volume penjualan produk
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center mb-4">
                  <BarChart2 className="w-6 h-6 text-[#16A34A]" />
                </div>
                <p className="text-sm font-bold text-[#64748B] mb-1 uppercase tracking-wide">Rata-rata Order</p>
                <h3 className="text-3xl font-black text-[#1E293B] mb-2">
                  Rp {Math.round(reportData.avgOrder).toLocaleString('id-ID')}
                </h3>
                <p className="text-xs font-semibold text-[#64748B]">Per transaksi / invoice</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Brand Performance Split */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-[#E2E8F0]">
                  <h3 className="font-bold text-[#1E293B] text-lg">Komposisi Penjualan by Brand</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center gap-6">
                  {reportData.brandBreakdown.length > 0 ? (
                    reportData.brandBreakdown.map((brandInfo, index) => {
                      const colors = [
                        { dot: 'bg-[#16A34A]', bar: 'bg-[#16A34A]' },
                        { dot: 'bg-[#DC2626]', bar: 'bg-[#DC2626]' },
                        { dot: 'bg-[#2563EB]', bar: 'bg-[#2563EB]' },
                        { dot: 'bg-[#F59E0B]', bar: 'bg-[#F59E0B]' }
                      ];
                      const color = colors[index % colors.length];

                      return (
                        <div key={brandInfo.brand}>
                          <div className="flex justify-between items-end mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${color.dot}`}></div>
                              <span className="font-bold text-[#1E293B]">{brandInfo.brand || 'Unbranded'}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-black text-xl text-[#1E293B]">{brandInfo.percentage}%</span>
                              <p className="text-xs text-[#64748B] font-semibold">
                                Rp {brandInfo.total.toLocaleString('id-ID')}
                              </p>
                            </div>
                          </div>
                          <div className="w-full bg-[#E2E8F0] h-4 rounded-full overflow-hidden">
                            <div 
                              className={`${color.bar} h-full rounded-full transition-all duration-500`} 
                              style={{ width: `${brandInfo.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-sm font-semibold text-[#64748B] py-8">
                      Tidak ada data brand penjualan untuk periode ini.
                    </p>
                  )}
                </div>
              </div>

              {/* Top 5 Customers */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
                <div className="p-6 border-b border-[#E2E8F0] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#F59E0B]" />
                  <h3 className="font-bold text-[#1E293B] text-lg">Top 5 Pelanggan</h3>
                </div>
                <div className="p-2">
                  {reportData.topCustomers.length > 0 ? (
                    reportData.topCustomers.map((cust, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 hover:bg-[#F8FAFC] rounded-xl transition-colors">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          idx === 0 ? 'bg-[#FEF3C7] text-[#D97706]' : 
                          idx === 1 ? 'bg-[#F1F5F9] text-[#64748B]' : 
                          idx === 2 ? 'bg-[#FFEDD5] text-[#9A3412]' : 
                          'bg-[#F8FAFC] text-[#94A3B8] border border-[#E2E8F0]'
                        }`}>
                          #{idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#1E293B] truncate">{cust.name}</h4>
                          <p className="text-xs text-[#64748B] truncate">{cust.city}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-[#1E293B] text-sm">
                            Rp {cust.total.toLocaleString('id-ID')}
                          </p>
                          <p className="text-xs text-[#64748B] font-semibold">{cust.percentage}% dari total</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm font-semibold text-[#64748B] py-16">
                      Tidak ada data pelanggan untuk periode ini.
                    </p>
                  )}
                </div>
              </div>

            </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}
