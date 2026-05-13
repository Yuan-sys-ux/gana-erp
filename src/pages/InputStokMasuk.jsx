import DashboardLayout from '../layouts/DashboardLayout';
import { PackagePlus, Save, Trash2, Search, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function InputStokMasuk() {
  const [draftItems, setDraftItems] = useState([
    { id: 1, brand: 'Petronas', name: 'Syntium 7000 0W-20', qty: 50, uom: 'Karton' },
    { id: 2, brand: 'Kixx', name: 'Kixx G1 5W-30', qty: 100, uom: 'Karton' },
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Input Stok Masuk</h2>
            <p className="text-sm text-[#64748B] mt-1">Catat penerimaan barang dari supplier (PO)</p>
          </div>
          <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-colors shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
            Kirim ke Kepala Gudang
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form Input Section */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] p-6 h-max">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#E2E8F0]">
              <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                <PackagePlus className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <h3 className="font-bold text-[#1E293B] text-lg">Form Penerimaan</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">No. Purchase Order (PO)</label>
                <input type="text" placeholder="e.g. PO-2026-001" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Supplier</label>
                <select className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]">
                  <option>-- Pilih Supplier --</option>
                  <option>PT. PLI (Petronas)</option>
                  <option>PT. ABM (Kixx)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-sm font-semibold text-[#334155]">Cari Produk</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-[#94A3B8]" />
                  </div>
                  <input type="text" placeholder="Ketik nama produk..." className="w-full pl-9 pr-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Qty Masuk</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Satuan</label>
                  <select className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]">
                    <option>Karton</option>
                    <option>Drum</option>
                  </select>
                </div>
              </div>

              <button className="w-full mt-4 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#E2E8F0] text-[#1E293B] font-bold py-2.5 rounded-lg text-sm transition-colors">
                + Tambah ke Draft
              </button>
            </div>
          </div>

          {/* Draft Table Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
              <div className="flex items-center gap-2">
                <Save className="w-5 h-5 text-[#64748B]" />
                <h3 className="font-bold text-[#1E293B] text-lg">Draft Penerimaan</h3>
              </div>
              <span className="bg-[#E0E7FF] text-[#4F46E5] text-xs font-bold px-3 py-1 rounded-full">{draftItems.length} Item</span>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-white text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider border-b border-[#E2E8F0]">
                    <th className="py-4 px-6">PRODUK</th>
                    <th className="py-4 px-6 text-center">QTY</th>
                    <th className="py-4 px-6 text-center">SATUAN</th>
                    <th className="py-4 px-6 text-center">AKSI</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {draftItems.map((item, idx) => (
                    <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${item.brand === 'Kixx' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#DCFCE7] text-[#16A34A]'}`}>
                          {item.brand}
                        </span>
                        <p className="font-bold text-[#1E293B]">{item.name}</p>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-[#1E293B]">{item.qty}</td>
                      <td className="py-4 px-6 text-center text-[#64748B]">{item.uom}</td>
                      <td className="py-4 px-6 text-center">
                        <button className="text-[#EF4444] hover:text-[#B91C1C] transition-colors p-1.5 rounded-md hover:bg-[#FEE2E2]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {draftItems.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-[#94A3B8]">
                        Belum ada item di draft. Silakan tambah produk dari form di samping.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#64748B]">Total Volume Draft</span>
                <span className="text-xl font-black text-[#1E293B]">{draftItems.reduce((acc, curr) => acc + curr.qty, 0)} Karton</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
