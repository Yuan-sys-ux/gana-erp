import DashboardLayout from '../layouts/DashboardLayout';
import { History, Search, ArrowDownRight, ArrowUpRight, Filter, Download } from 'lucide-react';

export default function RiwayatStok() {
  const stockHistory = [
    { id: 'TRX-260511-01', date: '11 Mei 2026 14:30', type: 'out', product: 'Kixx G1 5W-30', qty: 15, ref: 'DO-20260511-001 (Berkah Sekawan Motor)', balance: 105 },
    { id: 'TRX-260511-02', date: '11 Mei 2026 10:15', type: 'in', product: 'Kixx G1 5W-30', qty: 50, ref: 'RCV-20260511-02 (PT. ABM)', balance: 120 },
    { id: 'TRX-260510-15', date: '10 Mei 2026 16:00', type: 'out', product: 'Syntium 7000 0W-20', qty: 25, ref: 'DO-20260510-015 (Mandiri Service)', balance: 80 },
    { id: 'TRX-260510-10', date: '10 Mei 2026 13:20', type: 'out', product: 'Urania 3000 15W-40', qty: 12, ref: 'DO-20260510-010 (Abadi Motor)', balance: 110 },
    { id: 'TRX-260509-05', date: '09 Mei 2026 09:45', type: 'in', product: 'Syntium 7000 0W-20', qty: 100, ref: 'RCV-20260509-05 (PT. PLI)', balance: 105 },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Riwayat Stok (Kartu Stok)</h2>
            <p className="text-sm text-[#64748B] mt-1">Pantau mutasi barang masuk dan keluar secara realtime</p>
          </div>
          <button className="bg-white border border-[#E2E8F0] text-[#475569] hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <input 
              type="text" 
              placeholder="Cari Produk atau No Referensi..." 
              className="w-full pl-10 pr-4 py-2 border-none rounded-lg text-sm focus:outline-none focus:ring-0 text-[#334155] placeholder:text-[#94A3B8] bg-transparent"
            />
          </div>
          <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block"></div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white flex-1 sm:w-[150px]">
              <option>Bulan Ini</option>
              <option>Bulan Lalu</option>
            </select>
            <select className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white flex-1 sm:w-[150px]">
              <option>Semua Tipe</option>
              <option>Barang Masuk (IN)</option>
              <option>Barang Keluar (OUT)</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0]">
                  <th className="py-4 px-6">TANGGAL & WAKTU</th>
                  <th className="py-4 px-6">PRODUK</th>
                  <th className="py-4 px-6">REFERENSI</th>
                  <th className="py-4 px-6 text-center">TIPE</th>
                  <th className="py-4 px-6 text-right">QTY (KARTON)</th>
                  <th className="py-4 px-6 text-right">SALDO AKHIR</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stockHistory.map((item, idx) => (
                  <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-[#475569] font-medium">{item.date}</td>
                    <td className="py-4 px-6 font-bold text-[#1E293B]">{item.product}</td>
                    <td className="py-4 px-6 text-[#64748B] text-xs">{item.ref}</td>
                    <td className="py-4 px-6 text-center">
                      {item.type === 'in' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold">
                          <ArrowDownRight className="w-3 h-3" /> MASUK
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FEE2E2] text-[#DC2626] text-[10px] font-bold">
                          <ArrowUpRight className="w-3 h-3" /> KELUAR
                        </span>
                      )}
                    </td>
                    <td className={`py-4 px-6 text-right font-black ${item.type === 'in' ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                      {item.type === 'in' ? '+' : '-'}{item.qty}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-[#1E293B]">
                      {item.balance}
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
