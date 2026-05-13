import DashboardLayout from '../layouts/DashboardLayout';
import { Truck, PackageOpen, CheckCircle2, MapPin, Search, Plus } from 'lucide-react';

export default function PengirimanBarang() {
  const deliveries = {
    diproses: [
      { id: 'DO-20260511-001', customer: 'Berkah Sekawan Motor', qty: 15, address: 'Jl. A. Yani Km 5, Banjarmasin' },
      { id: 'DO-20260511-002', customer: 'Jaya Motor Banjarmasin', qty: 8, address: 'Jl. Lambung Mangkurat No. 45' },
    ],
    dikirim: [
      { id: 'DO-20260510-015', customer: 'Mandiri Service', qty: 25, address: 'Jl. Gatot Subroto Km 3, Banjarbaru', driver: 'Pak Udin (DA 8812 TX)' },
    ],
    terkirim: [
      { id: 'DO-20260510-010', customer: 'Abadi Motor', qty: 12, address: 'Jl. Hasan Basri, Banjarmasin', time: '14:30 WITA' },
      { id: 'DO-20260509-022', customer: 'Sejahtera Service', qty: 30, address: 'Jl. Sutoyo S, Banjarmasin', time: '10:15 WITA' },
    ]
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Pengiriman Barang</h2>
            <p className="text-sm text-[#64748B] mt-1">Pantau Surat Jalan (DO) dan status pengiriman armada</p>
          </div>
          <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Buat Surat Jalan
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <input 
              type="text" 
              placeholder="Cari No DO, nama pelanggan..." 
              className="w-full pl-10 pr-4 py-2 border-none rounded-lg text-sm focus:outline-none focus:ring-0 text-[#334155] placeholder:text-[#94A3B8] bg-transparent"
            />
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-8">
          
          {/* Column 1: Diproses */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PackageOpen className="w-5 h-5 text-[#64748B]" />
                <h3 className="font-bold text-[#1E293B]">Sedang Diproses</h3>
              </div>
              <span className="bg-[#E2E8F0] text-[#475569] text-xs font-bold px-2 py-1 rounded-full">{deliveries.diproses.length}</span>
            </div>
            
            <div className="flex flex-col gap-3">
              {deliveries.diproses.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-[#E2E8F0] cursor-grab hover:border-[#CBD5E1] transition-colors relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#94A3B8]"></div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-1 rounded">{item.id}</span>
                    <span className="text-[11px] font-bold text-[#64748B]">{item.qty} Dus</span>
                  </div>
                  <h4 className="font-bold text-[#1E293B] mb-2">{item.customer}</h4>
                  <div className="flex items-start gap-1.5 text-[#64748B]">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <p className="text-xs leading-relaxed">{item.address}</p>
                  </div>
                  <button className="mt-4 w-full py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-xs font-bold rounded-lg transition-colors">
                    Assign Driver
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Sedang Dikirim */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#EEF2FF] border border-[#C7D2FE] p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#4F46E5]" />
                <h3 className="font-bold text-[#1E40AF]">Sedang Dikirim</h3>
              </div>
              <span className="bg-[#C7D2FE] text-[#1E40AF] text-xs font-bold px-2 py-1 rounded-full">{deliveries.dikirim.length}</span>
            </div>
            
            <div className="flex flex-col gap-3">
              {deliveries.dikirim.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-md border border-[#C7D2FE] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#4F46E5]"></div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-1 rounded">{item.id}</span>
                    <span className="text-[11px] font-bold text-[#64748B]">{item.qty} Dus</span>
                  </div>
                  <h4 className="font-bold text-[#1E293B] mb-2">{item.customer}</h4>
                  <div className="flex items-start gap-1.5 text-[#64748B] mb-3">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <p className="text-xs leading-relaxed">{item.address}</p>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-[#E2E8F0] rounded-full flex items-center justify-center shrink-0">🚚</div>
                    <p className="text-xs font-semibold text-[#334155] truncate">{item.driver}</p>
                  </div>
                  <button className="w-full py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-lg transition-colors">
                    Selesaikan Pengiriman
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Terkirim */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                <h3 className="font-bold text-[#166534]">Terkirim Hari Ini</h3>
              </div>
              <span className="bg-[#BBF7D0] text-[#166534] text-xs font-bold px-2 py-1 rounded-full">{deliveries.terkirim.length}</span>
            </div>
            
            <div className="flex flex-col gap-3">
              {deliveries.terkirim.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-[#E2E8F0] relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#16A34A]"></div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-1 rounded">{item.id}</span>
                    <span className="text-[11px] font-bold text-[#64748B]">{item.time}</span>
                  </div>
                  <h4 className="font-bold text-[#1E293B] mb-2 line-through decoration-[#94A3B8]">{item.customer}</h4>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#E2E8F0]">
                    <span className="text-xs text-[#64748B] font-semibold">{item.qty} Dus</span>
                    <span className="text-[10px] font-bold text-[#16A34A] flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Berhasil</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
