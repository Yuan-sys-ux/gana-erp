import DashboardLayout from '../layouts/DashboardLayout';
import { DollarSign, Calendar as CalendarIcon, AlertTriangle, Circle } from 'lucide-react';

export default function AgingSchedule() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Aging Schedule - Analisis Piutang</h2>
          <p className="text-sm text-[#64748B] mt-1">Tabel piutang dengan indikator 30, 60, 90, 180 hingga 800+ hari</p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-5 flex flex-col gap-2">
            <DollarSign className="w-5 h-5 text-[#3B82F6]" />
            <p className="text-xs font-semibold text-[#64748B]">Total Piutang</p>
            <h3 className="text-[22px] font-bold text-[#1E293B]">Rp 52.0jt</h3>
          </div>
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-5 flex flex-col gap-2">
            <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
            <p className="text-xs font-semibold text-[#64748B]">Current + 30 Hari</p>
            <h3 className="text-[22px] font-bold text-[#22C55E]">Rp 23.6jt</h3>
          </div>
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-5 flex flex-col gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
            <p className="text-xs font-semibold text-[#64748B]">60-90 Hari</p>
            <h3 className="text-[22px] font-bold text-[#F59E0B]">Rp 20.6jt</h3>
          </div>
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-5 flex flex-col gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
            <p className="text-xs font-semibold text-[#64748B]">180+ Hari (Kritis)</p>
            <h3 className="text-[22px] font-bold text-[#EF4444]">Rp 7.8jt</h3>
          </div>
        </div>

        {/* Aging Table */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
          <div className="p-5 border-b border-[#E2E8F0] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1E293B]">Tabel Aging Schedule</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Per tanggal 28 April 2026</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">NAMA BENGKEL</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">CURRENT</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">1-30 HARI</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">31-60 HARI</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">61-90 HARI</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">91-180 HARI</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">180+ HARI</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">TOTAL</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#E2E8F0] bg-red-50/50 hover:bg-red-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1E293B] flex items-center gap-2">
                    Berkah Sekawan Motor <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                  </td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 font-bold text-[#22C55E]">Rp 5.4jt</td>
                  <td className="py-4 px-6 font-bold text-[#F59E0B]">Rp 4.2jt</td>
                  <td className="py-4 px-6 font-bold text-[#F97316]">Rp 3.8jt</td>
                  <td className="py-4 px-6 font-bold text-[#EF4444]">Rp 2.0jt</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 15.4jt</td>
                </tr>
                <tr className="border-b border-[#E2E8F0] bg-red-50/50 hover:bg-red-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1E293B] flex items-center gap-2">
                    Jaya Motor Banjarmasin <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                  </td>
                  <td className="py-4 px-6 text-[#475569]">Rp 2.4jt</td>
                  <td className="py-4 px-6 font-bold text-[#22C55E]">Rp 4.8jt</td>
                  <td className="py-4 px-6 font-bold text-[#F59E0B]">Rp 3.6jt</td>
                  <td className="py-4 px-6 font-bold text-[#F97316]">Rp 2.0jt</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 12.8jt</td>
                </tr>
                <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1E293B]">Mandiri Service</td>
                  <td className="py-4 px-6 text-[#475569]">Rp 3.6jt</td>
                  <td className="py-4 px-6 font-bold text-[#22C55E]">Rp 3.0jt</td>
                  <td className="py-4 px-6 font-bold text-[#F59E0B]">Rp 2.0jt</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 8.6jt</td>
                </tr>
                <tr className="border-b border-[#E2E8F0] bg-red-50/50 hover:bg-red-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1E293B] flex items-center gap-2">
                    Abadi Motor <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                  </td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 font-bold text-[#F59E0B]">Rp 1.4jt</td>
                  <td className="py-4 px-6 font-bold text-[#F97316]">Rp 2.0jt</td>
                  <td className="py-4 px-6 font-bold text-[#EF4444]">Rp 1.0jt</td>
                  <td className="py-4 px-6 font-bold text-[#EF4444]">Rp 2.0jt</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 6.4jt</td>
                </tr>
                <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1E293B]">Mitra Jaya</td>
                  <td className="py-4 px-6 text-[#475569]">Rp 1.2jt</td>
                  <td className="py-4 px-6 font-bold text-[#22C55E]">Rp 2.4jt</td>
                  <td className="py-4 px-6 font-bold text-[#F59E0B]">Rp 1.6jt</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 5.2jt</td>
                </tr>
                <tr className="border-b border-[#E2E8F0] bg-red-50/50 hover:bg-red-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1E293B] flex items-center gap-2">
                    Sentosa Motor <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                  </td>
                  <td className="py-4 px-6 text-[#475569]">Rp 0.8jt</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 text-[#64748B]">-</td>
                  <td className="py-4 px-6 font-bold text-[#EF4444]">Rp 1.2jt</td>
                  <td className="py-4 px-6 font-bold text-[#EF4444]">Rp 1.6jt</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 3.6jt</td>
                </tr>
                {/* Total Row */}
                <tr className="bg-[#F8FAFC]">
                  <td className="py-4 px-6 font-bold text-[#1E293B]">TOTAL</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 8.0jt</td>
                  <td className="py-4 px-6 font-bold text-[#22C55E]">Rp 15.6jt</td>
                  <td className="py-4 px-6 font-bold text-[#F59E0B]">Rp 12.8jt</td>
                  <td className="py-4 px-6 font-bold text-[#F97316]">Rp 7.8jt</td>
                  <td className="py-4 px-6 font-bold text-[#EF4444]">Rp 4.2jt</td>
                  <td className="py-4 px-6 font-bold text-[#EF4444]">Rp 3.6jt</td>
                  <td className="py-4 px-6 font-bold text-[#1E293B]">Rp 52.0jt</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="p-6 border-t border-[#E2E8F0] bg-white">
            <h4 className="font-bold text-sm text-[#1E293B] mb-4">Keterangan Warna Aging</h4>
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#22C55E]"></div>
                <span className="text-xs text-[#475569]">1-30 hari (Normal)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]"></div>
                <span className="text-xs text-[#475569]">31-60 hari (Perhatian)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#F97316]"></div>
                <span className="text-xs text-[#475569]">61-90 hari (Waspada)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444]"></div>
                <span className="text-xs text-[#475569]">180+ hari (Kritis)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
