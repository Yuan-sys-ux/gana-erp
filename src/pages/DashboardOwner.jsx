import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { DollarSign, AlertTriangle, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardOwner() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Title Section */}
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Dashboard Owner - Pak Tigana</h2>
          <p className="text-xs text-[#64748B] mt-1">Monitoring profitabilitas dan piutang bermasalah</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Piutang" 
            value="Rp 285.400.000" 
            icon={<DollarSign className="w-5 h-5" />} 
            bgClass="bg-[#3B82F6]"
            trend="+8.2%"
          />
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-5 flex flex-col justify-between border border-[#E2E8F0] h-full gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <p className="text-xs font-semibold text-[#64748B] mb-2">Piutang Jatuh Tempo</p>
                <h3 className="text-[22px] font-bold text-[#1E293B] leading-none">Rp 45.200.000</h3>
              </div>
              <div className={`w-[42px] h-[42px] rounded-lg flex items-center justify-center shrink-0 bg-[#EF4444] text-white`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-auto">
              <span className="text-[11px] font-semibold text-[#EF4444]">12 bengkel</span>
            </div>
          </div>
          <StatCard 
            title="Sales MTD" 
            value="Rp 445.800.000" 
            icon={<TrendingUp className="w-5 h-5" />} 
            bgClass="bg-[#22C55E]"
            trend="+15.3%"
          />
          <StatCard 
            title="Purchase MTD" 
            value="Rp 298.500.000" 
            icon={<Calendar className="w-5 h-5" />} 
            bgClass="bg-[#A855F7]"
            trend="+6.7%"
          />
        </div>

        {/* Middle Section: Chart and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-5 flex flex-col">
            <h3 className="font-bold text-[#1E293B] mb-6">Sales vs Purchases MTD</h3>
            
            <div className="flex-1 flex flex-col justify-between gap-6">
              {/* Jan 2026 */}
              <div>
                <p className="text-xs font-semibold text-[#64748B] mb-2">Jan 2026</p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-[#22C55E] h-5 rounded-r w-[85%]"></div>
                  <span className="text-[10px] font-bold text-[#22C55E]">Sales: Rp 380jt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#3B82F6] h-5 rounded-r w-[55%]"></div>
                  <span className="text-[10px] font-bold text-[#3B82F6]">Purchase: Rp 245jt</span>
                </div>
              </div>

              {/* Feb 2026 */}
              <div>
                <p className="text-xs font-semibold text-[#64748B] mb-2">Feb 2026</p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-[#22C55E] h-5 rounded-r w-[95%]"></div>
                  <span className="text-[10px] font-bold text-[#22C55E]">Sales: Rp 420jt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#3B82F6] h-5 rounded-r w-[62%]"></div>
                  <span className="text-[10px] font-bold text-[#3B82F6]">Purchase: Rp 280jt</span>
                </div>
              </div>

              {/* Mar 2026 */}
              <div>
                <p className="text-xs font-semibold text-[#64748B] mb-2">Mar 2026</p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-[#22C55E] h-5 rounded-r w-[88%]"></div>
                  <span className="text-[10px] font-bold text-[#22C55E]">Sales: Rp 390jt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#3B82F6] h-5 rounded-r w-[60%]"></div>
                  <span className="text-[10px] font-bold text-[#3B82F6]">Purchase: Rp 265jt</span>
                </div>
              </div>

              {/* Apr 2026 */}
              <div>
                <p className="text-xs font-semibold text-[#64748B] mb-2">Apr 2026</p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-[#22C55E] h-5 rounded-r w-[100%]"></div>
                  <span className="text-[10px] font-bold text-[#22C55E]">Sales: Rp 446jt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#3B82F6] h-5 rounded-r w-[66%]"></div>
                  <span className="text-[10px] font-bold text-[#3B82F6]">Purchase: Rp 298jt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="flex flex-col gap-4">
            <Link to="/aging-schedule" className="bg-[#EF4444] text-white p-6 rounded-xl shadow-sm hover:bg-[#DC2626] transition-colors flex-1 flex flex-col justify-center">
               <AlertTriangle className="w-6 h-6 mb-3 opacity-90" />
               <h3 className="font-bold text-lg mb-1">Aging Schedule</h3>
               <p className="text-sm opacity-90">Piutang 30-180+ hari</p>
            </Link>
            <Link to="/monitoring-piutang" className="bg-[#3B82F6] text-white p-6 rounded-xl shadow-sm hover:bg-[#2563EB] transition-colors flex-1 flex flex-col justify-center">
               <DollarSign className="w-6 h-6 mb-3 opacity-90" />
               <h3 className="font-bold text-lg mb-1">Credit Monitoring</h3>
               <p className="text-sm opacity-90">Detail piutang per bengkel</p>
            </Link>
          </div>
        </div>

        {/* Highest Receivables Table */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
          <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center">
            <div>
              <h3 className="font-bold text-[#1E293B]">Bengkel dengan Piutang Tertinggi</h3>
              <p className="text-xs text-[#64748B] mt-1">Prioritas collection</p>
            </div>
            <Link to="/monitoring-piutang" className="text-sm text-[#4F46E5] font-semibold hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">BENGKEL</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">OUTSTANDING</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">OVERDUE</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">AGING STATUS</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Berkah Sekawan Motor</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 15.400.000</td>
                  <td className="py-4 px-6 text-[#64748B]">45 hari</td>
                  <td className="py-4 px-6"><div className="h-2 w-full max-w-[100px] rounded-full bg-[#EF4444]"></div></td>
                </tr>
                <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Jaya Motor Banjarmasin</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 12.800.000</td>
                  <td className="py-4 px-6 text-[#64748B]">32 hari</td>
                  <td className="py-4 px-6"><div className="h-2 w-full max-w-[100px] rounded-full bg-[#F59E0B]"></div></td>
                </tr>
                <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Mandiri Service</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 8.600.000</td>
                  <td className="py-4 px-6 text-[#64748B]">18 hari</td>
                  <td className="py-4 px-6"><div className="h-2 w-full max-w-[100px] rounded-full bg-[#22C55E]"></div></td>
                </tr>
                <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Abadi Motor</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 6.400.000</td>
                  <td className="py-4 px-6 text-[#64748B]">65 hari</td>
                  <td className="py-4 px-6"><div className="h-2 w-full max-w-[100px] rounded-full bg-[#EF4444]"></div></td>
                </tr>
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Mitra Jaya</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 5.200.000</td>
                  <td className="py-4 px-6 text-[#64748B]">28 hari</td>
                  <td className="py-4 px-6"><div className="h-2 w-full max-w-[100px] rounded-full bg-[#F59E0B]"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
