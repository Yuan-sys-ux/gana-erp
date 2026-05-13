import { useState, useMemo } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

export default function InputPesanan() {
  const allProducts = [
    { id: 1, brand: 'Kixx', name: 'Kixx G1 5W-30', variant: '5W-30', size: '4L', price: 400000, priceFormatted: 'Rp 400.000', stock: 120, headerColor: 'bg-[#EF4444]' },
    { id: 2, brand: 'Kixx', name: 'Kixx G1 10W-40', variant: '10W-40', size: '4L', price: 380000, priceFormatted: 'Rp 380.000', stock: 95, headerColor: 'bg-[#EF4444]' },
    { id: 3, brand: 'Petronas', name: 'Syntium 5000 10W-40', variant: '10W-40', size: '4L', price: 420000, priceFormatted: 'Rp 420.000', stock: 150, headerColor: 'bg-[#22C55E]' },
    { id: 4, brand: 'Petronas', name: 'Syntium 7000 0W-20', variant: '0W-20', size: '4L', price: 520000, priceFormatted: 'Rp 520.000', stock: 80, headerColor: 'bg-[#22C55E]' },
    { id: 5, brand: 'Kixx', name: 'Kixx HD1 15W-40', variant: '15W-40', size: '5L', price: 270000, priceFormatted: 'Rp 270.000', stock: 200, headerColor: 'bg-[#EF4444]' },
    { id: 6, brand: 'Petronas', name: 'Urania 3000 15W-40', variant: '15W-40', size: '5L', price: 290000, priceFormatted: 'Rp 290.000', stock: 110, headerColor: 'bg-[#22C55E]' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [cart, setCart] = useState([]);
  const [selectedBengkel, setSelectedBengkel] = useState('');

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchBrand = activeFilter === 'Semua' || p.brand === activeFilter;
      return matchSearch && matchBrand;
    });
  }, [searchTerm, activeFilter]);

  // Cart Functions
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  const handleCheckout = () => {
    if (!selectedBengkel || selectedBengkel === '-- Pilih Bengkel --') {
      alert('Silakan pilih bengkel terlebih dahulu!');
      return;
    }
    if (cart.length === 0) {
      alert('Keranjang order masih kosong!');
      return;
    }
    alert(`Pesanan berhasil dibuat untuk ${selectedBengkel}!\nTotal: Rp ${cartTotal.toLocaleString('id-ID')}`);
    setCart([]);
    setSelectedBengkel('');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 relative">
        
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Quick Order Form</h2>
          <p className="text-sm text-[#64748B] mt-1">Input pesanan cepat untuk bengkel</p>
        </div>

        {/* Form Select Bengkel */}
        <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          <label className="block text-xs font-bold text-[#1E293B] mb-2">
            Pilih Bengkel <span className="text-[#EF4444]">*</span>
          </label>
          <select 
            value={selectedBengkel}
            onChange={(e) => setSelectedBengkel(e.target.value)}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
          >
            <option value="">-- Pilih Bengkel --</option>
            <option value="Berkah Sekawan Motor">Berkah Sekawan Motor</option>
            <option value="Jaya Motor">Jaya Motor</option>
            <option value="Mandiri Service">Mandiri Service</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start pb-10">
          
          {/* Left Column: Products */}
          <div className="flex-1 flex flex-col gap-4">
            
            {/* Search and Filters */}
            <div className="bg-white p-5 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] flex flex-col gap-4 sticky top-0 z-10">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input 
                  type="text" 
                  placeholder="Cari produk..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                />
              </div>
              <div className="flex items-center gap-2">
                {['Semua', 'Kixx', 'Petronas'].map(filter => (
                  <button 
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      activeFilter === filter 
                        ? 'bg-[#4F46E5] text-white' 
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col hover:border-[#CBD5E1] transition-colors">
                    <div className={`${p.headerColor} p-3`}>
                      <span className="text-white text-xs font-bold">{p.brand}</span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className="font-bold text-[#1E293B] mb-2">{p.name}</h4>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]">{p.variant}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]">{p.size}</span>
                      </div>
                      
                      <div className="mt-auto mb-4">
                        <h3 className="text-lg font-bold text-[#1E293B]">{p.priceFormatted}</h3>
                        <p className="text-[11px] text-[#64748B]">Stok: {p.stock} dus</p>
                      </div>

                      <button 
                        onClick={() => addToCart(p)}
                        className="w-full py-2.5 rounded-lg bg-[#F1F5F9] text-[#4F46E5] text-sm font-bold hover:bg-[#E0E7FF] transition-colors flex items-center justify-center gap-2"
                      >
                        + Tambah ke Order
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-[#64748B]">
                  Produk tidak ditemukan.
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Cart */}
          <div className="w-full lg:w-[360px] bg-white rounded-xl shadow-xl border border-[#E2E8F0] overflow-hidden sticky top-6 z-20">
            <div className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <h3 className="font-bold">Keranjang Order</h3>
              </div>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">{cart.length} item</span>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto">
              {cart.length > 0 ? (
                <div className="flex flex-col">
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 border-b border-[#E2E8F0] flex flex-col gap-3 hover:bg-[#F8FAFC]">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-[#1E293B] text-sm leading-tight">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-[#EF4444] hover:bg-[#FEE2E2] p-1 rounded transition-colors shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-[#F1F5F9] text-[#475569] flex items-center justify-center hover:bg-[#E2E8F0] transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-sm text-[#1E293B] w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full bg-[#F1F5F9] text-[#475569] flex items-center justify-center hover:bg-[#E2E8F0] transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-[#64748B] block mb-0.5">{item.priceFormatted} x {item.qty}</span>
                          <span className="font-bold text-[#1E293B] text-sm">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 flex flex-col items-center justify-center min-h-[300px]">
                  <ShoppingCart className="w-12 h-12 text-[#CBD5E1] mb-4" />
                  <p className="text-sm text-[#94A3B8] font-medium">Belum ada item</p>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-[#64748B]">Total Belanja</span>
                  <span className="text-lg font-bold text-[#16A34A]">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#16A34A] text-white rounded-lg font-bold hover:bg-[#15803D] transition-colors shadow-sm"
                >
                  Proses Order Sekarang
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
