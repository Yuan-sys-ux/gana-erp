import DashboardLayout from '../layouts/DashboardLayout';
import { ShieldCheck, XCircle, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function ApprovalStokMasuk() {
  const [approvals, setApprovals] = useState([
    { id: 'RCV-20260511-01', po: 'PO-2026-001', supplier: 'PT. PLI (Petronas)', date: '11 Mei 2026', items: 2, totalQty: 150, status: 'pending' },
    { id: 'RCV-20260511-02', po: 'PO-2026-002', supplier: 'PT. ABM (Kixx)', date: '11 Mei 2026', items: 1, totalQty: 50, status: 'pending' },
    { id: 'RCV-20260510-05', po: 'PO-2026-099', supplier: 'PT. PLI (Petronas)', date: '10 Mei 2026', items: 4, totalQty: 320, status: 'approved' },
  ]);

  const handleApprove = (id) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: 'approved' } : a));
  };

  const handleReject = (id) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Approval Stok Masuk</h2>
            <p className="text-sm text-[#64748B] mt-1">Verifikasi penerimaan barang dari supplier sebelum masuk ke master stok</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-[#E2E8F0]">
            <div className="text-center px-4 border-r border-[#E2E8F0]">
              <p className="text-[10px] font-bold text-[#64748B] uppercase">Menunggu</p>
              <p className="text-lg font-black text-[#F59E0B]">{approvals.filter(a => a.status === 'pending').length}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-[10px] font-bold text-[#64748B] uppercase">Disetujui Hari Ini</p>
              <p className="text-lg font-black text-[#16A34A]">{approvals.filter(a => a.status === 'approved').length}</p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <input 
              type="text" 
              placeholder="Cari No Penerimaan atau Supplier..." 
              className="w-full pl-10 pr-4 py-2 border-none rounded-lg text-sm focus:outline-none focus:ring-0 text-[#334155] placeholder:text-[#94A3B8] bg-transparent"
            />
          </div>
          <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block"></div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] rounded-lg transition-colors">
            <Filter className="w-4 h-4" /> Filter Status
          </button>
        </div>

        {/* Data List */}
        <div className="flex flex-col gap-4">
          {approvals.map((item, idx) => (
            <div key={idx} className={`bg-white rounded-2xl shadow-sm border ${item.status === 'pending' ? 'border-[#E2E8F0] hover:border-[#CBD5E1]' : item.status === 'approved' ? 'border-[#BBF7D0] opacity-70' : 'border-[#FECACA] opacity-70'} overflow-hidden transition-all duration-300`}>
              <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Info Section */}
                <div className="flex items-center gap-5 flex-1 w-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    item.status === 'pending' ? 'bg-[#FEF3C7] text-[#D97706]' :
                    item.status === 'approved' ? 'bg-[#DCFCE7] text-[#16A34A]' :
                    'bg-[#FEE2E2] text-[#DC2626]'
                  }`}>
                    {item.status === 'pending' && <Clock className="w-6 h-6" />}
                    {item.status === 'approved' && <CheckCircle2 className="w-6 h-6" />}
                    {item.status === 'rejected' && <XCircle className="w-6 h-6" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-[#1E293B] text-lg">{item.id}</h3>
                      <span className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#475569]">
                      <span className="font-semibold text-[#3B82F6]">{item.po}</span>
                      <span className="w-1 h-1 bg-[#CBD5E1] rounded-full"></span>
                      <span>{item.supplier}</span>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex items-center gap-8 bg-[#F8FAFC] px-6 py-3 rounded-xl border border-[#E2E8F0]">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-[#64748B] uppercase mb-0.5">Jenis Item</p>
                    <p className="font-bold text-[#1E293B]">{item.items} Produk</p>
                  </div>
                  <div className="w-px h-8 bg-[#E2E8F0]"></div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-[#64748B] uppercase mb-0.5">Total Qty</p>
                    <p className="font-black text-[#1E293B]">{item.totalQty} Karton</p>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex gap-3 w-full md:w-auto justify-end">
                  {item.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => handleReject(item.id)}
                        className="px-4 py-2 bg-white border border-[#FECACA] text-[#DC2626] hover:bg-[#FEF2F2] font-semibold text-sm rounded-xl transition-colors flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" /> Tolak
                      </button>
                      <button 
                        onClick={() => handleApprove(item.id)}
                        className="px-6 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" /> Approve
                      </button>
                    </>
                  ) : item.status === 'approved' ? (
                    <span className="text-[#16A34A] font-bold text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Disetujui</span>
                  ) : (
                    <span className="text-[#DC2626] font-bold text-sm flex items-center gap-1"><XCircle className="w-4 h-4"/> Ditolak</span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
