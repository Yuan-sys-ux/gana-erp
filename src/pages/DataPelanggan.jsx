import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, Plus, MapPin, Phone, Building2, Edit, X, Trash2 } from 'lucide-react';
import { getCustomers, saveCustomers, addCustomer } from '../utils/mockDb';

export default function DataPelanggan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Semua Kota');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  
  const [customers, setCustomers] = useState([]);

  const loadCustomers = () => {
    setCustomers(getCustomers());
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    id: '', name: '', address: '', phone: '', outstanding: 0, lastOrder: '-', status: 'Active', city: 'Banjarmasin'
  });

  const filteredCustomers = customers.filter(customer => {
    const term = searchTerm.toLowerCase();
    const matchSearch = customer.name.toLowerCase().includes(term);
    const matchCity = selectedCity === 'Semua Kota' || customer.city === selectedCity;
    const matchStatus = selectedStatus === 'Semua Status' || customer.status === selectedStatus;
    return matchSearch && matchCity && matchStatus;
  });

  const handleOpenModal = (customer = null) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData(customer);
    } else {
      setEditingCustomer(null);
      setFormData({
        id: `PLG-00${customers.length + 1}`, name: '', address: '', phone: '', outstanding: 0, lastOrder: '-', status: 'Active', city: 'Banjarmasin'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      const updatedCustomers = customers.map(c => c.id === editingCustomer.id ? formData : c);
      saveCustomers(updatedCustomers);
      loadCustomers();
    } else {
      addCustomer(formData);
      loadCustomers();
    }
    handleCloseModal();
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    const updatedCustomers = customers.filter(c => c.id !== editingCustomer.id);
    saveCustomers(updatedCustomers);
    loadCustomers();
    setIsDeleteModalOpen(false);
    handleCloseModal();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header section */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Master Pelanggan</h1>
            <p className="text-sm text-[#64748B] mt-1">Kelola data bengkel mitra di Kalimantan Selatan</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Tambah Bengkel
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <input 
              type="text" 
              placeholder="Cari nama bengkel, alamat, kota..." 
              className="w-full pl-10 pr-4 py-2.5 border-none rounded-lg text-sm focus:outline-none focus:ring-0 text-[#334155] placeholder:text-[#94A3B8] bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-px h-8 bg-[#E2E8F0] mx-2"></div>

          <select 
            className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white min-w-[150px]"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="Semua Kota">Semua Kota</option>
            <option value="Banjarmasin">Banjarmasin</option>
            <option value="Banjarbaru">Banjarbaru</option>
            <option value="Martapura">Martapura</option>
          </select>

          <select 
            className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm text-[#334155] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] bg-white min-w-[150px] mr-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="Semua Status">Semua Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-2xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] border border-[#E2E8F0] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
              
              {/* Card Header (Purple) */}
              <div className="bg-[#7C3AED] p-5 pb-8 relative">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                       <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className={`px-3 py-1 text-white text-[10px] font-bold rounded-full uppercase tracking-wider ${customer.status === 'Active' ? 'bg-[#22C55E]' : 'bg-[#94A3B8]'}`}>
                       {customer.status}
                    </span>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-1">{customer.name}</h3>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col gap-4 bg-white relative -mt-4 rounded-t-2xl">
                 <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                       <MapPin className="w-4 h-4 text-[#94A3B8] mt-0.5 shrink-0" />
                       <p className="text-sm text-[#475569]">{customer.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                       <Phone className="w-4 h-4 text-[#94A3B8] shrink-0" />
                       <p className="text-sm text-[#475569]">{customer.phone}</p>
                    </div>
                 </div>

                 <div className="border-t border-dashed border-[#E2E8F0] my-2"></div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                       <span className="text-[11px] font-semibold text-[#94A3B8] uppercase">Outstanding</span>
                       <span className="text-sm font-bold text-[#DC2626]">Rp {Number(customer.outstanding).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[11px] font-semibold text-[#94A3B8] uppercase">Last Order</span>
                       <span className="text-sm font-medium text-[#1E293B]">{customer.lastOrder}</span>
                    </div>
                 </div>

                 <div className="mt-auto pt-4">
                    <button onClick={() => handleOpenModal(customer)} className="w-full py-2.5 flex items-center justify-center gap-2 border border-[#E0E7FF] text-[#4F46E5] hover:bg-[#EEF2FF] rounded-xl text-sm font-bold transition-colors">
                       <Edit className="w-4 h-4" />
                       Edit Detail
                    </button>
                 </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-[#E2E8F0]">
              <h2 className="text-lg font-bold text-[#1E293B]">
                {editingCustomer ? 'Edit Data Bengkel' : 'Tambah Bengkel Baru'}
              </h2>
              <button onClick={handleCloseModal} className="text-[#94A3B8] hover:text-[#334155] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Nama Bengkel</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Alamat</label>
                <textarea className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5] resize-none" rows="2"
                  value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Kota</label>
                  <select className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]"
                    value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required>
                    <option value="Banjarmasin">Banjarmasin</option>
                    <option value="Banjarbaru">Banjarbaru</option>
                    <option value="Martapura">Martapura</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Telepon</label>
                  <input type="text" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} required placeholder="Hanya angka" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Status</label>
                  <select className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]"
                    value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Outstanding</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-[#64748B] text-sm">Rp</span>
                    </div>
                    <input type="text" className="w-full pl-9 pr-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" 
                      value={formData.outstanding} onChange={e => setFormData({...formData, outstanding: e.target.value.replace(/\D/g, '')})} placeholder="0" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#E2E8F0]">
                {editingCustomer ? (
                  <button type="button" onClick={confirmDelete} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" /> Hapus
                  </button>
                ) : <div></div>}
                <div className="flex gap-3">
                  <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 text-sm font-semibold text-[#475569] hover:bg-gray-100 rounded-lg transition-colors">
                    Batal
                  </button>
                  <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition-colors">
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-[#DC2626]" />
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] mb-2">Hapus Pelanggan?</h3>
            <p className="text-sm text-[#64748B] mb-6">
              Apakah Anda yakin ingin menghapus pelanggan <span className="font-bold text-[#1E293B]">{editingCustomer?.name}</span>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] font-semibold rounded-xl transition-colors">
                Batal
              </button>
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-[#DC2626] text-white hover:bg-[#B91C1C] font-semibold rounded-xl transition-colors shadow-sm">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
