import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { MapPin, Image as ImageIcon, Calendar, Plus, Camera, Check, DollarSign, X, Upload } from 'lucide-react';

export default function LaporanKunjungan() {
  const [visits, setVisits] = useState([
    {
      name: 'Berkah Sekawan Motor',
      datetime: '28 Apr 2026 • 10:30',
      description: 'Diskusi kebutuhan oli untuk bulan depan. Owner tertarik dengan promo Kixx G1.',
      orderValue: 'Rp 5.400.000',
      hasOrder: true,
      photoUrl: null
    },
    {
      name: 'Jaya Motor',
      datetime: '28 Apr 2026 • 14:15',
      description: 'Follow up piutang bulan lalu. Belum ada order baru.',
      orderValue: null,
      hasOrder: false,
      photoUrl: null
    },
    {
      name: 'Mandiri Service',
      datetime: '27 Apr 2026 • 09:00',
      description: 'Kunjungan rutin. Order 12 dus Petronas Syntium 5000.',
      orderValue: 'Rp 4.200.000',
      hasOrder: true,
      photoUrl: null
    },
    {
      name: 'Abadi Motor',
      datetime: '27 Apr 2026 • 16:45',
      description: 'Perkenalan produk baru Kixx PAO series. Owner tertarik untuk trial.',
      orderValue: 'Rp 2.400.000',
      hasOrder: true,
      photoUrl: null
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVisit, setNewVisit] = useState({
    name: '',
    description: '',
    hasOrder: false,
    orderValue: '',
    photoUrl: null
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewVisit({ ...newVisit, photoUrl: url });
    }
  };

  const handleAddVisit = (e) => {
    e.preventDefault();
    const d = new Date();
    const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    setVisits([
      {
        ...newVisit,
        datetime: `${dateStr} • ${timeStr}`,
        orderValue: newVisit.hasOrder ? `Rp ${newVisit.orderValue}` : null,
      },
      ...visits
    ]);
    
    setIsModalOpen(false);
    setNewVisit({ name: '', description: '', hasOrder: false, orderValue: '', photoUrl: null });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">Laporan Kunjungan</h2>
            <p className="text-sm text-[#64748B] mt-1">Sales Activity Log dengan foto kunjungan</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg font-semibold text-sm hover:bg-[#4338CA] transition-colors w-full sm:w-auto"
          >
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
                
                {/* Left: Photo / Placeholder */}
                <div className="w-full sm:w-[120px] h-[120px] bg-[#E2E8F0] rounded-xl flex flex-col items-center justify-center text-[#94A3B8] shrink-0 border border-[#CBD5E1] overflow-hidden">
                  {visit.photoUrl ? (
                    <img src={visit.photoUrl} alt="Foto Kunjungan" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 mb-2" />
                  )}
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

      {/* Modal Catat Kunjungan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] shrink-0">
              <h3 className="font-bold text-[#1E293B]">Catat Kunjungan Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-[#1E293B]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-1">
              <form id="kunjungan-form" onSubmit={handleAddVisit} className="flex flex-col gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-2">Nama Bengkel <span className="text-[#EF4444]">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={newVisit.name}
                    onChange={(e) => setNewVisit({...newVisit, name: e.target.value})}
                    placeholder="Contoh: Maju Jaya Motor"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-2">Deskripsi / Hasil Diskusi <span className="text-[#EF4444]">*</span></label>
                  <textarea 
                    required
                    rows="3"
                    value={newVisit.description}
                    onChange={(e) => setNewVisit({...newVisit, description: e.target.value})}
                    placeholder="Apa hasil kunjungan hari ini?"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                  ></textarea>
                </div>

                {/* Foto Upload */}
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-2">Foto Kunjungan</label>
                  <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-[#F8FAFC] transition-colors relative cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {newVisit.photoUrl ? (
                      <div className="w-full h-32 rounded-lg overflow-hidden border border-[#E2E8F0]">
                        <img src={newVisit.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center mb-2">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-[#4F46E5]">Upload Foto (Opsional)</p>
                        <p className="text-xs text-[#64748B] mt-1">JPG, PNG up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Order Toggle */}
                <div className="flex items-center gap-3 mt-2">
                  <input 
                    type="checkbox" 
                    id="hasOrder"
                    checked={newVisit.hasOrder}
                    onChange={(e) => setNewVisit({...newVisit, hasOrder: e.target.checked})}
                    className="w-4 h-4 text-[#4F46E5] rounded border-[#CBD5E1] focus:ring-[#4F46E5]"
                  />
                  <label htmlFor="hasOrder" className="text-sm font-bold text-[#1E293B]">Kunjungan menghasilkan Order Baru?</label>
                </div>

                {newVisit.hasOrder && (
                  <div className="mt-2">
                    <label className="block text-xs font-bold text-[#1E293B] mb-2">Estimasi Nilai Order <span className="text-[#EF4444]">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-bold text-sm">Rp</span>
                      <input 
                        type="text" 
                        required={newVisit.hasOrder}
                        value={newVisit.orderValue}
                        onChange={(e) => setNewVisit({...newVisit, orderValue: e.target.value})}
                        placeholder="5.000.000"
                        className="w-full border border-[#E2E8F0] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                      />
                    </div>
                  </div>
                )}
                
              </form>
            </div>

            <div className="p-5 border-t border-[#E2E8F0] flex justify-end gap-3 shrink-0">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white border border-[#CBD5E1] text-[#64748B] rounded-lg font-bold text-sm hover:bg-[#F8FAFC]"
              >
                Batal
              </button>
              <button 
                type="submit"
                form="kunjungan-form"
                className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg font-bold text-sm hover:bg-[#4338CA]"
              >
                Simpan Kunjungan
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
