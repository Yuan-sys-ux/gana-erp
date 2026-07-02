import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { Target, TrendingUp, MapPin, ShoppingCart, Camera, Check, Award, AlertTriangle, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { targetService } from '../services/targetService';
import { userService } from '../services/userService';
import api from '../utils/api';

export default function DashboardSales() {
  const [targetData, setTargetData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [salesName, setSalesName] = useState(() => localStorage.getItem('userFullName') || 'Sales');
  const [warnings, setWarnings] = useState([]);
  const [dismissedWarnings, setDismissedWarnings] = useState([]);

  const loadWarnings = () => {
    api.get('/api/owner/monitoring-piutang')
      .then(res => {
        if (res.data && res.data.success && res.data.list) {
          processWarnings(res.data.list);
        } else {
          setWarnings([]);
        }
      })
      .catch((err) => {
        console.error("Gagal load warnings dari API:", err);
        setWarnings([]);
      });
  };

  const processWarnings = (list) => {
    const active = list.map(item => {
      let daysLeft = item.days;
      if (item.status === 'overdue') {
        daysLeft = -Math.abs(item.days);
      }
      return {
        id: item.id,
        customer: item.customer,
        amount: item.amount,
        days: daysLeft,
        status: item.status
      };
    }).filter(item => item.days <= 7);
    setWarnings(active);
  };



  const fetchTarget = (salesId = null) => {
    setIsLoading(true);
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const bulan = `${yyyy}-${mm}`;

    const params = { bulan };
    if (salesId) {
      params.sales_id = salesId;
    }

    targetService.get(params)
      .then((res) => {
        if (res.success && res.data) {
          setTargetData(res.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal load target penjualan untuk dashboard sales:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setSalesName(localStorage.getItem('userFullName') || 'Sales');
    loadWarnings();

    const userId = localStorage.getItem('userId');
    if (userId && userId !== 'dummy-sales-id') {
      fetchTarget(userId);
    } else {
      // Fallback
      userService.getSales()
        .then((res) => {
          const list = Array.isArray(res) ? res : (res?.data || res?.sales || []);
          const currentName = localStorage.getItem('userFullName');
          const matched = list.find(s => 
            (s.nama || s.nama_sales || s.name || '').toLowerCase() === (currentName || '').toLowerCase()
          );
          if (matched) {
            const resolvedId = matched.id || matched.id_sales;
            localStorage.setItem('userId', resolvedId);
            fetchTarget(resolvedId);
          } else {
            fetchTarget();
          }
        })
        .catch((err) => {
          console.error("Gagal load sales list fallback di dashboard:", err);
          fetchTarget();
        });
    }
  }, []);

  const pct = targetData ? Math.min(Math.round(((targetData.achievedRevenue || 0) / (targetData.targetRevenue || 1)) * 100), 100) : 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Title Section */}
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Dashboard Sales - {salesName}</h2>
          <p className="text-xs text-[#64748B] mt-1">Manajemen pesanan & pekerjaan lapangan mobile</p>
        </div>

        {/* Right-aligned Warning Notification Bar */}
        {warnings.length > 0 && (
          <div className="fixed top-20 right-6 z-50 w-80 flex flex-col gap-3">
            {warnings
              .filter(w => !dismissedWarnings.includes(w.id))
              .map(warn => {
                const isUrgent = warn.days <= 3;
                return (
                  <div key={warn.id} className={`p-4 rounded-xl shadow-lg border relative overflow-hidden bg-white animate-in slide-in-from-right duration-300 ${isUrgent ? 'border-red-200' : 'border-amber-200'}`}>
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${isUrgent ? 'bg-[#DC2626]' : 'bg-[#EAB308]'}`}></div>
                    <button onClick={() => setDismissedWarnings(prev => [...prev, warn.id])} className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex gap-2.5 items-start">
                      <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isUrgent ? 'text-[#DC2626] animate-pulse' : 'text-[#EAB308]'}`} />
                      <div className="pr-5 flex-1">
                        <h4 className={`font-bold text-xs ${isUrgent ? 'text-[#991B1B]' : 'text-[#854D0E]'}`}>Peringatan Jatuh Tempo!</h4>
                        <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                          Bengkel <span className="font-bold">{warn.customer}</span> {warn.days < 0 ? `telah menunggak selama ${Math.abs(warn.days)} hari` : `jatuh tempo dalam ${warn.days} hari`} (Rp {warn.amount.toLocaleString('id-ID')}).
                        </p>
                        <div className="mt-2.5">
                          <Link to="/monitoring-piutang" className={`inline-block px-3 py-1 rounded text-[10px] font-bold text-white transition-colors ${isUrgent ? 'bg-[#DC2626] hover:bg-[#B91C1C]' : 'bg-[#EAB308] hover:bg-[#CA8A04]'}`}>
                            Lihat Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Target Bulan Ini" 
            value={isLoading ? "Memuat..." : targetData ? `Rp ${Number(targetData.targetRevenue || 0).toLocaleString('id-ID')}` : "Rp 0"} 
            icon={<Target className="w-5 h-5" />} 
            bgClass="bg-[#3B82F6]"
          />
          {/* Custom Stat Card with Progress */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-5 flex flex-col justify-between border border-[#E2E8F0] h-full gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <p className="text-xs font-semibold text-[#64748B] mb-2">Terealisasi</p>
                <h3 className="text-[22px] font-bold text-[#1E293B] leading-none">
                  {isLoading ? "Memuat..." : targetData ? `Rp ${Number(targetData.achievedRevenue || 0).toLocaleString('id-ID')}` : "Rp 0"}
                </h3>
              </div>
              <div className={`w-[42px] h-[42px] rounded-lg flex items-center justify-center shrink-0 bg-[#22C55E] text-white`}>
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 mb-1.5">
                <div className="bg-[#22C55E] h-1.5 rounded-full" style={{ width: `${pct}%` }}></div>
              </div>
              <span className="text-[11px] font-semibold text-[#64748B]">{pct}% tercapai</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Link to="/input-pesanan" className="bg-[#22C55E] text-white p-6 rounded-xl shadow-sm hover:bg-[#16A34A] transition-colors flex flex-col justify-center">
             <ShoppingCart className="w-6 h-6 mb-3 opacity-90" />
             <h3 className="font-bold text-lg mb-1">Pesanan Cepat</h3>
             <p className="text-sm opacity-90">Input pesanan cepat</p>
          </Link>
          <Link to="/laporan-kunjungan" className="bg-[#F97316] text-white p-6 rounded-xl shadow-sm hover:bg-[#EA580C] transition-colors flex flex-col justify-center">
             <MapPin className="w-6 h-6 mb-3 opacity-90" />
             <h3 className="font-bold text-lg mb-1">Catatan Kunjungan</h3>
             <p className="text-sm opacity-90">Catat kunjungan + foto</p>
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
