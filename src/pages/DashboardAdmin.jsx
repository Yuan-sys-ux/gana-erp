import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { Users, UserCheck, Package, CircleDollarSign, ShoppingCart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [availableMonths, setAvailableMonths] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    activeSalesCount: 0,
    registeredCustomersCount: 0,
    activeProductsCount: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);

  const fetchDashboardData = (month) => {
    setIsLoading(true);
    api.get(`/api/admin/dashboard?bulan=${month}`)
      .then(res => {
        if (res.data && res.data.success) {
          setStats(res.data.stats);
          setRecentTransactions(res.data.recentTransactions);
          setSelectedMonth(res.data.selectedMonth);
          if (res.data.availableMonths && res.data.availableMonths.length > 0) {
            setAvailableMonths(res.data.availableMonths);
          }
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Gagal memuat dashboard admin data:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboardData(selectedMonth);
  }, []);

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    fetchDashboardData(newMonth);
  };

  const formatMonth = (monthStr) => {
    if (!monthStr) return '';
    const [year, month] = monthStr.split('-');
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">Dashboard Admin</h2>
            <p className="text-xs text-[#64748B] mt-1">Ringkasan sistem dan manajemen data</p>
          </div>
          
          {/* Month Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#64748B]">Periode:</span>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs font-bold text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white min-w-[140px]"
            >
              {availableMonths.length > 0 ? (
                availableMonths.map((m) => (
                  <option key={m} value={m}>{formatMonth(m)}</option>
                ))
              ) : (
                <option value={selectedMonth}>{formatMonth(selectedMonth)}</option>
              )}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
            <p className="text-xs font-bold text-[#64748B]">Memuat data dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="Total Penjualan Bulan Ini" 
                value={`Rp ${stats.totalSales.toLocaleString('id-ID')}`} 
                icon={<CircleDollarSign className="w-5 h-5" />} 
                bgClass="bg-[#22C55E]"
              />
              <StatCard 
                title="Tim Sales Aktif" 
                value={stats.activeSalesCount.toString()} 
                icon={<Users className="w-5 h-5" />} 
                bgClass="bg-[#3B82F6]"
              />
              <StatCard 
                title="Bengkel Terdaftar" 
                value={stats.registeredCustomersCount.toString()} 
                icon={<ShoppingCart className="w-5 h-5" />} 
                bgClass="bg-[#A855F7]"
              />
              <StatCard 
                title="Produk Aktif" 
                value={stats.activeProductsCount.toString()} 
                icon={<Package className="w-5 h-5" />} 
                bgClass="bg-[#F97316]"
              />
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/data-produk" className="bg-[#2563EB] text-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform block">
                 <Package className="w-6 h-6 mb-4 opacity-90" />
                 <h3 className="font-bold text-lg mb-1">Produk</h3>
                 <p className="text-xs opacity-80">Kelola data oli Kixx & Petronas</p>
              </Link>
              <Link to="/data-pelanggan" className="bg-[#A855F7] text-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform block">
                 <Users className="w-6 h-6 mb-4 opacity-90" />
                 <h3 className="font-bold text-lg mb-1">Pelanggan</h3>
                 <p className="text-xs opacity-80">Kelola data bengkel mitra</p>
              </Link>
              <Link to="/user-management" className="bg-[#F97316] text-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform block">
                 <UserCheck className="w-6 h-6 mb-4 opacity-90" />
                 <h3 className="font-bold text-lg mb-1">Manajemen Pengguna</h3>
                 <p className="text-xs opacity-80">Kelola hak akses pengguna</p>
              </Link>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
              <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center">
                <h3 className="font-bold text-[#1E293B]">Transaksi Terbaru</h3>
                <Link to="/daftar-penjualan" className="text-sm text-[#0B56A6] font-semibold hover:underline">Lihat Semua</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-white text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                      <th className="py-4 px-6">NO INVOICE</th>
                      <th className="py-4 px-6">BENGKEL</th>
                      <th className="py-4 px-6">TOTAL</th>
                      <th className="py-4 px-6">STATUS</th>
                      <th className="py-4 px-6">TANGGAL</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentTransactions.length > 0 ? (
                      recentTransactions.map((tx, idx) => (
                        <tr key={idx} className="border-t border-[#E2E8F0]">
                          <td className="py-4 px-6 font-bold text-[#1E293B]">{tx.invoiceId}</td>
                          <td className="py-4 px-6 text-[#475569]">{tx.customer}</td>
                          <td className="py-4 px-6 font-semibold text-[#1E293B]">Rp {tx.total.toLocaleString('id-ID')}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              tx.statusBayar === 'Lunas' 
                                ? 'bg-[#DCFCE7] text-[#16A34A]' 
                                : 'bg-[#FEF3C7] text-[#D97706]'
                            }`}>
                              {tx.statusBayar}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-[#64748B]">{tx.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-t border-[#E2E8F0]">
                        <td colSpan="5" className="py-8 text-center text-[#64748B]">Tidak ada transaksi untuk bulan ini.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}
