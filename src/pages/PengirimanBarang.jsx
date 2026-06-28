import DashboardLayout from '../layouts/DashboardLayout';
import { Truck, PackageOpen, CheckCircle2, MapPin, Search, Plus, X, AlertCircle, Printer } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { getOrders, updateOrderStatus } from '../utils/mockDb';
import { useLocation } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';

export default function PengirimanBarang() {
  const [deliveries, setDeliveries] = useState({ diproses: [], dikirim: [], terkirim: [] });
  const location = useLocation();
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');

  // Custom Alert State
  const [alert, setAlert] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  // Product master and printing states
  const [products, setProducts] = useState([]);
  const [activePrintOrder, setActivePrintOrder] = useState(null);

  const loadDeliveries = () => {
    orderService.getAll()
      .then(res => {
        const data = Array.isArray(res) ? res : (res?.data || res?.orders || []);
        const mapped = data.map(so => ({
          id: so.id,
          date: so.tgl_penjualan || (so.created_at ? new Date(so.created_at).toLocaleDateString('id-ID') : '-'),
          customer: so.pelanggan?.nama || so.pelanggan?.name || so.customer || '-',
          address: so.pelanggan?.alamat || so.address || '-',
          sales: so.user?.nama || so.user?.name || so.sales || 'Sales System',
          total: Number(so.total_netto) || Number(so.total) || 0,
          status: so.status || 'Draft',
          qty: Number(so.qty) || (so.dataDetail ? so.dataDetail.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0) : 0),
          paymentMethod: so.metode_bayar || so.paymentMethod || 'cash',
          items: so.dataDetail || so.items || [],
          driver: so.driver || '',
          time: so.time || '',
          updated_at: so.updated_at || so.created_at || ''
        }));
        setDeliveries({
          diproses: mapped.filter(o => o.status === 'Approved'),
          dikirim: mapped.filter(o => o.status === 'Shipped'),
          terkirim: mapped.filter(o => {
            if (o.status !== 'Delivered' && o.status !== 'Invoiced') return false;
            if (!o.updated_at) return true;
            const deliveryTime = new Date(o.updated_at).getTime();
            const now = Date.now();
            return (now - deliveryTime) < 24 * 60 * 60 * 1000;
          })
        });
      })
      .catch(err => {
        console.error("Gagal load deliveries dari API, load lokal:", err);
        const orders = getOrders();
        setDeliveries({
          diproses: orders.filter(o => o.status === 'Approved'),
          dikirim: orders.filter(o => o.status === 'Shipped'),
          terkirim: orders.filter(o => o.status === 'Delivered' || o.status === 'Invoiced')
        });
      });
  };

  useEffect(() => {
    loadDeliveries();
    
    productService.getAll()
      .then(res => {
        const list = Array.isArray(res) ? res : (res?.data || res?.products || res?.produk || []);
        setProducts(list);
      })
      .catch(err => console.error("Gagal load produk untuk surat jalan:", err));
    
    // Auto-open modal if specified in query params
    const queryParams = new URLSearchParams(location.search);
    const openModalOrderId = queryParams.get('openModal');
    if (openModalOrderId) {
      setTimeout(() => {
        handleOpenModal(openModalOrderId);
      }, 100);
    }
  }, [location.search]);

  const [searchTerm, setSearchTerm] = useState('');

  const filterBySearch = (arr) => arr.filter(item => 
    String(item.id).toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [visibleSlots, setVisibleSlots] = useState([null, null, null, null, null, null]);

  const filteredDiproses = useMemo(() => {
    return filterBySearch(deliveries.diproses);
  }, [deliveries.diproses, searchTerm]);

  useEffect(() => {
    const diprosesList = filteredDiproses;
    
    setVisibleSlots(prevSlots => {
      // 1. Clean up slots: set to null if the item is no longer in diprosesList
      let newSlots = prevSlots.map(slot => 
        slot && diprosesList.some(item => item.id === slot.id) 
          ? diprosesList.find(item => item.id === slot.id) 
          : null
      );

      const isInitial = prevSlots.every(s => s === null);

      // 2. Find candidates: items in diprosesList that are not in newSlots
      let candidates = diprosesList.filter(item => 
        !newSlots.some(slot => slot && slot.id === item.id)
      );

      if (isInitial) {
        // Initial load: fill from the front
        for (let i = 0; i < 6; i++) {
          if (candidates.length > 0) {
            newSlots[i] = candidates.shift();
          }
        }
      } else {
        // Not initial load: fill empty slots by popping from the back of candidates
        for (let i = 0; i < 6; i++) {
          if (newSlots[i] === null && candidates.length > 0) {
            newSlots[i] = candidates.pop();
          }
        }
      }

      return newSlots;
    });
  }, [filteredDiproses]);

  const activeVisibleItems = useMemo(() => {
    return visibleSlots.filter(Boolean);
  }, [visibleSlots]);

  const excessCount = useMemo(() => {
    return Math.max(0, filteredDiproses.length - activeVisibleItems.length);
  }, [filteredDiproses, activeVisibleItems]);

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
    
    // Determine if mock ID or real DB ID
    const isMockId = isNaN(Number(selectedOrderId));
    const apiUpdate = isMockId
      ? Promise.reject("Mock ID")
      : orderService.update(selectedOrderId, { status: 'Shipped', driver: fullDriverInfo });

    apiUpdate
      .then(() => {
        loadDeliveries();
        showAlert(
          'success',
          'Surat Jalan Dibuat!',
          `Surat Jalan untuk Pesanan ${selectedOrderId} berhasil dibuat. Armada pengiriman dialokasikan ke ${fullDriverInfo}.`
        );
        handleCloseModal();
      })
      .catch(() => {
        updateOrderStatus(selectedOrderId, 'Shipped', { driver: fullDriverInfo });
        loadDeliveries();
        showAlert(
          'success',
          'Surat Jalan Dibuat!',
          `Surat Jalan untuk Pesanan ${selectedOrderId} berhasil dibuat. Armada pengiriman dialokasikan ke ${fullDriverInfo}.`
        );
        handleCloseModal();
      });
  };

  const handleSelesaikanPengiriman = (id) => {
    const item = deliveries.dikirim.find(d => String(d.id) === String(id));
    if (!item) return;
    
    const d = new Date();
    const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA';

    const isMockId = isNaN(Number(id));
    const apiUpdate = isMockId
      ? Promise.reject("Mock ID")
      : orderService.update(id, { status: 'Delivered', time: timeStr });

    apiUpdate
      .then(() => {
        loadDeliveries();
        showAlert(
          'success',
          'Pengiriman Selesai!',
          `Pesanan ${id} telah berhasil diterima oleh pelanggan pada pukul ${timeStr}.`
        );
      })
      .catch(() => {
        updateOrderStatus(id, 'Delivered', { time: timeStr });
        loadDeliveries();
        showAlert(
          'success',
          'Pengiriman Selesai!',
          `Pesanan ${id} telah berhasil diterima oleh pelanggan pada pukul ${timeStr}.`
        );
      });
  };

  // Get details of selected order for preview in modal
  const selectedOrderPreview = useMemo(() => {
    if (!selectedOrderId) return null;
    return deliveries.diproses.find(o => o.id === selectedOrderId);
  }, [selectedOrderId, deliveries.diproses]);

  const handlePrint = (order) => {
    setActivePrintOrder(order);
    setTimeout(() => {
      window.print();
    }, 150);
  };

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

        {/* Section: Sedang Diproses */}
        <div className="flex flex-col gap-4 bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-2xl shadow-sm mb-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2">
              <PackageOpen className="w-5 h-5 text-[#64748B]" />
              <h3 className="font-bold text-[#1E293B] text-base">Sedang Diproses</h3>
              <span className="bg-[#E2E8F0] text-[#475569] text-xs font-bold px-2 py-1 rounded-full">{deliveries.diproses.length}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              {activeVisibleItems.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#94A3B8]"></div>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-1 rounded">{item.id}</span>
                      <span className="text-[11px] font-bold text-[#64748B]">{item.qty} Dus</span>
                    </div>
                    <h4 className="font-bold text-[#1E293B] mb-2">{item.customer}</h4>
                    <div className="flex items-start gap-1.5 text-[#64748B]">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <p className="text-xs leading-relaxed">{item.address}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleOpenModal(item.id)}
                    className="mt-4 w-full py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-xs font-bold rounded-lg transition-colors"
                  >
                    Approve & Kirim
                  </button>
                </div>
              ))}
              {activeVisibleItems.length === 0 && (
                <div className="col-span-3 text-center py-8">
                  <p className="text-xs text-[#94A3B8]">Tidak ada pengiriman dalam proses.</p>
                </div>
              )}
            </div>

            {excessCount > 0 && (
              <div 
                className="w-12 h-12 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm animate-pulse cursor-pointer hover:bg-[#E0E7FF] transition-all"
                title={`${excessCount} pesanan lainnya sedang antre`}
              >
                +{excessCount}
              </div>
            )}
          </div>
        </div>

        {/* Section: Status Pengiriman (Bottom Board) */}
        <div className="flex flex-col gap-6 pb-8">
          
          {/* Section: Sedang Dikirim */}
          <div className="flex flex-col gap-4 bg-[#EEF2FF] border border-[#C7D2FE] p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between border-b border-[#C7D2FE] pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#4F46E5]" />
                <h3 className="font-bold text-[#1E40AF] text-base">Sedang Dikirim</h3>
                <span className="bg-[#C7D2FE] text-[#1E40AF] text-xs font-bold px-2 py-1 rounded-full">{deliveries.dikirim.length}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {filterBySearch(deliveries.dikirim).map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-md border border-[#C7D2FE] relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#4F46E5]"></div>
                  <div>
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
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => handleSelesaikanPengiriman(item.id)}
                      className="flex-1 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Selesaikan
                    </button>
                    <button 
                      onClick={() => handlePrint(item)}
                      className="px-3 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#1E293B] rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs font-bold"
                      title="Cetak Surat Jalan"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Cetak SJ
                    </button>
                  </div>
                </div>
              ))}
              {filterBySearch(deliveries.dikirim).length === 0 && (
                <div className="col-span-3 text-center py-8">
                  <p className="text-xs text-[#94A3B8]">Tidak ada armada pengiriman aktif.</p>
                </div>
              )}
            </div>
          </div>

          {/* Section: Terkirim */}
          <div className="flex flex-col gap-4 bg-[#F0FDF4] border border-[#BBF7D0] p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between border-b border-[#BBF7D0] pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                <h3 className="font-bold text-[#166534] text-base">Terkirim Hari Ini</h3>
                <span className="bg-[#BBF7D0] text-[#166534] text-xs font-bold px-2 py-1 rounded-full">{deliveries.terkirim.length}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {filterBySearch(deliveries.terkirim).map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-[#E2E8F0] relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#16A34A]"></div>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-1 rounded">{item.id}</span>
                      <span className="text-[11px] font-bold text-[#64748B]">{item.time}</span>
                    </div>
                    <h4 className="font-bold text-[#1E293B] mb-2 line-through decoration-[#94A3B8]">{item.customer}</h4>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#E2E8F0]">
                    <span className="text-xs text-[#64748B] font-semibold">{item.qty} Dus</span>
                    <button 
                      onClick={() => handlePrint(item)}
                      className="px-2.5 py-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#1E293B] rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold font-sans"
                    >
                      <Printer className="w-3 h-3" /> Cetak SJ
                    </button>
                  </div>
                </div>
              ))}
              {filterBySearch(deliveries.terkirim).length === 0 && (
                <div className="col-span-3 text-center py-8">
                  <p className="text-xs text-[#94A3B8]">Belum ada pengiriman diselesaikan hari ini.</p>
                </div>
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
      {/* Printable Surat Jalan Layout (Only visible during print) */}
      {activePrintOrder && (
        <div id="printable-surat-jalan" className="hidden print:block font-mono text-black p-8 bg-white animate-fade-in" style={{ fontSize: '12px', lineHeight: '1.4' }}>
          <style>{`
            @media print {
              body * {
                visibility: hidden !important;
              }
              #printable-surat-jalan, #printable-surat-jalan * {
                visibility: visible !important;
              }
              #printable-surat-jalan {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                display: block !important;
                background: white !important;
                color: black !important;
              }
            }
          `}</style>
          
          {/* Company Brand Header */}
          <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-4">
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wider">CV. GANA</h1>
              <p className="text-xs">Distributor Pelumas & Suku Cadang</p>
              <p className="text-xs">Banjarmasin, Kalimantan Selatan</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold uppercase">SURAT JALAN</h2>
              <p className="text-xs font-bold">No. DO: {activePrintOrder.id}</p>
              <p className="text-xs">Tanggal: {activePrintOrder.date}</p>
            </div>
          </div>

          {/* Customer & Delivery metadata */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase font-sans">Kepada Yth:</p>
              <p className="text-sm font-bold font-sans">{activePrintOrder.customer}</p>
              <p className="text-xs whitespace-pre-wrap max-w-xs font-sans mt-1">{activePrintOrder.address}</p>
            </div>
            <div className="flex flex-col gap-1 text-right font-sans">
              <p className="text-xs"><span className="font-semibold">Sales Rep:</span> {activePrintOrder.sales}</p>
              <p className="text-xs"><span className="font-semibold">Armada/Driver:</span> {activePrintOrder.driver || '-'}</p>
              <p className="text-xs"><span className="font-semibold">Metode Bayar:</span> <span className="uppercase">{activePrintOrder.paymentMethod || 'Cash'}</span></p>
            </div>
          </div>

          {/* Products table */}
          <table className="w-full text-left border-collapse border-y border-black mb-8 font-sans">
            <thead>
              <tr className="border-b border-black text-xs font-bold uppercase">
                <th className="py-2 px-1 w-10 text-center">NO</th>
                <th className="py-2 px-2">DESKRIPSI PRODUK</th>
                <th className="py-2 px-2 w-24 text-center">QUANTITY</th>
                <th className="py-2 px-2 w-32 text-center">KETERANGAN</th>
              </tr>
            </thead>
            <tbody>
              {activePrintOrder.items && activePrintOrder.items.length > 0 ? (
                activePrintOrder.items.map((item, idx) => {
                  const prod = products.find(p => String(p.id || p.id_produk) === String(item.produk_id || item.id));
                  const brand = prod?.brand || '';
                  const name = prod ? (prod.name || prod.nama) : (item.name || item.nama || `Produk ID: ${item.produk_id}`);
                  const sae = prod?.sae || '';
                  const kemasan = prod?.kemasan || '';
                  
                  const desc = brand ? `${brand} - ${name} (${sae}, ${kemasan})` : name;

                  return (
                    <tr key={idx} className="border-b border-gray-200 text-xs">
                      <td className="py-2 px-1 text-center">{idx + 1}</td>
                      <td className="py-2 px-2 font-semibold">{desc}</td>
                      <td className="py-2 px-2 text-center font-bold">{item.qty} Dus</td>
                      <td className="py-2 px-2 text-center">-</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500 italic">Tidak ada detail produk.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Signature Boxes */}
          <div className="grid grid-cols-3 gap-4 text-center mt-12 pt-8 font-sans">
            <div className="flex flex-col justify-between h-24">
              <p className="text-xs font-semibold">Tanda Terima / Penerima,</p>
              <p className="text-xs">( ____________________ )</p>
            </div>
            <div className="flex flex-col justify-between h-24">
              <p className="text-xs font-semibold">Sopir / Pengirim,</p>
              <p className="text-xs">( ____________________ )</p>
            </div>
            <div className="flex flex-col justify-between h-24">
              <p className="text-xs font-semibold">Kepala Gudang,</p>
              <p className="text-xs">( ____________________ )</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
