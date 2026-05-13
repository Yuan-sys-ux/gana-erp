import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { Users, UserCheck, Package, CircleDollarSign, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Title Section */}
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Dashboard Admin</h2>
          <p className="text-xs text-[#64748B] mt-1">Ringkasan sistem dan manajemen data master</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Penjualan Bulan Ini" 
            value="Rp 245.500.000" 
            icon={<CircleDollarSign className="w-5 h-5" />} 
            bgClass="bg-[#22C55E]"
            trend="+12.5%"
          />
          <StatCard 
            title="Tim Sales Aktif" 
            value="8" 
            icon={<Users className="w-5 h-5" />} 
            bgClass="bg-[#3B82F6]"
            trend="+2"
          />
          <StatCard 
            title="Bengkel Terdaftar" 
            value="45" 
            icon={<ShoppingCart className="w-5 h-5" />} 
            bgClass="bg-[#A855F7]"
            trend="+5"
          />
          <StatCard 
            title="Produk Aktif" 
            value="32" 
            icon={<Package className="w-5 h-5" />} 
            bgClass="bg-[#F97316]"
            trend="+0"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/data-produk" className="bg-[#2563EB] text-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform block">
             <Package className="w-6 h-6 mb-4 opacity-90" />
             <h3 className="font-bold text-lg mb-1">Master Produk</h3>
             <p className="text-xs opacity-80">Kelola data oli Kixx & Petronas</p>
          </Link>
          <Link to="/data-pelanggan" className="bg-[#A855F7] text-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform block">
             <Users className="w-6 h-6 mb-4 opacity-90" />
             <h3 className="font-bold text-lg mb-1">Master Pelanggan</h3>
             <p className="text-xs opacity-80">Kelola data bengkel mitra</p>
          </Link>
          <Link to="#" className="bg-[#F97316] text-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform block">
             <UserCheck className="w-6 h-6 mb-4 opacity-90" />
             <h3 className="font-bold text-lg mb-1">User Management</h3>
             <p className="text-xs opacity-80">Kelola hak akses pengguna</p>
          </Link>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
          <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center">
            <h3 className="font-bold text-[#1E293B]">Transaksi Terbaru</h3>
            <button className="text-sm text-[#0B56A6] font-semibold hover:underline">Lihat Semua</button>
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
                <tr className="border-t border-[#E2E8F0]">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">INV-2026-001</td>
                  <td className="py-4 px-6 text-[#475569]">Berkah Sekawan Motor</td>
                  <td className="py-4 px-6 font-semibold text-[#1E293B]">Rp 5.400.000</td>
                  <td className="py-4 px-6"><span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">Lunas</span></td>
                  <td className="py-4 px-6 text-[#64748B]">28 Apr 2026</td>
                </tr>
                <tr className="border-t border-[#E2E8F0]">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">INV-2026-002</td>
                  <td className="py-4 px-6 text-[#475569]">Jaya Motor Banjarmasin</td>
                  <td className="py-4 px-6 font-semibold text-[#1E293B]">Rp 8.200.000</td>
                  <td className="py-4 px-6"><span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#D97706]">Tempo</span></td>
                  <td className="py-4 px-6 text-[#64748B]">27 Apr 2026</td>
                </tr>
                <tr className="border-t border-[#E2E8F0]">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">INV-2026-003</td>
                  <td className="py-4 px-6 text-[#475569]">Mandiri Service</td>
                  <td className="py-4 px-6 font-semibold text-[#1E293B]">Rp 3.600.000</td>
                  <td className="py-4 px-6"><span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">Lunas</span></td>
                  <td className="py-4 px-6 text-[#64748B]">27 Apr 2026</td>
                </tr>
                <tr className="border-t border-[#E2E8F0]">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">INV-2026-004</td>
                  <td className="py-4 px-6 text-[#475569]">Abadi Motor</td>
                  <td className="py-4 px-6 font-semibold text-[#1E293B]">Rp 6.800.000</td>
                  <td className="py-4 px-6"><span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#D97706]">Tempo</span></td>
                  <td className="py-4 px-6 text-[#64748B]">26 Apr 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
