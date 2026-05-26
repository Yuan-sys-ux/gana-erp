import DashboardLayout from '../layouts/DashboardLayout';
import { PackagePlus, Save, Trash2, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { addIncomingStock } from '../utils/mockDb';

const PRODUCTS = [
  { id: 1, brand: 'Kixx', name: 'Kixx G1 5W-30' },
  { id: 2, brand: 'Kixx', name: 'Kixx G1 10W-40' },
  { id: 3, brand: 'Kixx', name: 'Kixx HD1 15W-40' },
  { id: 4, brand: 'Kixx', name: 'Kixx PAO 5W-40' },
  { id: 5, brand: 'Petronas', name: 'Syntium 5000 10W-40' },
  { id: 6, brand: 'Petronas', name: 'Syntium 7000 0W-20' },
  { id: 7, brand: 'Petronas', name: 'Urania 3000 15W-40' },
  { id: 8, brand: 'Petronas', name: 'Syntium 3000 5W-40' },
];

export default function InputStokMasuk() {
  const [sjNumber, setSjNumber] = useState('');
  const [supplier, setSupplier] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [qty, setQty] = useState('');
  const [uom, setUom] = useState('Karton');
  const [draftItems, setDraftItems] = useState([]);
  
  // Search text for filtering products dropdown
  const [searchProductTerm, setSearchProductTerm] = useState('');

  // Notification State
  const [alert, setAlert] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const showAlert = (type, title, message) => {
    setAlert({ isOpen: true, type, title, message });
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  // Filter products by brand and search term
  const availableProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Filter by supplier brand
      if (supplier === 'PT. PLI (Petronas)' && p.brand !== 'Petronas') return false;
      if (supplier === 'PT. ABM (Kixx)' && p.brand !== 'Kixx') return false;
      
      // Filter by search term
      return p.name.toLowerCase().includes(searchProductTerm.toLowerCase());
    });
  }, [supplier, searchProductTerm]);

  const handleAddToDraft = (e) => {
    e.preventDefault();
    
    if (!supplier || supplier === '-- Pilih Supplier --') {
      showAlert('error', 'Gagal', 'Silakan pilih Supplier terlebih dahulu.');
      return;
    }

    if (!selectedProductId) {
      showAlert('error', 'Gagal', 'Silakan pilih Produk.');
      return;
    }

    const parsedQty = parseInt(qty);
    if (isNaN(parsedQty) || parsedQty <= 0) {
      showAlert('error', 'Gagal', 'Jumlah Qty masuk harus lebih besar dari 0.');
      return;
    }

    const product = PRODUCTS.find(p => p.id === parseInt(selectedProductId));
    if (!product) return;

    // Check if product already exists in draft
    const existingIndex = draftItems.findIndex(item => item.name === product.name && item.uom === uom);
    if (existingIndex !== -1) {
      const updated = [...draftItems];
      updated[existingIndex].qty += parsedQty;
      setDraftItems(updated);
    } else {
      setDraftItems([...draftItems, {
        id: Date.now(),
        brand: product.brand,
        name: product.name,
        qty: parsedQty,
        uom: uom
      }]);
    }

    // Reset product selection inputs
    setSelectedProductId('');
    setQty('');
  };

  const handleDeleteDraftItem = (id) => {
    setDraftItems(draftItems.filter(item => item.id !== id));
  };

  const handleSubmitToKepalaGudang = () => {
    if (!sjNumber.trim()) {
      showAlert('error', 'Gagal', 'Silakan masukkan No. Surat Jalan / Invoice Supplier.');
      return;
    }

    if (!supplier || supplier === '-- Pilih Supplier --') {
      showAlert('error', 'Gagal', 'Silakan pilih Supplier.');
      return;
    }

    if (draftItems.length === 0) {
      showAlert('error', 'Gagal', 'Draft penerimaan masih kosong. Tambahkan minimal 1 produk.');
      return;
    }

    const totalQty = draftItems.reduce((acc, curr) => acc + curr.qty, 0);

    const receipt = {
      sj: sjNumber,
      supplier: supplier,
      items: draftItems.length,
      totalQty: totalQty,
      draftList: draftItems
    };

    addIncomingStock(receipt);

    showAlert(
      'success',
      'Berhasil Dikirim!',
      `Penerimaan barang dengan No. Surat Jalan "${sjNumber}" senilai total ${totalQty} Karton berhasil dikirim ke Kepala Gudang untuk disetujui.`
    );

    // Reset Form
    setDraftItems([]);
    setSjNumber('');
    setSupplier('');
    setSelectedProductId('');
    setQty('');
    setSearchProductTerm('');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans relative">
        
        {/* Alert Modal */}
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
            <h2 className="text-2xl font-bold text-[#1E293B]">Input Stok Masuk</h2>
            <p className="text-sm text-[#64748B] mt-1">Catat penerimaan barang dari supplier</p>
          </div>
          <button 
            onClick={handleSubmitToKepalaGudang}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-colors shadow-sm"
          >
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
            
            <form onSubmit={handleAddToDraft} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">No. Surat Jalan / Invoice Supplier</label>
                <input 
                  type="text" 
                  value={sjNumber}
                  onChange={e => setSjNumber(e.target.value)}
                  placeholder="e.g. SJ-2026-001 / INV-2026-001" 
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Supplier</label>
                <select 
                  value={supplier}
                  onChange={e => {
                    setSupplier(e.target.value);
                    setSelectedProductId(''); // Reset product when supplier changes
                  }}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]"
                  required
                >
                  <option value="">-- Pilih Supplier --</option>
                  <option value="PT. PLI (Petronas)">PT. PLI (Petronas)</option>
                  <option value="PT. ABM (Kixx)">PT. ABM (Kixx)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-sm font-semibold text-[#334155]">Cari & Pilih Produk</label>
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-[#94A3B8]" />
                  </div>
                  <input 
                    type="text" 
                    value={searchProductTerm}
                    onChange={e => setSearchProductTerm(e.target.value)}
                    placeholder="Saring nama produk..." 
                    className="w-full pl-9 pr-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" 
                  />
                </div>
                <select
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]"
                  required
                >
                  <option value="">-- Pilih Produk --</option>
                  {availableProducts.map(p => (
                    <option key={p.id} value={p.id}>[{p.brand}] {p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Qty Masuk</label>
                  <input 
                    type="number" 
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                    placeholder="0" 
                    min="1"
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Satuan</label>
                  <select 
                    value={uom}
                    onChange={e => setUom(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]"
                  >
                    <option value="Karton">Karton</option>
                    <option value="Drum">Drum</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-4 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#E2E8F0] text-[#1E293B] font-bold py-2.5 rounded-lg text-sm transition-colors"
              >
                + Tambah ke Draft
              </button>
            </form>
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
                    <tr key={item.id} className="border-b border-[#E2E8F0] hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${item.brand === 'Kixx' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#DCFCE7] text-[#16A34A]'}`}>
                          {item.brand}
                        </span>
                        <p className="font-bold text-[#1E293B]">{item.name}</p>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-[#1E293B]">{item.qty}</td>
                      <td className="py-4 px-6 text-center text-[#64748B]">{item.uom}</td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => handleDeleteDraftItem(item.id)}
                          className="text-[#EF4444] hover:text-[#B91C1C] transition-colors p-1.5 rounded-md hover:bg-[#FEE2E2]"
                        >
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
