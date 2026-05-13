import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { Target, TrendingUp, MapPin, ShoppingCart, Camera, Check, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardSales() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Title Section */}
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Dashboard Sales - Fernando</h2>
          <p className="text-xs text-[#64748B] mt-1">Mobile field work & order management</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Target Bulan Ini" 
            value="Rp 50.000.000" 
            icon={<Target className="w-5 h-5" />} 
            bgClass="bg-[#3B82F6]"
          />
          {/* Custom Stat Card with Progress */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-5 flex flex-col justify-between border border-[#E2E8F0] h-full gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <p className="text-xs font-semibold text-[#64748B] mb-2">Terealisasi</p>
                <h3 className="text-[22px] font-bold text-[#1E293B] leading-none">Rp 38.400.000</h3>
              </div>
              <div className={`w-[42px] h-[42px] rounded-lg flex items-center justify-center shrink-0 bg-[#22C55E] text-white`}>
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 mb-1.5">
                <div className="bg-[#22C55E] h-1.5 rounded-full" style={{ width: '76.8%' }}></div>
              </div>
              <span className="text-[11px] font-semibold text-[#64748B]">76.8% tercapai</span>
            </div>
          </div>
          <StatCard 
            title="Kunjungan Minggu Ini" 
            value="12" 
            icon={<MapPin className="w-5 h-5" />} 
            bgClass="bg-[#F97316]"
          />
          <StatCard 
            title="Order Tertunda" 
            value="3" 
            icon={<ShoppingCart className="w-5 h-5" />} 
            bgClass="bg-[#A855F7]"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <Link to="/input-pesanan" className="bg-[#22C55E] text-white p-6 rounded-xl shadow-sm hover:bg-[#16A34A] transition-colors flex flex-col justify-center">
             <ShoppingCart className="w-6 h-6 mb-3 opacity-90" />
             <h3 className="font-bold text-lg mb-1">Quick Order</h3>
             <p className="text-sm opacity-90">Input pesanan cepat</p>
          </Link>
          <Link to="/laporan-kunjungan" className="bg-[#F97316] text-white p-6 rounded-xl shadow-sm hover:bg-[#EA580C] transition-colors flex flex-col justify-center">
             <MapPin className="w-6 h-6 mb-3 opacity-90" />
             <h3 className="font-bold text-lg mb-1">Visit Log</h3>
             <p className="text-sm opacity-90">Catat kunjungan + foto</p>
          </Link>
          <Link to="/target-penjualan" className="bg-[#3B82F6] text-white p-6 rounded-xl shadow-sm hover:bg-[#2563EB] transition-colors flex flex-col justify-center">
             <Target className="w-6 h-6 mb-3 opacity-90" />
             <h3 className="font-bold text-lg mb-1">Target Tracking</h3>
             <p className="text-sm opacity-90">Pantau pencapaian</p>
          </Link>
        </div>

        {/* Recent Visits List */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
          <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center">
            <h3 className="font-bold text-[#1E293B]">Kunjungan Terbaru</h3>
            <Link to="/laporan-kunjungan" className="text-sm text-[#4F46E5] font-semibold hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="flex flex-col">
            {[
              { name: 'Berkah Sekawan Motor', date: '28 Apr 2026', status: 'Ada Order' },
              { name: 'Jaya Motor', date: '28 Apr 2026', status: 'Kunjungan' },
              { name: 'Mandiri Service', date: '27 Apr 2026', status: 'Ada Order' },
              { name: 'Abadi Motor', date: '27 Apr 2026', status: 'Ada Order' }
            ].map((visit, index) => (
              <div key={index} className="flex items-center justify-between p-5 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors last:border-0">
                <div>
                  <h4 className="font-bold text-[#1E293B]">{visit.name}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">{visit.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EEF2FF] text-[#4F46E5] text-xs font-semibold hover:bg-[#E0E7FF] transition-colors">
                    <Camera className="w-3.5 h-3.5" /> Foto
                  </button>
                  {visit.status === 'Ada Order' ? (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold">
                      <Check className="w-3.5 h-3.5" /> Ada Order
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold">
                      Kunjungan
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#FEFCE8] rounded-xl border border-[#FEF08A] overflow-hidden mt-2">
          <div className="p-5 border-b border-[#FEF08A] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#EAB308]" />
            <h3 className="font-bold text-[#854D0E]">Produk Terlaris Bulan Ini</h3>
          </div>
          <div className="p-5 flex flex-col gap-3">
            {[
              { name: 'Kixx G1 5W-30', qty: '45 Dus', value: 'Rp 18.000.000' },
              { name: 'Petronas Syntium 5000', qty: '32 Dus', value: 'Rp 12.800.000' },
              { name: 'Kixx HD1 15W-40', qty: '28 Dus', value: 'Rp 7.600.000' }
            ].map((product, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-[#FEF08A] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#1E293B]">{product.name}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">{product.qty}</p>
                </div>
                <span className="font-bold text-[#1E293B]">{product.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
