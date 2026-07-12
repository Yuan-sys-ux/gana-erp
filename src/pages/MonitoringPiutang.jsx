import { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, AlertTriangle, CheckCircle2, Clock, DollarSign, FileSpreadsheet, Loader2, AlertCircle } from 'lucide-react';
import api from '../utils/api';
import * as mockDb from '../utils/mockDb';

export default function MonitoringPiutang() {
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [confirmingItem, setConfirmingItem] = useState(null);
  const [activeHighlightId, setActiveHighlightId] = useState(null);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const showAlert = (type, title, message) => {
    setAlertModal({ isOpen: true, type, title, message });
  };

  const closeAlert = () => {
    setAlertModal({ isOpen: false, type: 'success', title: '', message: '' });
  };

  const [piutangData, setPiutangData] = useState({
    stats: {
      totalPiutang: 0,
      overduePiutang: 0,
      countOverdue: 0,
      warningPiutang: 0
    },
    list: []
  });
  
  const fetchPiutang = () => {
    setIsLoading(true);
    api.get('/api/owner/monitoring-piutang')
      .then(res => {
        if (res.data && res.data.success) {
          setPiutangData({
            stats: res.data.stats,
            list: res.data.list
          });
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
        const localPiutang = mockDb.getPiutangDataLocal();
        setPiutangData({
          stats: localPiutang.stats,
          list: localPiutang.list
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setRole(localStorage.getItem('userRole') || 'admin');
    fetchPiutang();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const highlightId = params.get('highlight');
    if (highlightId && !isLoading) {
      setTimeout(() => {
        const element = document.getElementById(`row-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Trigger the highlight animation 850ms after scroll starts (once row is centered in view)
          setTimeout(() => {
            setActiveHighlightId(highlightId);
            // Auto-remove highlight class after the 3-second animation completes
            setTimeout(() => {
              setActiveHighlightId(null);
            }, 3200);
          }, 850);
        }
      }, 500);
    }
  }, [isLoading]);

  const filteredPiutang = useMemo(() => {
    return piutangData.list.filter(item => {
      const matchSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchStatus = true;
      if (filterStatus === 'Overdue') matchStatus = item.status === 'overdue';
      else if (filterStatus === 'Warning') matchStatus = item.status === 'warning';
      else if (filterStatus === 'Aman') matchStatus = item.status === 'safe';

      return matchSearch && matchStatus;
    });
  }, [piutangData.list, searchTerm, filterStatus]);

  const downloadExcel = () => {
    let csvContent = "\uFEFF"; // BOM for Excel on Windows to read UTF-8 properly
    csvContent += "Bengkel / Pelanggan;No Invoice;Nominal;Jatuh Tempo;Status\r\n";
    filteredPiutang.forEach(item => {
      let statusText = '';
      if (item.status === 'overdue') {
        statusText = `Telat ${item.days} Hari`;
      } else if (item.status === 'warning') {
        statusText = `Sisa ${item.days} Hari (Peringatan)`;
      } else {
        statusText = `Sisa ${item.days} Hari`;
      }
      const cleanCustomer = item.customer.replace(/;/g, ',');
      csvContent += `${cleanCustomer};${item.id};${item.amount};${item.dueDate};${statusText}\r\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_Piutang_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReminder = (type, customer) => {
    if (type === 'phone') {
      alert(`Membuka aplikasi Telepon/WhatsApp untuk menghubungi ${customer}...`);
    } else {
      alert(`Mengirim Email Reminder tagihan ke ${customer}...`);
    }
  };

  const handleConfirmPayment = (item) => {
    setConfirmingItem(item);
  };

  const handleConfirmPaymentSubmit = () => {
    if (!confirmingItem) return;
    
    const id = confirmingItem.dbId;
    
    // First try database API
    api.put(`/api/penjualan/${id}`, { statusBayar: 'Lunas' })
      .then(res => {
        showAlert('success', 'Pembayaran Lunas!', `Pembayaran invoice ${confirmingItem.id} berhasil dikonfirmasi lunas.`);
        fetchPiutang();
        setConfirmingItem(null);
      })
      .catch(err => {
        console.warn("Backend API offline. Melakukan update lokal di mockDb.");
        const customers = mockDb.getCustomers();
        const customerIndex = customers.findIndex(c => c.id === id);
        if (customerIndex !== -1) {
          customers[customerIndex].outstanding = 0;
          mockDb.saveCustomers(customers);
        }
        showAlert('success', 'Pembayaran Lunas! (Lokal)', `Pembayaran invoice ${confirmingItem.id} berhasil dikonfirmasi lunas di penyimpanan lokal.`);
        fetchPiutang();
        setConfirmingItem(null);
      });
  };

  return (
    <DashboardLayout>
      <style>{`
        @keyframes highlight-pulse {
          0% { 
            background-color: rgba(254, 243, 199, 0.95); 
            box-shadow: inset 0 0 0 2px #F59E0B;
          }
          100% { 
            background-color: transparent; 
            box-shadow: inset 0 0 0 0px transparent;
          }
        }
        .row-highlighted {
          animation: highlight-pulse 3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Monitoring Piutang</h2>
            <p className="text-sm text-[#64748B] mt-1">Pantau status pembayaran dan tagihan jatuh tempo</p>
          </div>
          <button 
            onClick={downloadExcel}
            className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Download Rekap (Excel)
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
            <p className="text-xs font-bold text-[#64748B]">Memuat data piutang...</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-[#2563EB]" />
                  </div>
                </div>
                <p className="text-sm font-bold text-[#64748B] mb-1">Total Piutang Berjalan</p>
                <h3 className="text-3xl font-black text-[#1E293B]">
                  Rp {piutangData.stats.totalPiutang.toLocaleString('id-ID')}
                </h3>
              </div>
              
              <div className="bg-[#FEF2F2] rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#FECACA]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[#DC2626] rounded-xl flex items-center justify-center shadow-inner">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm font-bold text-[#991B1B] mb-1">Jatuh Tempo (Overdue)</p>
                <h3 className="text-3xl font-black text-[#7F1D1D]">
                  Rp {piutangData.stats.overduePiutang.toLocaleString('id-ID')}
                </h3>
                <p className="text-xs font-semibold text-[#DC2626] mt-2">
                  Terdapat {piutangData.stats.countOverdue} tagihan menunggak
                </p>
              </div>

              <div className="bg-[#FFFBEB] rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#FDE68A]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[#F59E0B] rounded-xl flex items-center justify-center shadow-inner">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm font-bold text-[#92400E] mb-1">Peringatan (&lt; 7 Hari)</p>
                <h3 className="text-3xl font-black text-[#78350F]">
                  Rp {piutangData.stats.warningPiutang.toLocaleString('id-ID')}
                </h3>
                <p className="text-xs font-semibold text-[#D97706] mt-2">Segera ingatkan pelanggan</p>
              </div>
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
                  placeholder="Cari nama bengkel atau no invoice..." 
                  className="w-full pl-10 pr-4 py-2.5 border-none rounded-lg text-sm focus:outline-none focus:ring-0 text-[#334155] placeholder:text-[#94A3B8] bg-transparent"
                />
              </div>
              <div className="w-px h-8 bg-[#E2E8F0] mx-2"></div>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white min-w-[150px] mr-2"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Overdue">Jatuh Tempo</option>
                <option value="Warning">Peringatan</option>
                <option value="Aman">Aman</option>
              </select>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0]">
                      <th className="py-4 px-6">BENGKEL / PELANGGAN</th>
                      <th className="py-4 px-6">NO INVOICE</th>
                      <th className="py-4 px-6">NOMINAL</th>
                      <th className="py-4 px-6">JATUH TEMPO</th>
                      <th className="py-4 px-6">STATUS</th>
                      <th className="py-4 px-6 text-center">AKSI</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredPiutang.length > 0 ? filteredPiutang.map((item, idx) => {
                      const isHighlighted = activeHighlightId === item.id;

                      return (
                        <tr 
                          key={idx} 
                          id={`row-${item.id}`}
                          className={`border-b border-[#E2E8F0] hover:bg-gray-50/50 transition-all duration-300 ${isHighlighted ? 'row-highlighted bg-amber-50/60' : ''}`}
                        >
                          <td className="py-4 px-6">
                            <p className="font-bold text-[#1E293B]">{item.customer}</p>
                            <p className="text-xs text-[#64748B]">{item.city}</p>
                          </td>
                          <td className="py-4 px-6 text-[#4F46E5] font-semibold text-xs">
                            {item.id}
                          </td>
                          <td className="py-4 px-6 font-bold text-[#1E293B]">
                            Rp {item.amount.toLocaleString('id-ID')}
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-semibold text-[#334155]">{item.dueDate}</p>
                          </td>
                          <td className="py-4 px-6">
                            {item.status === 'overdue' && (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626]">
                                <AlertTriangle className="w-3 h-3" />
                                <span className="text-[10px] font-bold">Telat {item.days} Hari</span>
                              </div>
                            )}
                            {item.status === 'warning' && (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706]">
                                <Clock className="w-3 h-3" />
                                <span className="text-[10px] font-bold">Sisa {item.days} Hari</span>
                              </div>
                            )}
                            {item.status === 'safe' && (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A]">
                                <CheckCircle2 className="w-3 h-3" />
                                <span className="text-[10px] font-bold">Sisa {item.days} Hari</span>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleConfirmPayment(item)}
                              className="bg-[#10B981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 mx-auto"
                              title="Konfirmasi Lunas"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Konfirmasi Lunas</span>
                            </button>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-[#64748B]">Tidak ada data piutang yang sesuai.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Modal Konfirmasi Pembayaran Lunas */}
      {confirmingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-[#10B981]" />
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] mb-2">Konfirmasi Pembayaran Lunas?</h3>
            <p className="text-sm text-[#64748B] mb-6">
              Apakah Anda yakin ingin menandai invoice <span className="font-bold text-[#1E293B]">{confirmingItem.id}</span> untuk pelanggan <span className="font-bold text-[#1E293B]">{confirmingItem.customer}</span> sebesar <span className="font-bold text-[#10B981]">Rp {confirmingItem.amount.toLocaleString('id-ID')}</span> sebagai <span className="font-bold text-[#10B981]">Lunas</span>?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmingItem(null)} 
                className="flex-1 py-2.5 bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmPaymentSubmit} 
                className="flex-1 py-2.5 bg-[#10B981] text-white hover:bg-[#059669] font-semibold rounded-xl transition-colors shadow-sm"
              >
                Ya, Konfirmasi Lunas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {alertModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={`p-6 text-center ${alertModal.type === 'success' ? 'bg-[#F0FDF4]' : 'bg-[#FEE2E2]'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${alertModal.type === 'success' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FECACA] text-[#DC2626]'}`}>
                {alertModal.type === 'success' ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">{alertModal.title}</h3>
              <p className="text-sm text-[#475569]">{alertModal.message}</p>
            </div>
            <div className="p-4 bg-white border-t border-[#E2E8F0]">
              <button 
                onClick={closeAlert}
                className={`w-full py-2.5 rounded-xl font-bold text-white transition-colors shadow-sm ${alertModal.type === 'success' ? 'bg-[#16A34A] hover:bg-[#15803D]' : 'bg-[#DC2626] hover:bg-[#B91C1C]'}`}
              >
                OK, Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
