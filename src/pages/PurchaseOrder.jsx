import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Plus, Eye, X, CheckCircle2, Clock, Package, Truck, Trash2, ShoppingBag } from 'lucide-react';
import { getPurchaseOrders, addPurchaseOrder, updatePurchaseOrderStatus } from '../utils/mockDb';

const SUPPLIERS = ['PT. PLI (Petronas)', 'PT. ABM (Kixx)'];
const PRODUCTS = {
  'PT. PLI (Petronas)': ['Syntium 5000 10W-40', 'Syntium 7000 0W-20', 'Urania 3000 15W-40', 'Sprinta F700 10W-40'],
  'PT. ABM (Kixx)': ['Kixx G1 5W-30', 'Kixx G1 10W-40', 'Kixx HD1 15W-40', 'Kixx PAO 5W-30'],
};

export default function PurchaseOrder() {
  const [orders, setOrders] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, poId: null });

  // Form state
  const [supplier, setSupplier] = useState(SUPPLIERS[0]);
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState([{ name: PRODUCTS[SUPPLIERS[0]][0], qty: 1, uom: 'Karton' }]);

  const load = () => setOrders(getPurchaseOrders());
  useEffect(() => { load(); }, []);

  const addItem = () => {
    setItems([...items, { name: PRODUCTS[supplier][0], qty: 1, uom: 'Karton' }]);
  };

  const removeItem = (idx) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx, field, value) => {
    setItems(items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const handleSupplierChange = (s) => {
    setSupplier(s);
    setItems([{ name: PRODUCTS[s][0], qty: 1, uom: 'Karton' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalQty = items.reduce((a, b) => a + Number(b.qty), 0);
    addPurchaseOrder({ supplier, items, totalQty, notes });
    load();
    setIsCreateOpen(false);
    setNotes('');
    setSupplier(SUPPLIERS[0]);
    setItems([{ name: PRODUCTS[SUPPLIERS[0]][0], qty: 1, uom: 'Karton' }]);
  };

  const handleConfirmReceive = () => {
    if (confirmModal.poId) {
      updatePurchaseOrderStatus(confirmModal.poId, 'Diterima');
      load();
      setConfirmModal({ isOpen: false, poId: null });
      if (detailOrder?.id === confirmModal.poId) setDetailOrder(null);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Diterima') return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">
        <CheckCircle2 className="w-3.5 h-3.5" /> Diterima
      </span>
    );
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#D97706]">
        <Clock className="w-3.5 h-3.5" /> Menunggu
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Purchase Order</h1>
            <p className="text-sm text-[#64748B] mt-1">Kelola pesanan pembelian barang dari supplier</p>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Buat PO Baru
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-sm">
            <p className="text-xs text-[#64748B] font-semibold">Total PO</p>
            <p className="text-3xl font-black text-[#1E293B] mt-1">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-sm">
            <p className="text-xs text-[#64748B] font-semibold">Menunggu</p>
            <p className="text-3xl font-black text-[#D97706] mt-1">{orders.filter(o => o.status === 'Menunggu').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-sm col-span-2 md:col-span-1">
            <p className="text-xs text-[#64748B] font-semibold">Diterima</p>
            <p className="text-3xl font-black text-[#16A34A] mt-1">{orders.filter(o => o.status === 'Diterima').length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#4F46E5]" />
            <h2 className="font-bold text-[#1E293B]">Daftar Purchase Order</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider border-b border-[#E2E8F0]">
                  <th className="py-3 px-5">No. PO</th>
                  <th className="py-3 px-5">Tanggal</th>
                  <th className="py-3 px-5">Supplier</th>
                  <th className="py-3 px-5 text-center">Total Item</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-[#F1F5F9]">
                {orders.map(po => (
                  <tr key={po.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-5 font-bold text-[#4F46E5]">{po.id}</td>
                    <td className="py-3.5 px-5 text-[#475569]">{po.date}</td>
                    <td className="py-3.5 px-5 font-medium text-[#1E293B]">{po.supplier}</td>
                    <td className="py-3.5 px-5 text-center text-[#475569]">{po.totalQty} Karton</td>
                    <td className="py-3.5 px-5">{getStatusBadge(po.status)}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex justify-center gap-2">
                        {po.status === 'Menunggu' && (
                          <button
                            onClick={() => setConfirmModal({ isOpen: true, poId: po.id })}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            <Truck className="w-3.5 h-3.5" /> Tandai Diterima
                          </button>
                        )}
                        <button
                          onClick={() => setDetailOrder(po)}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan="6" className="py-16 text-center text-[#94A3B8]">Belum ada Purchase Order. Klik "Buat PO Baru" untuk memulai.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create PO Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-[#F8FAFC] shrink-0">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#4F46E5]" />
                <h2 className="font-bold text-[#1E293B]">Buat Purchase Order Baru</h2>
              </div>
              <button onClick={() => setIsCreateOpen(false)} className="text-[#64748B] hover:text-[#1E293B]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 overflow-y-auto">
              {/* Supplier */}
              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5">Supplier <span className="text-red-500">*</span></label>
                <select
                  value={supplier}
                  onChange={e => handleSupplierChange(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                >
                  {SUPPLIERS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#1E293B]">Daftar Produk <span className="text-red-500">*</span></label>
                  <button type="button" onClick={addItem} className="text-xs text-[#4F46E5] font-bold hover:underline flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Tambah Produk
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                      <select
                        value={item.name}
                        onChange={e => updateItem(idx, 'name', e.target.value)}
                        className="flex-1 border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-[#4F46E5]"
                      >
                        {PRODUCTS[supplier].map(p => <option key={p}>{p}</option>)}
                      </select>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={e => updateItem(idx, 'qty', e.target.value)}
                        className="w-20 border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-sm text-center bg-white focus:outline-none focus:border-[#4F46E5]"
                      />
                      <span className="text-xs text-[#64748B] font-medium">Karton</span>
                      <button type="button" onClick={() => removeItem(idx)} className="text-[#EF4444] hover:text-[#B91C1C] transition-colors ml-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5">Catatan (Opsional)</label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Contoh: Pemesanan rutin bulanan..."
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-[#EEF2FF] rounded-xl p-3 border border-[#C7D2FE]">
                <p className="text-xs text-[#4F46E5] font-bold">Ringkasan</p>
                <p className="text-sm text-[#3730A3] mt-0.5">
                  Total <span className="font-bold">{items.reduce((a, b) => a + Number(b.qty), 0)} Karton</span> dari{' '}
                  <span className="font-bold">{items.length} jenis produk</span>
                </p>
              </div>
            </form>

            <div className="p-5 border-t border-[#E2E8F0] flex gap-3 shrink-0">
              <button type="button" onClick={() => setIsCreateOpen(false)} className="flex-1 py-2.5 bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] font-semibold rounded-xl transition-colors">
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 bg-[#4F46E5] text-white hover:bg-[#4338CA] font-semibold rounded-xl transition-colors shadow-sm"
              >
                Kirim PO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Receive Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-[#16A34A]" />
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] mb-2">Tandai Barang Diterima?</h3>
            <p className="text-sm text-[#64748B] mb-6">
              Konfirmasi bahwa barang dari supplier sudah tiba dan diterima di gudang. Status PO akan berubah menjadi <strong>Diterima</strong>.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal({ isOpen: false, poId: null })} className="flex-1 py-2.5 bg-[#F1F5F9] text-[#475569] font-semibold rounded-xl hover:bg-[#E2E8F0] transition-colors">
                Batal
              </button>
              <button onClick={handleConfirmReceive} className="flex-1 py-2.5 bg-[#16A34A] text-white font-semibold rounded-xl hover:bg-[#15803D] transition-colors shadow-sm">
                Ya, Diterima
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <h3 className="font-bold text-[#1E293B]">Detail PO - {detailOrder.id}</h3>
              <button onClick={() => setDetailOrder(null)} className="text-[#64748B] hover:text-[#1E293B]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#94A3B8] font-bold mb-1">TANGGAL</p>
                  <p className="text-sm font-medium text-[#1E293B]">{detailOrder.date}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] font-bold mb-1">STATUS</p>
                  {getStatusBadge(detailOrder.status)}
                </div>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-bold mb-1">SUPPLIER</p>
                <p className="text-sm font-medium text-[#1E293B]">{detailOrder.supplier}</p>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-bold mb-2">PRODUK DIPESAN</p>
                <div className="flex flex-col gap-2">
                  {detailOrder.items?.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#F8FAFC] px-3 py-2 rounded-lg border border-[#E2E8F0]">
                      <span className="text-sm text-[#1E293B]">{item.name}</span>
                      <span className="text-sm font-bold text-[#4F46E5]">{item.qty} {item.uom}</span>
                    </div>
                  ))}
                </div>
              </div>
              {detailOrder.notes && (
                <div>
                  <p className="text-xs text-[#94A3B8] font-bold mb-1">CATATAN</p>
                  <p className="text-sm text-[#475569] bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">{detailOrder.notes}</p>
                </div>
              )}
            </div>
            <div className="p-5 border-t border-[#E2E8F0] flex justify-end gap-3">
              {detailOrder.status === 'Menunggu' && (
                <button
                  onClick={() => { setDetailOrder(null); setConfirmModal({ isOpen: true, poId: detailOrder.id }); }}
                  className="px-5 py-2 bg-[#16A34A] text-white hover:bg-[#15803D] font-semibold rounded-xl text-sm transition-colors"
                >
                  Tandai Diterima
                </button>
              )}
              <button onClick={() => setDetailOrder(null)} className="px-5 py-2 bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] font-semibold rounded-xl text-sm transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
