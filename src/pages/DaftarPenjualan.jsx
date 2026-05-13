import DashboardLayout from '../layouts/DashboardLayout';
import { Search, FileText, CheckCircle2, Clock, XCircle, ChevronDown, Download, Eye } from 'lucide-react';

export default function DaftarPenjualan() {
  const salesOrders = [
    { id: 'SO-20260511-001', date: '11 Mei 2026', customer: 'Berkah Sekawan Motor', sales: 'Fernando', total: 4200000, status: 'Draft' },
    { id: 'SO-20260511-002', date: '11 Mei 2026', customer: 'Jaya Motor Banjarmasin', sales: 'Budi Sales', total: 8500000, status: 'Approved' },
    { id: 'SO-20260510-015', date: '10 Mei 2026', customer: 'Mandiri Service', sales: 'Fernando', total: 12400000, status: 'Shipped' },
    { id: 'SO-20260510-016', date: '10 Mei 2026', customer: 'Abadi Motor', sales: 'Budi Sales', total: 3200000, status: 'Invoiced' },
    { id: 'SO-20260509-022', date: '09 Mei 2026', customer: 'Mitra Jaya Motor', sales: 'Fernando', total: 5600000, status: 'Cancelled' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Draft': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#F1F5F9] text-[#64748B] flex items-center gap-1 w-max"><Clock className="w-3 h-3" /> Draft</span>;
      case 'Approved': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706] flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3" /> Approved</span>;
      case 'Shipped': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#E0E7FF] text-[#4F46E5] flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3" /> Shipped</span>;
      case 'Invoiced': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A] flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3" /> Invoiced</span>;
      case 'Cancelled': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] flex items-center gap-1 w-max"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Daftar Penjualan</h2>
            <p className="text-sm text-[#64748B] mt-1">Kelola seluruh transaksi Sales Order (SO)</p>
          </div>
          <button className="bg-white border border-[#E2E8F0] text-[#475569] hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
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
              placeholder="Cari No SO atau Nama Bengkel..." 
              className="w-full pl-10 pr-4 py-2.5 border-none rounded-lg text-sm focus:outline-none focus:ring-0 text-[#334155] placeholder:text-[#94A3B8] bg-transparent"
            />
          </div>
          <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block"></div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white flex-1 sm:w-[150px]">
              <option>Bulan Ini</option>
              <option>Bulan Lalu</option>
            </select>
            <select className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white flex-1 sm:w-[150px]">
              <option>Semua Status</option>
              <option>Draft</option>
              <option>Approved</option>
              <option>Shipped</option>
              <option>Invoiced</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0]">
                  <th className="py-4 px-6">NO SO</th>
                  <th className="py-4 px-6">TANGGAL</th>
                  <th className="py-4 px-6">PELANGGAN</th>
                  <th className="py-4 px-6">SALES</th>
                  <th className="py-4 px-6">TOTAL</th>
                  <th className="py-4 px-6">STATUS</th>
                  <th className="py-4 px-6 text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {salesOrders.map((so, idx) => (
                  <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#94A3B8]" />
                        <span className="font-bold text-[#4F46E5]">{so.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#475569]">{so.date}</td>
                    <td className="py-4 px-6 font-bold text-[#1E293B]">{so.customer}</td>
                    <td className="py-4 px-6 text-[#64748B]">{so.sales}</td>
                    <td className="py-4 px-6 font-bold text-[#1E293B]">Rp {so.total.toLocaleString('id-ID')}</td>
                    <td className="py-4 px-6">
                      {getStatusBadge(so.status)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9] transition-colors text-xs font-semibold">
                          <Eye className="w-4 h-4" /> Detail
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
