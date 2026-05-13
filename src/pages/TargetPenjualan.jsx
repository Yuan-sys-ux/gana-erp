import DashboardLayout from '../layouts/DashboardLayout';
import { Target, TrendingUp, Award, Calendar, ChevronRight, Package } from 'lucide-react';

export default function TargetPenjualan() {
  // Mock Data
  const targetData = {
    bulan: 'Mei 2026',
    targetRevenue: 150000000, // 150 Juta
    achievedRevenue: 95000000, // 95 Juta
    targetDus: 400,
    achievedDus: 285,
    daysRemaining: 15,
  };

  const focalProducts = [
    { brand: 'Petronas', name: 'Syntium 7000 0W-20', target: 50, achieved: 20, color: 'bg-[#22C55E]' },
    { brand: 'Kixx', name: 'Kixx PAO 5W-40', target: 40, achieved: 35, color: 'bg-[#EF4444]' },
    { brand: 'Petronas', name: 'Urania 3000 15W-40', target: 100, achieved: 45, color: 'bg-[#22C55E]' },
  ];

  const calculatePercentage = (achieved, target) => {
    return Math.min(Math.round((achieved / target) * 100), 100);
  };

  const revenuePercentage = calculatePercentage(targetData.achievedRevenue, targetData.targetRevenue);
  const dusPercentage = calculatePercentage(targetData.achievedDus, targetData.targetDus);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Target Penjualan</h2>
            <p className="text-sm text-[#64748B] mt-1">Pantau pencapaian target bulanan Anda</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-[#E2E8F0] shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#4F46E5]" />
            <span className="text-sm font-bold text-[#1E293B]">{targetData.bulan}</span>
          </div>
        </div>

        {/* Main Target Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue Target (Main Card) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white opacity-10 blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-[#A5B4FC]" />
                  <h3 className="text-lg font-bold text-white">Target Omset Bulanan</h3>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-[#A5B4FC] font-semibold mb-1">Pencapaian Saat Ini</p>
                  <div className="flex items-end gap-3 mb-2">
                    <span className="text-4xl font-black">Rp {(targetData.achievedRevenue / 1000000).toFixed(1)} JT</span>
                    <span className="text-lg font-semibold text-[#A5B4FC] mb-1">/ Rp {(targetData.targetRevenue / 1000000).toFixed(1)} JT</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>Progress</span>
                    <span>{revenuePercentage}%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-3">
                    <div 
                      className="bg-[#34D399] h-3 rounded-full transition-all duration-1000 relative"
                      style={{ width: `${revenuePercentage}%` }}
                    >
                      {/* Glow effect on the tip */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_#34D399]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bonus Estimation Box */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full md:w-64 shrink-0 text-center">
                <Award className="w-10 h-10 text-[#FBBF24] mx-auto mb-3" />
                <p className="text-xs font-semibold text-[#E0E7FF] uppercase tracking-wider mb-1">Estimasi Bonus</p>
                <h4 className="text-2xl font-bold text-white mb-3">Rp 1.500.000</h4>
                <div className="bg-black/20 rounded-lg p-2 text-xs text-[#A5B4FC]">
                  Sisa {targetData.daysRemaining} hari lagi!
                </div>
              </div>

            </div>
          </div>

          {/* Volume Target (Dus) */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#F0FDF4] rounded-lg flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-[#16A34A]" />
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mb-1">Target Volume (Dus)</h3>
              <p className="text-xs text-[#64748B]">Total dus terjual vs target</p>
            </div>
            
            <div className="mt-6 flex flex-col items-center">
              {/* Circular Progress Mockup */}
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#E2E8F0]"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#16A34A]"
                    strokeWidth="3"
                    strokeDasharray={`${dusPercentage}, 100`}
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-[#1E293B]">{dusPercentage}%</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-[#1E293B]">{targetData.achievedDus}</span>
                <span className="text-[#64748B] text-sm"> / {targetData.targetDus} Dus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Focal Products Section */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
          <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#EA580C]" />
              <h3 className="font-bold text-[#1E293B] text-lg">Focal Products Bulan Ini</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {focalProducts.map((product, idx) => {
                const pct = calculatePercentage(product.achieved, product.target);
                return (
                  <div key={idx} className="border border-[#E2E8F0] rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded uppercase ${product.color}`}>
                          {product.brand}
                        </span>
                        <h4 className="font-bold text-[#1E293B] mt-2 leading-tight">{product.name}</h4>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                        <span className="text-xs font-bold text-[#475569]">{pct}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-semibold text-[#64748B] mb-1.5">
                        <span>Pencapaian: {product.achieved} dus</span>
                        <span>Target: {product.target} dus</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                        <div 
                          className={`${pct >= 100 ? 'bg-[#22C55E]' : 'bg-[#4F46E5]'} h-2 rounded-full`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Suggestion / Tips Box */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-6 flex items-start gap-4 mt-2">
          <div className="w-10 h-10 bg-[#FEF3C7] rounded-full flex items-center justify-center shrink-0">
            <span className="text-xl">💡</span>
          </div>
          <div>
            <h4 className="font-bold text-[#92400E] mb-1">Tips Meningkatkan Penjualan Bulan Ini</h4>
            <p className="text-sm text-[#B45309] leading-relaxed">
              Fokuskan kunjungan ke bengkel-bengkel besar di area Banjarmasin untuk menawarkan <span className="font-bold">Syntium 7000 0W-20</span> yang baru saja restock. Ada promo khusus beli 10 dus gratis 1 dus untuk pelanggan dengan status "Active".
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
