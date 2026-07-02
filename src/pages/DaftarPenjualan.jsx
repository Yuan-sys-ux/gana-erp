import { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import * as XLSX from 'xlsx';
import { Search, FileText, CheckCircle2, Clock, XCircle, ChevronDown, Download, Eye, Check, X, AlertCircle } from 'lucide-react';
import { orderService } from '../services/orderService';

export default function DaftarPenjualan() {
  const [salesOrders, setSalesOrders] = useState([]);

  const loadOrders = () => {
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
          items: so.dataDetail || so.items || []
        }));
        setSalesOrders(mapped);
      })
      .catch(err => {
        console.error("Gagal load orders dari API:", err);
        setSalesOrders([]);
      });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  const filteredOrders = useMemo(() => {
    return salesOrders.filter(so => {
      const matchSearch = String(so.id).toLowerCase().includes(searchTerm.toLowerCase()) || 
                          so.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'Semua Status' || so.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [salesOrders, searchTerm, statusFilter]);

  const [approveModal, setApproveModal] = useState({ isOpen: false, orderId: null });
  const [detailModal, setDetailModal] = useState({ isOpen: false, order: null });

  const confirmApproveOrder = (id) => {
    setApproveModal({ isOpen: true, orderId: id });
  };

  const handleApprove = () => {
    if (approveModal.orderId) {
      orderService.update(approveModal.orderId, { status: 'Approved' })
        .then(() => {
          loadOrders();
          setApproveModal({ isOpen: false, orderId: null });
        })
        .catch((err) => {
          console.error("Gagal menyetujui pesanan:", err);
          alert("Gagal menyetujui pesanan di database.");
          setApproveModal({ isOpen: false, orderId: null });
        });
    }
  };

  const showDetail = (order) => {
    setDetailModal({ isOpen: true, order });
  };

  const handleExportExcel = () => {
    if (filteredOrders.length === 0) return alert("Tidak ada data untuk dieksport");
    
    const worksheetData = filteredOrders.map(row => ({
      "NO SO": row.id,
      "TANGGAL": row.date,
      "PELANGGAN": row.customer,
      "SALES": row.sales,
      "TOTAL": row.total,
      "STATUS": row.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Penjualan");

    XLSX.writeFile(workbook, `Data_Penjualan_${new Date().getTime()}.xlsx`);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Draft': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#F1F5F9] text-[#64748B] flex items-center gap-1 w-max"><Clock className="w-3 h-3" /> Draft</span>;
      case 'Approved': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706] flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3" /> Disetujui</span>;
      case 'Shipped': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#E0E7FF] text-[#4F46E5] flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3" /> Dikirim</span>;
      case 'Delivered':
      case 'Invoiced': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A] flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3" /> Terkirim</span>;
      case 'Cancelled': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] flex items-center gap-1 w-max"><XCircle className="w-3 h-3" /> Dibatalkan</span>;
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
          <button 
            onClick={handleExportExcel}
            className="bg-[#16A34A] border border-[#16A34A] text-white hover:bg-[#15803D] px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Ekspor Excel
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white flex-1 sm:w-[150px]"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Draft">Draft</option>
              <option value="Approved">Disetujui</option>
              <option value="Shipped">Dikirim</option>
              <option value="Invoiced">Terkirim</option>
              <option value="Cancelled">Dibatalkan</option>
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
                {filteredOrders.length > 0 ? filteredOrders.map((so, idx) => (
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
                      <div className="flex justify-center gap-2">
                        {so.status === 'Draft' && (
                          <button 
                            onClick={() => confirmApproveOrder(so.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors text-xs font-semibold"
                          >
                            <Check className="w-3.5 h-3.5" /> Setujui
                          </button>
                        )}
                        <button 
                          onClick={() => showDetail(so)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9] transition-colors text-xs font-semibold"
                        >
                          <Eye className="w-4 h-4" /> Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-[#64748B]">Tidak ada data penjualan yang sesuai.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Approve Modal */}
      {approveModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#EEF2FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] mb-2">Setujui Pesanan?</h3>
            <p className="text-sm text-[#64748B] mb-6">
              Apakah Anda yakin ingin memverifikasi dan menyetujui pesanan ini? Pesanan akan diteruskan ke Kepala Gudang.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setApproveModal({ isOpen: false, orderId: null })} className="flex-1 py-2.5 bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] font-semibold rounded-xl transition-colors">
                Batal
              </button>
              <button onClick={handleApprove} className="flex-1 py-2.5 bg-[#4F46E5] text-white hover:bg-[#4338CA] font-semibold rounded-xl transition-colors shadow-sm">
                Ya, Setujui
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailModal.isOpen && detailModal.order && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <h3 className="font-bold text-[#1E293B]">Detail Pesanan</h3>
              <button onClick={() => setDetailModal({ isOpen: false, order: null })} className="text-[#64748B] hover:text-[#1E293B]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-[#64748B] font-bold mb-1">NO. SALES ORDER</p>
                  <p className="text-sm font-bold text-[#4F46E5]">{detailModal.order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#64748B] font-bold mb-1">TANGGAL</p>
                  <p className="text-sm font-bold text-[#1E293B]">{detailModal.order.date}</p>
                </div>
              </div>
              <div className="border-t border-dashed border-[#E2E8F0]"></div>
              <div>
                <p className="text-xs text-[#64748B] font-bold mb-1">PELANGGAN</p>
                <p className="text-sm font-bold text-[#1E293B]">{detailModal.order.customer}</p>
                <p className="text-xs text-[#475569] mt-0.5">{detailModal.order.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#64748B] font-bold mb-1">SALES</p>
                  <p className="text-sm font-medium text-[#1E293B]">{detailModal.order.sales}</p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] font-bold mb-1">METODE PEMBAYARAN</p>
                  <p className="text-sm font-medium text-[#1E293B] capitalize">{detailModal.order.paymentMethod === 'cash' || detailModal.order.paymentMethod === 'Cash' ? 'Tunai' : detailModal.order.paymentMethod === 'tempo' || detailModal.order.paymentMethod === 'Tempo' ? 'Tempo' : detailModal.order.paymentMethod}</p>
                </div>
              </div>
              <div className="border-t border-dashed border-[#E2E8F0]"></div>
              <div className="flex justify-between items-center bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                <span className="text-sm font-bold text-[#64748B]">Total Belanja ({detailModal.order.qty || 0} Item)</span>
                <span className="text-lg font-bold text-[#16A34A]">Rp {detailModal.order.total?.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div className="p-5 border-t border-[#E2E8F0] flex justify-end">
              <button onClick={() => setDetailModal({ isOpen: false, order: null })} className="px-5 py-2.5 bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] font-semibold rounded-xl transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
