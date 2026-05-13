import DashboardLayout from '../layouts/DashboardLayout';
import { Search, AlertTriangle, CheckCircle2, Clock, Mail, Phone, DollarSign } from 'lucide-react';

export default function MonitoringPiutang() {
  const piutangList = [
    { id: 'INV-2605-01', customer: 'Berkah Sekawan Motor', city: 'Banjarmasin', amount: 15400000, dueDate: '15 Mei 2026', status: 'overdue', days: 5 },
    { id: 'INV-2605-04', customer: 'Jaya Motor Banjarmasin', city: 'Banjarmasin', amount: 12800000, dueDate: '22 Mei 2026', status: 'warning', days: 2 },
    { id: 'INV-2605-08', customer: 'Mandiri Service', city: 'Banjarbaru', amount: 8600000, dueDate: '28 Mei 2026', status: 'safe', days: 8 },
    { id: 'INV-2605-12', customer: 'Abadi Motor', city: 'Banjarmasin', amount: 5200000, dueDate: '01 Jun 2026', status: 'safe', days: 12 },
    { id: 'INV-2604-99', customer: 'Sejahtera Service', city: 'Banjarmasin', amount: 2100000, dueDate: '05 Mei 2026', status: 'overdue', days: 15 },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Monitoring Piutang</h2>
            <p className="text-sm text-[#64748B] mt-1">Pantau status pembayaran dan tagihan jatuh tempo</p>
          </div>
          <button className="bg-white border border-[#E2E8F0] text-[#475569] hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
            Download Rekap (PDF)
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#2563EB]" />
              </div>
            </div>
            <p className="text-sm font-bold text-[#64748B] mb-1">Total Piutang Berjalan</p>
            <h3 className="text-3xl font-black text-[#1E293B]">Rp 44.1 JT</h3>
          </div>
          
          <div className="bg-[#FEF2F2] rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#FECACA]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#DC2626] rounded-xl flex items-center justify-center shadow-inner">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm font-bold text-[#991B1B] mb-1">Overdue (Jatuh Tempo)</p>
            <h3 className="text-3xl font-black text-[#7F1D1D]">Rp 17.5 JT</h3>
            <p className="text-xs font-semibold text-[#DC2626] mt-2">Terdapat 2 tagihan menunggak</p>
          </div>

          <div className="bg-[#FFFBEB] rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#FDE68A]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#F59E0B] rounded-xl flex items-center justify-center shadow-inner">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm font-bold text-[#92400E] mb-1">Warning (&lt; 7 Hari)</p>
            <h3 className="text-3xl font-black text-[#78350F]">Rp 12.8 JT</h3>
            <p className="text-xs font-semibold text-[#D97706] mt-2">Segera lakukan reminder</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <input 
              type="text" 
              placeholder="Cari nama bengkel atau no invoice..." 
              className="w-full pl-10 pr-4 py-2.5 border-none rounded-lg text-sm focus:outline-none focus:ring-0 text-[#334155] placeholder:text-[#94A3B8] bg-transparent"
            />
          </div>
          <div className="w-px h-8 bg-[#E2E8F0] mx-2"></div>
          <select className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white min-w-[150px] mr-2">
            <option>Semua Status</option>
            <option>Overdue</option>
            <option>Warning</option>
            <option>Aman</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0]">
                  <th className="py-4 px-6">BENGKEL / PELANGGAN</th>
                  <th className="py-4 px-6">NO INVOICE</th>
                  <th className="py-4 px-6">NOMINAL</th>
                  <th className="py-4 px-6">JATUH TEMPO</th>
                  <th className="py-4 px-6">STATUS</th>
                  <th className="py-4 px-6 text-center">TINDAKAN</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {piutangList.map((item, idx) => (
                  <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#1E293B]">{item.customer}</p>
                      <p className="text-xs text-[#64748B]">{item.city}</p>
                    </td>
                    <td className="py-4 px-6 text-[#4F46E5] font-semibold text-xs">
                      {item.id}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#1E293B]">
                      Rp {item.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#334155]">{item.dueDate}</p>
                    </td>
                    <td className="py-4 px-6">
                      {item.status === 'overdue' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626]">
                          <AlertTriangle className="w-3 h-3" />
                          <span className="text-[10px] font-bold">Telat {item.days} Hari</span>
                        </div>
                      )}
                      {item.status === 'warning' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706]">
                          <Clock className="w-3 h-3" />
                          <span className="text-[10px] font-bold">Sisa {item.days} Hari</span>
                        </div>
                      )}
                      {item.status === 'safe' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="text-[10px] font-bold">Sisa {item.days} Hari</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] transition-colors" title="Hubungi via Telepon">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-[#F0FDF4] text-[#16A34A] hover:bg-[#DCFCE7] transition-colors" title="Kirim Email Reminder">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
