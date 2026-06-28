import { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, ShoppingCart, Plus, Minus, Trash2, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getCustomers, addCustomer, addOrder } from '../utils/mockDb';
import { customerService } from '../services/customerService';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';

export default function InputPesanan() {
  const allProducts = [
    { id: 1, brand: 'Kixx', name: '[DUMMY] Kixx G1 5W-30', variant: '5W-30', size: '4L', price: 400000, priceFormatted: 'Rp 400.000', stock: 120, headerColor: 'bg-[#EF4444]' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [cart, setCart] = useState([]);
  const [selectedBengkel, setSelectedBengkel] = useState('');
  
  // State for Bengkel List
  const [bengkels, setBengkels] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    // Load customers
    customerService.getAll()
      .then(res => {
        if (res && res.success === false) {
          console.warn("API pelanggan mengembalikan status gagal, menggunakan fallback pelanggan lokal:", res.message);
          const localCustomers = getCustomers();
          setCustomersList(localCustomers);
          setBengkels(localCustomers.map(c => c.name));
          return;
        }

        const data = Array.isArray(res) ? res : (res?.data || res?.customers || []);
        if (data.length === 0) {
          const localCustomers = getCustomers();
          setCustomersList(localCustomers);
          setBengkels(localCustomers.map(c => c.name));
          return;
        }

        setCustomersList(data);
        setBengkels(data.map(c => c.name || c.nama));
      })
      .catch(err => {
        console.error("Gagal load pelanggan dari API:", err);
        // Fallback to local
        const localCustomers = getCustomers();
        setCustomersList(localCustomers);
        setBengkels(localCustomers.map(c => c.name));
      });

    // Load products
    productService.getAll()
      .then(res => {
        if (res && res.success === false) {
          console.warn("API produk mengembalikan status gagal, menggunakan fallback produk lokal:", res.message);
          setProducts(allProducts);
          return;
        }

        const data = Array.isArray(res) ? res : (res?.data || res?.products || []);
        if (data.length === 0) {
          console.warn("Daftar produk API kosong, menggunakan fallback produk lokal");
          setProducts(allProducts);
          return;
        }

        // Map backend properties to UI properties
        const mapped = data.map(p => ({
          id: p.id,
          brand: p.brand || 'Petronas',
          name: p.nama || p.name,
          variant: p.sae || '',
          size: p.kemasan || '',
          price: Number(p.harga) || 0,
          priceFormatted: `Rp ${(Number(p.harga) || 0).toLocaleString('id-ID')}`,
          stock: Number(p.stokKarton) || 0,
          headerColor: p.brand === 'Kixx' ? 'bg-[#EF4444]' : 'bg-[#22C55E]',
          grade: p.grade || '',
          tipe_kendaraan: p.tipe_kendaraan || ''
        }));
        setProducts(mapped);
      })
      .catch(err => {
        console.error("Gagal load produk dari API, menggunakan fallback produk lokal:", err);
        setProducts(allProducts);
      });
  }, []);
  const [isAddBengkelOpen, setIsAddBengkelOpen] = useState(false);
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: '',
    address: '',
    phone: '',
    city: 'Banjarmasin'
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'tempo'
  const [tempoDays, setTempoDays] = useState('14');

  // Custom Alert State
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const showAlert = (type, title, message) => {
    setAlertModal({ isOpen: true, type, title, message });
  };
  
  const closeAlert = () => {
    setAlertModal({ ...alertModal, isOpen: false });
  };

  const handleAddBengkel = (e) => {
    e.preventDefault();
    if(newCustomerForm.name.trim()) {
      const payload = {
        nama: newCustomerForm.name,
        alamat: newCustomerForm.address || '-',
        telepon: newCustomerForm.phone || '-',
        piutang: 0,
        kota: newCustomerForm.city || 'Banjarmasin',
        status: 'Active'
      };

      customerService.create(payload)
        .then((res) => {
          const newCustomer = res?.data || res;
          const name = newCustomer.nama || newCustomer.name || newCustomerForm.name;
          setCustomersList(prev => [...prev, newCustomer]);
          setBengkels(prev => [...prev, name]);
          setSelectedBengkel(name);
          setNewCustomerForm({ name: '', address: '', phone: '', city: 'Banjarmasin' });
          setIsAddBengkelOpen(false);
          showAlert('success', 'Pelanggan Ditambahkan', `Bengkel ${name} berhasil ditambahkan ke database.`);
        })
        .catch(err => {
          console.error("Gagal menambahkan pelanggan ke API, memakai lokal:", err);
          const newCustomer = {
            id: `PLG-NEW-${Date.now()}`,
            name: newCustomerForm.name,
            address: newCustomerForm.address || '-',
            phone: newCustomerForm.phone || '-',
            outstanding: 0,
            lastOrder: '-',
            status: 'Active',
            city: newCustomerForm.city || 'Banjarmasin'
          };
          addCustomer(newCustomer);
          setCustomersList(prev => [...prev, newCustomer]);
          setBengkels([...bengkels, newCustomerForm.name]);
          setSelectedBengkel(newCustomerForm.name);
          setNewCustomerForm({ name: '', address: '', phone: '', city: 'Banjarmasin' });
          setIsAddBengkelOpen(false);
        });
    }
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchBrand = activeFilter === 'Semua' || p.brand === activeFilter;
      return matchSearch && matchBrand;
    });
  }, [products, searchTerm, activeFilter]);

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
      showAlert('error', 'Gagal', 'Silakan pilih bengkel terlebih dahulu!');
      return;
    }
    if (cart.length === 0) {
      showAlert('error', 'Gagal', 'Keranjang order masih kosong!');
      return;
    }
    
    let paymentInfo = paymentMethod === 'cash' ? 'Tunai' : `Tempo (${tempoDays} Hari)`;
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    const customerObj = customersList.find(c => (c.name || c.nama) === selectedBengkel);
    const customerAddress = customerObj ? (customerObj.address || customerObj.alamat) : '-';
    const customerId = customerObj ? customerObj.id : null;

    // Build payload for backend API
    const orderPayload = {
      pelanggan_id: customerId,
      sales_id: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
      metode_bayar: paymentMethod,
      total_netto: cartTotal,
      dataDetail: cart.map(item => ({
        produk_id: item.id,
        qty: item.qty,
        harga: item.price
      }))
    };

    orderService.create(orderPayload)
      .then(() => {
        showAlert('success', 'Pesanan Berhasil!', `Pesanan untuk ${selectedBengkel} senilai Rp ${cartTotal.toLocaleString('id-ID')} telah berhasil diproses.`);
        setCart([]);
        setSelectedBengkel('');
        setPaymentMethod('cash');
      })
      .catch(err => {
        console.error("Gagal mengirim pesanan ke API, menyimpan ke lokal:", err);
        // Fallback to local mockDb
        const newOrder = {
          customer: selectedBengkel,
          sales: 'Sales System',
          total: cartTotal,
          status: 'Draft',
          qty: totalQty,
          address: customerAddress,
          paymentMethod: paymentMethod,
          items: cart.map(item => ({
            id: item.id,
            name: item.name || item.nama,
            brand: item.brand,
            qty: item.qty,
            price: item.price
          }))
        };
        addOrder(newOrder);
        showAlert('success', 'Pesanan Disimpan Lokal!', `Gagal menghubungi API backend. Pesanan berhasil disimpan secara lokal untuk ${selectedBengkel} senilai Rp ${cartTotal.toLocaleString('id-ID')}.`);
        setCart([]);
        setSelectedBengkel('');
        setPaymentMethod('cash');
      });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 relative">
        
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Formulir Pesanan Cepat</h2>
          <p className="text-sm text-[#64748B] mt-1">Input pesanan cepat untuk bengkel</p>
        </div>

        {/* Alert Modal */}
        {alertModal.isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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

        {/* Form Select Bengkel */}
        <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          <label className="block text-xs font-bold text-[#1E293B] mb-2">
            Pilih Bengkel <span className="text-[#EF4444]">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              value={selectedBengkel}
              onChange={(e) => setSelectedBengkel(e.target.value)}
              className="flex-1 border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="">-- Pilih Bengkel --</option>
              {bengkels.map((bengkel, idx) => (
                <option key={idx} value={bengkel}>{bengkel}</option>
              ))}
            </select>
            <button 
              onClick={() => setIsAddBengkelOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F1F5F9] text-[#4F46E5] rounded-lg font-bold text-sm hover:bg-[#E2E8F0] border border-[#CBD5E1] transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Bengkel Baru
            </button>
          </div>
        </div>

        {/* Modal Tambah Bengkel */}
        {isAddBengkelOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0]">
                <h3 className="font-bold text-[#1E293B]">Tambah Bengkel Baru</h3>
                <button onClick={() => setIsAddBengkelOpen(false)} className="text-[#64748B] hover:text-[#1E293B]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddBengkel} className="p-5">
                <div className="mb-3">
                  <label className="block text-xs font-bold text-[#1E293B] mb-2">Nama Bengkel <span className="text-[#EF4444]">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={newCustomerForm.name}
                    onChange={(e) => setNewCustomerForm({...newCustomerForm, name: e.target.value})}
                    placeholder="Masukkan nama bengkel..."
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-bold text-[#1E293B] mb-2">Alamat Lengkap <span className="text-[#EF4444]">*</span></label>
                  <textarea 
                    required
                    rows="2"
                    value={newCustomerForm.address}
                    onChange={(e) => setNewCustomerForm({...newCustomerForm, address: e.target.value})}
                    placeholder="Contoh: Jl. Ahmad Yani Km 5..."
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-3 mb-5">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-[#1E293B] mb-2">No. Telepon <span className="text-[#EF4444]">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={newCustomerForm.phone}
                      onChange={(e) => setNewCustomerForm({...newCustomerForm, phone: e.target.value.replace(/\D/g, '')})}
                      placeholder="0812..."
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-[#1E293B] mb-2">Kota</label>
                    <select 
                      value={newCustomerForm.city}
                      onChange={(e) => setNewCustomerForm({...newCustomerForm, city: e.target.value})}
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                    >
                      <option value="Banjarmasin">Banjarmasin</option>
                      <option value="Banjarbaru">Banjarbaru</option>
                      <option value="Martapura">Martapura</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsAddBengkelOpen(false)}
                    className="px-4 py-2 bg-white border border-[#CBD5E1] text-[#64748B] rounded-lg font-bold text-sm hover:bg-[#F8FAFC]"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg font-bold text-sm hover:bg-[#4338CA]"
                  >
                    Simpan Bengkel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 items-start pb-10">
          
          {/* Left Column: Products */}
          <div className="flex-1 flex flex-col gap-4">
            
            {/* Search and Filters */}
            <div className="bg-white p-5 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] flex flex-col gap-4 sticky top-[80px] z-10">
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
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]">{p.variant}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]">{p.size}</span>
                        {p.grade && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]">{p.grade}</span>}
                        {p.tipe_kendaraan && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A]">{p.tipe_kendaraan}</span>}
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
          <div className="w-full lg:w-[360px] bg-white rounded-xl shadow-xl border border-[#E2E8F0] overflow-hidden sticky top-[80px] z-20">
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
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-col gap-4">
                
                {/* Metode Pembayaran */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#1E293B]">Metode Pembayaran</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setPaymentMethod('cash')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${
                        paymentMethod === 'cash' 
                          ? 'bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]' 
                          : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-gray-50'
                      }`}
                    >
                      Tunai
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('tempo')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${
                        paymentMethod === 'tempo' 
                          ? 'bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]' 
                          : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-gray-50'
                      }`}
                    >
                      Tempo
                    </button>
                  </div>
                  
                  {paymentMethod === 'tempo' && (
                    <div className="mt-2 flex items-center justify-between bg-white border border-[#E2E8F0] rounded-lg px-3 py-2">
                      <span className="text-xs font-semibold text-[#64748B]">Lama Tempo:</span>
                      <select 
                        value={tempoDays}
                        onChange={(e) => setTempoDays(e.target.value)}
                        className="text-xs font-bold text-[#1E293B] border-none bg-transparent focus:outline-none focus:ring-0"
                      >
                        <option value="14">14 Hari</option>
                        <option value="30">30 Hari</option>
                        <option value="45">45 Hari</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#E2E8F0]">
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
