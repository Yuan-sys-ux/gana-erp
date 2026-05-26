import DashboardLayout from '../layouts/DashboardLayout';
import { Truck, PackageOpen, CheckCircle2, MapPin, Search, Plus, X, AlertCircle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { getOrders, updateOrderStatus } from '../utils/mockDb';

export default function PengirimanBarang() {
  const [deliveries, setDeliveries] = useState({ diproses: [], dikirim: [], terkirim: [] });
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');

  // Custom Alert State
  const [alert, setAlert] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const loadDeliveries = () => {
    const orders = getOrders();
    setDeliveries({
      diproses: orders.filter(o => o.status === 'Approved'),
      dikirim: orders.filter(o => o.status === 'Shipped'),
      terkirim: orders.filter(o => o.status === 'Delivered' || o.status === 'Invoiced')
    });
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const filterBySearch = (arr) => arr.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showAlert = (type, title, message) => {
    setAlert({ isOpen: true, type, title, message });
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const handleOpenModal = (orderId = '') => {
    setSelectedOrderId(orderId);
    setDriverName('');
    setPlateNumber('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId('');
    setDriverName('');
    setPlateNumber('');
  };

  const handleCreateSuratJalan = (e) => {
    e.preventDefault();

    if (!selectedOrderId) {
      showAlert('error', 'Gagal', 'Silakan pilih pesanan terlebih dahulu.');
      return;
    }

    if (!driverName.trim()) {
      showAlert('error', 'Gagal', 'Silakan masukkan nama driver.');
      return;
    }

    if (!plateNumber.trim()) {
      showAlert('error', 'Gagal', 'Silakan masukkan plat nomor kendaraan.');
      return;
    }

    const fullDriverInfo = `${driverName.trim()} (${plateNumber.trim().toUpperCase()})`;
    
    updateOrderStatus(selectedOrderId, 'Shipped', { driver: fullDriverInfo });
    loadDeliveries();
    
    showAlert(
      'success',
      'Surat Jalan Dibuat!',
      `Surat Jalan untuk Pesanan ${selectedOrderId} berhasil dibuat. Armada pengiriman dialokasikan ke ${fullDriverInfo}.`
    );

    handleCloseModal();
  };

  const handleSelesaikanPengiriman = (id) => {
    const item = deliveries.dikirim.find(d => d.id === id);
    if (!item) return;
    
    const d = new Date();
    const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA';

    updateOrderStatus(id, 'Delivered', { time: timeStr });
    loadDeliveries();

    showAlert(
      'success',
      'Pengiriman Selesai!',
      `Pesanan ${id} telah berhasil diterima oleh pelanggan pada pukul ${timeStr}.`
    );
  };

  // Get details of selected order for preview in modal
  const selectedOrderPreview = useMemo(() => {
    if (!selectedOrderId) return null;
    return deliveries.diproses.find(o => o.id === selectedOrderId);
  }, [selectedOrderId, deliveries.diproses]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans relative">
        
        {/* Custom Alert Modal */}
        {alert.isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
              <div className={`p-6 text-center ${alert.type === 'success' ? 'bg-[#F0FDF4]' : 'bg-[#FEE2E2]'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${alert.type === 'success' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FECACA] text-[#DC2626]'}`}>
                  {alert.type === 'success' ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">{alert.title}</h3>
                <p className="text-sm text-[#475569]">{alert.message}</p>
              </div>
              <div className="p-4 bg-white border-t border-[#E2E8F0]">
                <button 
                  onClick={closeAlert}
                  className={`w-full py-2.5 rounded-xl font-bold text-white transition-colors shadow-sm ${alert.type === 'success' ? 'bg-[#16A34A] hover:bg-[#15803D]' : 'bg-[#DC2626] hover:bg-[#B91C1C]'}`}
                >
                  OK, Mengerti
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Pengiriman Barang</h2>
            <p className="text-sm text-[#64748B] mt-1">Pantau Surat Jalan (DO) dan status pengiriman armada</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-colors shadow-sm"
          >
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              {filterBySearch(deliveries.diproses).map((item, idx) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors relative overflow-hidden">
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
                  <button 
                    onClick={() => handleOpenModal(item.id)}
                    className="mt-4 w-full py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-xs font-bold rounded-lg transition-colors"
                  >
                    Approve & Kirim
                  </button>
                </div>
              ))}
              {filterBySearch(deliveries.diproses).length === 0 && (
                <p className="text-xs text-center py-6 text-[#94A3B8]">Tidak ada pengiriman dalam proses.</p>
              )}
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
              {filterBySearch(deliveries.dikirim).map((item, idx) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-md border border-[#C7D2FE] relative overflow-hidden">
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
                  <button 
                    onClick={() => handleSelesaikanPengiriman(item.id)}
                    className="w-full py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Selesaikan Pengiriman
                  </button>
                </div>
              ))}
              {filterBySearch(deliveries.dikirim).length === 0 && (
                <p className="text-xs text-center py-6 text-[#94A3B8]">Tidak ada armada pengiriman aktif.</p>
              )}
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
              {filterBySearch(deliveries.terkirim).map((item, idx) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-[#E2E8F0] relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
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
              {filterBySearch(deliveries.terkirim).length === 0 && (
                <p className="text-xs text-center py-6 text-[#94A3B8]">Belum ada pengiriman diselesaikan hari ini.</p>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Buat Surat Jalan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#4F46E5]" />
                <h2 className="text-lg font-bold text-[#1E293B]">
                  Buat Surat Jalan (Delivery Order)
                </h2>
              </div>
              <button onClick={handleCloseModal} className="text-[#94A3B8] hover:text-[#334155] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateSuratJalan} className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Pilih Pesanan Disetujui</label>
                <select 
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5] bg-white text-[#1E293B]"
                  value={selectedOrderId} 
                  onChange={e => setSelectedOrderId(e.target.value)}
                  required
                >
                  <option value="">-- Pilih Nomor Pesanan --</option>
                  {deliveries.diproses.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.id} - {o.customer} ({o.qty} Dus)
                    </option>
                  ))}
                </select>
              </div>

              {/* Order Preview inside Modal */}
              {selectedOrderPreview && (
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#64748B]">Pelanggan:</span>
                    <span className="font-bold text-[#1E293B]">{selectedOrderPreview.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#64748B]">Alamat Pengiriman:</span>
                    <span className="font-bold text-[#1E293B] max-w-[250px] text-right truncate">{selectedOrderPreview.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#64748B]">Total Kuantitas:</span>
                    <span className="font-bold text-[#4F46E5]">{selectedOrderPreview.qty} Dus</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Nama Driver</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Pak Supri"
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" 
                    value={driverName} 
                    onChange={e => setDriverName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Plat Nomor</label>
                  <input 
                    type="text" 
                    placeholder="e.g. DA 1234 XX"
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" 
                    value={plateNumber} 
                    onChange={e => setPlateNumber(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#E2E8F0]">
                <button 
                  type="button" 
                  onClick={handleCloseModal} 
                  className="px-5 py-2.5 text-sm font-semibold text-[#475569] hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition-colors flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  Simpan & Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
