import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { AlertCircle, Package, TrendingUp, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardKepalaGudang() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Title Section */}
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Dashboard Kepala Gudang</h2>
          <p className="text-xs text-[#64748B] mt-1">Validasi stok masuk dan Quality Control</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Menunggu Approval" 
            value="3" 
            icon={<AlertCircle className="w-5 h-5" />} 
            bgClass="bg-[#EAB308]"
          />
          <StatCard 
            title="Total Produk" 
            value="32" 
            icon={<Package className="w-5 h-5" />} 
            bgClass="bg-[#3B82F6]"
          />
          <StatCard 
            title="Stok Masuk Bulan Ini" 
            value="145 Dus" 
            icon={<TrendingUp className="w-5 h-5" />} 
            bgClass="bg-[#22C55E]"
          />
          <StatCard 
            title="Status QC Sesuai" 
            value="98%" 
            icon={<ClipboardCheck className="w-5 h-5" />} 
            bgClass="bg-[#A855F7]"
          />
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
          <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center">
            <div>
              <h3 className="font-bold text-[#1E293B]">Stok Masuk - Menunggu Approval</h3>
              <p className="text-xs text-[#64748B] mt-1">Validasi kualitas dan kuantitas barang dari supplier</p>
            </div>
            <Link to="/approval-stok" className="bg-[#4F46E5] text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-[#4338CA] transition-colors">
              Lihat Semua
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">NO PO</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">SUPPLIER</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">TANGGAL</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">TOTAL DUS</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">STATUS QC</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">AKSI</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">PO-2026-012</td>
                  <td className="py-4 px-6 text-[#475569]">PT. PLI (Petronas)</td>
                  <td className="py-4 px-6 text-[#64748B]">28 Apr 2026</td>
                  <td className="py-4 px-6 text-[#1E293B]">50 Dus</td>
                  <td className="py-4 px-6"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706]">Menunggu</span></td>
                  <td className="py-4 px-6"><button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA]">Review QC</button></td>
                </tr>
                <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">PO-2026-013</td>
                  <td className="py-4 px-6 text-[#475569]">PT. ABM (Kixx)</td>
                  <td className="py-4 px-6 text-[#64748B]">27 Apr 2026</td>
                  <td className="py-4 px-6 text-[#1E293B]">30 Dus</td>
                  <td className="py-4 px-6"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706]">Menunggu</span></td>
                  <td className="py-4 px-6"><button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA]">Review QC</button></td>
                </tr>
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">PO-2026-014</td>
                  <td className="py-4 px-6 text-[#475569]">PT. PLI (Petronas)</td>
                  <td className="py-4 px-6 text-[#64748B]">26 Apr 2026</td>
                  <td className="py-4 px-6 text-[#1E293B]">40 Dus</td>
                  <td className="py-4 px-6"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706]">Menunggu</span></td>
                  <td className="py-4 px-6"><button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA]">Review QC</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Stock Section */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
          <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center">
            <h3 className="font-bold text-[#1E293B]">Real-time Stock (Karton & Liter)</h3>
            <Link to="/riwayat-stok" className="text-sm text-[#4F46E5] font-semibold hover:underline">
              Riwayat Lengkap
            </Link>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors rounded-lg">
              <div>
                <h4 className="font-bold text-sm text-[#1E293B]">Kixx G1 5W-30</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Kixx</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-[#1E293B]">15 Dus (300 L)</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#FEF3C7] text-[#D97706]">Low</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors rounded-lg">
              <div>
                <h4 className="font-bold text-sm text-[#1E293B]">Petronas Syntium 5000 10W-40</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Petronas</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-[#1E293B]">8 Dus (160 L)</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#FEE2E2] text-[#EF4444]">Critical</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-[#F8FAFC] transition-colors rounded-lg">
              <div>
                <h4 className="font-bold text-sm text-[#1E293B]">Kixx HD1 15W-40</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Kixx</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-[#1E293B]">45 Dus (900 L)</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#16A34A]">Good</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
