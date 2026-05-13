import DashboardLayout from '../layouts/DashboardLayout';
import { BarChart2, TrendingUp, Package, Trophy, DollarSign, Calendar } from 'lucide-react';

export default function LaporanPenjualan() {
  const topCustomers = [
    { name: 'Berkah Sekawan Motor', city: 'Banjarmasin', total: 45000000, percentage: 35 },
    { name: 'Jaya Motor Banjarmasin', city: 'Banjarmasin', total: 32000000, percentage: 25 },
    { name: 'Mandiri Service', city: 'Banjarbaru', total: 20000000, percentage: 15 },
    { name: 'Abadi Motor', city: 'Banjarmasin', total: 18000000, percentage: 14 },
    { name: 'Mitra Jaya Motor', city: 'Martapura', total: 14000000, percentage: 11 },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Laporan Penjualan</h2>
            <p className="text-sm text-[#64748B] mt-1">Laporan performa penjualan dan top pelanggan bulan ini</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="border border-[#E2E8F0] bg-white rounded-lg px-4 py-2 text-sm font-semibold text-[#1E293B] shadow-sm outline-none focus:ring-2 focus:ring-[#4F46E5]">
              <option>Bulan Ini (Mei 2026)</option>
              <option>Bulan Lalu (Apr 2026)</option>
              <option>Tahun Ini (2026)</option>
            </select>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
            <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-[#2563EB]" />
            </div>
            <p className="text-sm font-bold text-[#64748B] mb-1 uppercase tracking-wide">Total Omset</p>
            <h3 className="text-3xl font-black text-[#1E293B] mb-2">Rp 129 JT</h3>
            <p className="text-xs font-semibold text-[#16A34A] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12.5% dibanding bulan lalu
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
            <div className="w-12 h-12 bg-[#FEF2F2] rounded-xl flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-[#DC2626]" />
            </div>
            <p className="text-sm font-bold text-[#64748B] mb-1 uppercase tracking-wide">Total Dus Terjual</p>
            <h3 className="text-3xl font-black text-[#1E293B] mb-2">385 Dus</h3>
            <p className="text-xs font-semibold text-[#16A34A] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +8.2% dibanding bulan lalu
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
            <div className="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center mb-4">
              <BarChart2 className="w-6 h-6 text-[#16A34A]" />
            </div>
            <p className="text-sm font-bold text-[#64748B] mb-1 uppercase tracking-wide">Rata-rata Order</p>
            <h3 className="text-3xl font-black text-[#1E293B] mb-2">Rp 4.2 JT</h3>
            <p className="text-xs font-semibold text-[#64748B]">Per transaksi / invoice</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Brand Performance Split */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#E2E8F0]">
              <h3 className="font-bold text-[#1E293B] text-lg">Komposisi Penjualan by Brand</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center gap-8">
              
              {/* Petronas Bar */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#16A34A]"></div>
                    <span className="font-bold text-[#1E293B]">Petronas</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-xl text-[#1E293B]">55%</span>
                    <p className="text-xs text-[#64748B] font-semibold">Rp 70.950.000</p>
                  </div>
                </div>
                <div className="w-full bg-[#E2E8F0] h-4 rounded-full overflow-hidden">
                  <div className="bg-[#16A34A] h-full rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>

              {/* Kixx Bar */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#DC2626]"></div>
                    <span className="font-bold text-[#1E293B]">Kixx</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-xl text-[#1E293B]">45%</span>
                    <p className="text-xs text-[#64748B] font-semibold">Rp 58.050.000</p>
                  </div>
                </div>
                <div className="w-full bg-[#E2E8F0] h-4 rounded-full overflow-hidden">
                  <div className="bg-[#DC2626] h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* Top 5 Customers */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
            <div className="p-6 border-b border-[#E2E8F0] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="font-bold text-[#1E293B] text-lg">Top 5 Pelanggan Bulan Ini</h3>
            </div>
            <div className="p-2">
              {topCustomers.map((cust, idx) => (
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
                    <p className="font-bold text-[#1E293B] text-sm">Rp {(cust.total / 1000000).toFixed(1)} JT</p>
                    <p className="text-xs text-[#64748B] font-semibold">{cust.percentage}% dari total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
