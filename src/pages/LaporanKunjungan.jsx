import { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { MapPin, Image as ImageIcon, Calendar, Plus, Camera, Check, DollarSign, X, Upload, Loader2 } from 'lucide-react';
import { visitService } from '../services/visitService';
import { customerService } from '../services/customerService';

export default function LaporanKunjungan() {
  const [visits, setVisits] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalErrorMsg, setModalErrorMsg] = useState('');

  const formatDateTime = (val) => {
    if (!val) return '-';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} • ${timeStr}`;
  };

  const loadCustomers = () => {
    return customerService.getAll()
      .then((res) => {
        const data = Array.isArray(res) ? res : (res?.data || res?.customers || res?.pelanggan || []);
        setCustomers(data);
      })
      .catch((err) => {
        console.error("Gagal memuat pelanggan dari BE:", err);
        setCustomers([]);
      });
  };

  const loadVisits = () => {
    setIsLoading(true);
    visitService.getAll()
      .then((res) => {
        const data = Array.isArray(res) ? res : (res?.data || res?.visits || []);
        const mapped = data.map(v => ({
          id_pelanggan: v.id_pelanggan || null,
          name: v.bengkelName || v.name || v.bengkel || v.nama_bengkel || '',
          datetime: formatDateTime(v.date || v.datetime || v.created_at || v.tanggal || v.tgl_kunjungan),
          description: v.note || v.description || v.keterangan || v.hasil_diskusi || v.catatan || '',
          orderValue: v.orderValue || v.nilai_order || v.order_value || null,
          hasOrder: !!(v.hasOrder || v.has_order || v.nilai_order || v.orderValue),
          photoUrl: v.image || v.photoUrl || v.foto || v.photo || v.foto_visit || null
        }));
        setVisits(mapped);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat kunjungan:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadCustomers().finally(() => {
      loadVisits();
    });
  }, []);

  const mappedVisits = useMemo(() => {
    return visits.map(v => {
      const matchedCust = customers.find(c => String(c.id_pelanggan || c.id) === String(v.id_pelanggan));
      const customerName = matchedCust ? (matchedCust.nama || matchedCust.name) : (v.name || v.bengkel || v.nama_bengkel || 'Bengkel');
      return {
        ...v,
        resolvedName: customerName
      };
    });
  }, [visits, customers]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVisit, setNewVisit] = useState({
    id_pelanggan: '',
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
    setIsLoading(true);
    setModalErrorMsg('');
    
    const payload = {
      sales_id: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
      id_pelanggan: newVisit.id_pelanggan || null,
      pelanggan_id: newVisit.id_pelanggan || null,
      catatan: newVisit.description,
      keterangan: newVisit.description,
      has_order: newVisit.hasOrder ? 1 : 0,
      nilai_order: newVisit.hasOrder ? Number(newVisit.orderValue.replace(/[^0-9]/g, '')) : 0,
      tgl_kunjungan: new Date().toISOString().slice(0, 19).replace('T', ' '),
      foto_visit: newVisit.photoUrl // fallback preview local
    };

    visitService.create(payload)
      .then(() => {
        loadVisits();
        setIsModalOpen(false);
        setNewVisit({ id_pelanggan: '', name: '', description: '', hasOrder: false, orderValue: '', photoUrl: null });
        setModalErrorMsg('');
      })
      .catch((err) => {
        console.error("Gagal menyimpan kunjungan:", err);
        setModalErrorMsg("Gagal menyimpan data kunjungan ke backend. Silakan coba lagi.");
        setIsLoading(false);
      });
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
            onClick={() => { setModalErrorMsg(''); setIsModalOpen(true); }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg font-semibold text-sm hover:bg-[#4338CA] transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" /> Catat Kunjungan
          </button>
        </div>

        {errorMsg && (
          <div className="w-full bg-[#FEE2E2] text-[#DC2626] text-sm font-semibold p-4 rounded-lg border border-[#FCA5A5]">
            {errorMsg}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#3B82F6] mb-1">Total Kunjungan</p>
              <h3 className="text-2xl font-bold text-[#1E3A8A]">{visits.length}</h3>
            </div>
          </div>
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#22C55E] text-white flex items-center justify-center shrink-0 shadow-sm">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#16A34A] mb-1">Dengan Foto</p>
              <h3 className="text-2xl font-bold text-[#14532D]">{visits.filter(v => v.photoUrl).length}</h3>
            </div>
          </div>
          <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#A855F7] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#9333EA] mb-1">Menghasilkan Order</p>
              <h3 className="text-2xl font-bold text-[#581C87]">{visits.filter(v => v.hasOrder).length}</h3>
            </div>
          </div>
        </div>

        {/* Riwayat Kunjungan List */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0]">
            <h3 className="font-bold text-[#1E293B]">Riwayat Kunjungan</h3>
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-12 text-[#64748B] gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
                <span className="text-sm font-medium">Memuat riwayat kunjungan...</span>
              </div>
            ) : visits.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-[#64748B]">
                <span className="text-sm font-medium">Belum ada riwayat kunjungan dicatat.</span>
              </div>
            ) : (
              mappedVisits.map((visit, index) => (
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
                        <h4 className="font-bold text-lg text-[#1E293B]">{visit.resolvedName || visit.name}</h4>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#64748B] mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {visit.datetime}
                        </div>
                      </div>
                      {/* Tags for Mobile / Desktop Right */}
                      <div className="flex items-center gap-2 shrink-0">
                        {visit.photoUrl && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold border border-[#E2E8F0]">
                            <Camera className="w-3.5 h-3.5" /> Foto
                          </div>
                        )}
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
                    
                    {visit.orderValue ? (
                      <div className="mt-auto self-start flex items-center gap-1.5 bg-[#F0FDF4] border border-[#BBF7D0] px-3 py-1.5 rounded-lg text-xs font-bold text-[#16A34A]">
                        <DollarSign className="w-3.5 h-3.5" />
                        Order Value: {typeof visit.orderValue === 'number' ? `Rp ${visit.orderValue.toLocaleString('id-ID')}` : visit.orderValue}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Modal Catat Kunjungan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] shrink-0">
              <h3 className="font-bold text-[#1E293B]">Catat Kunjungan Baru</h3>
              <button onClick={() => { setModalErrorMsg(''); setIsModalOpen(false); }} className="text-[#64748B] hover:text-[#1E293B]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-1">
              <form id="kunjungan-form" onSubmit={handleAddVisit} className="flex flex-col gap-4">
                
                {modalErrorMsg && (
                  <div className="w-full bg-[#FEE2E2] text-[#DC2626] text-xs font-semibold p-3 rounded-lg border border-[#FCA5A5] shrink-0">
                    {modalErrorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-2">Nama Bengkel <span className="text-[#EF4444]">*</span></label>
                  <select 
                    required
                    value={newVisit.id_pelanggan}
                    onChange={(e) => setNewVisit({...newVisit, id_pelanggan: e.target.value})}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] bg-white text-[#1E293B]"
                  >
                    <option value="">-- Pilih Bengkel / Pelanggan --</option>
                    {customers.map((c) => {
                      const idVal = c.id_pelanggan || c.id;
                      const nameVal = c.nama || c.name;
                      return (
                        <option key={idVal} value={idVal}>
                          {nameVal} ({c.city || c.alamat || c.kota || 'Banjarmasin'})
                        </option>
                      );
                    })}
                  </select>
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
                        onChange={(e) => {
                          const rawVal = e.target.value.replace(/[^0-9]/g, '');
                          const formattedVal = rawVal ? Number(rawVal).toLocaleString('id-ID') : '';
                          setNewVisit({...newVisit, orderValue: formattedVal});
                        }}
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
                onClick={() => { setModalErrorMsg(''); setIsModalOpen(false); }}
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
