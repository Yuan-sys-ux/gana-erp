import DashboardLayout from '../layouts/DashboardLayout';
import { MapPin, Image as ImageIcon, Calendar, Plus, Camera, Check, DollarSign } from 'lucide-react';

export default function LaporanKunjungan() {
  const visits = [
    {
      name: 'Berkah Sekawan Motor',
      datetime: '28 Apr 2026 • 10:30',
      description: 'Diskusi kebutuhan oli untuk bulan depan. Owner tertarik dengan promo Kixx G1.',
      orderValue: 'Rp 5.400.000',
      hasOrder: true
    },
    {
      name: 'Jaya Motor',
      datetime: '28 Apr 2026 • 14:15',
      description: 'Follow up piutang bulan lalu. Belum ada order baru.',
      orderValue: null,
      hasOrder: false
    },
    {
      name: 'Mandiri Service',
      datetime: '27 Apr 2026 • 09:00',
      description: 'Kunjungan rutin. Order 12 dus Petronas Syntium 5000.',
      orderValue: 'Rp 4.200.000',
      hasOrder: true
    },
    {
      name: 'Abadi Motor',
      datetime: '27 Apr 2026 • 16:45',
      description: 'Perkenalan produk baru Kixx PAO series. Owner tertarik untuk trial.',
      orderValue: 'Rp 2.400.000',
      hasOrder: true
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">Laporan Kunjungan</h2>
            <p className="text-sm text-[#64748B] mt-1">Sales Activity Log dengan foto kunjungan</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg font-semibold text-sm hover:bg-[#4338CA] transition-colors w-full sm:w-auto">
            <Plus className="w-4 h-4" /> Catat Kunjungan
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#3B82F6] mb-1">Kunjungan Minggu Ini</p>
              <h3 className="text-2xl font-bold text-[#1E3A8A]">12</h3>
            </div>
          </div>
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#22C55E] text-white flex items-center justify-center shrink-0 shadow-sm">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#16A34A] mb-1">Dengan Foto</p>
              <h3 className="text-2xl font-bold text-[#14532D]">10</h3>
            </div>
          </div>
          <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#A855F7] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#9333EA] mb-1">Menghasilkan Order</p>
              <h3 className="text-2xl font-bold text-[#581C87]">8</h3>
            </div>
          </div>
        </div>

        {/* Riwayat Kunjungan List */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0]">
            <h3 className="font-bold text-[#1E293B]">Riwayat Kunjungan</h3>
          </div>
          <div className="flex flex-col">
            {visits.map((visit, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-5 p-6 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors last:border-0">
                
                {/* Left: Photo Placeholder */}
                <div className="w-full sm:w-[120px] h-[120px] bg-[#E2E8F0] rounded-xl flex flex-col items-center justify-center text-[#94A3B8] shrink-0 border border-[#CBD5E1]">
                  <Camera className="w-8 h-8 mb-2" />
                </div>

                {/* Middle: Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-lg text-[#1E293B]">{visit.name}</h4>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#64748B] mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {visit.datetime}
                      </div>
                    </div>
                    {/* Tags for Mobile / Desktop Right */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold border border-[#E2E8F0]">
                        <Camera className="w-3.5 h-3.5" /> Foto
                      </div>
                      {visit.hasOrder ? (
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold border border-[#BBF7D0]">
                          <Check className="w-3.5 h-3.5" /> Ada Order
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold border border-[#E2E8F0]">
                          Kunjungan
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-[#475569] mb-4">{visit.description}</p>
                  
                  {visit.orderValue && (
                    <div className="mt-auto self-start flex items-center gap-1.5 bg-[#F0FDF4] border border-[#BBF7D0] px-3 py-1.5 rounded-lg text-xs font-bold text-[#16A34A]">
                      <DollarSign className="w-3.5 h-3.5" />
                      Order Value: {visit.orderValue}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
