import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Building2, MapPin, Phone, Mail, User, Package, X } from 'lucide-react';

export default function MasterSupplier() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'PT. PLI (Petronas Lubricants Indonesia)',
      color: 'bg-[#16A34A]', // Green
      textColor: 'text-[#16A34A]',
      bgColor: 'bg-[#DCFCE7]',
      borderColor: 'border-[#16A34A]',
      address: 'Jl. Jababeka Raya Blok C No. 10-11, Cikarang, Bekasi',
      phone: '021 89131000',
      email: 'info@pli.co.id',
      contactPerson: 'Bapak Hendro',
      totalPo: '145',
      lastPo: '28 Apr 2026'
    },
    {
      id: 2,
      name: 'PT. ABM (Asian Bitumen Manufacturing)',
      color: 'bg-[#DC2626]', // Red
      textColor: 'text-[#DC2626]',
      bgColor: 'bg-[#FEE2E2]',
      borderColor: 'border-[#DC2626]',
      address: 'Kawasan Industri MM2100, Cikarang Barat, Bekasi',
      phone: '021 89982100',
      email: 'sales@abm.co.id',
      contactPerson: 'Ibu Siti Nurjanah',
      totalPo: '132',
      lastPo: '27 Apr 2026'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    id: '', name: '', address: '', phone: '', email: '', contactPerson: '', totalPo: '', lastPo: '', color: '', textColor: '', bgColor: '', borderColor: ''
  });

  const handleOpenModal = (supplier) => {
    setEditingSupplier(supplier);
    setFormData(supplier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? formData : s));
    handleCloseModal();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-sans">
        
        {/* Header section */}
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Master Supplier</h1>
          <p className="text-sm text-[#64748B] mt-1">Data supplier PT. PLI (Petronas) dan PT. ABM (Kixx)</p>
        </div>

        {/* Supplier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suppliers.map(supplier => (
            <div key={supplier.id} className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
              
              {/* Header Card */}
              <div className={`${supplier.color} p-5 flex justify-between items-start`}>
                <h3 className="text-lg font-bold text-white max-w-[80%] leading-tight">{supplier.name}</h3>
                <Building2 className="text-white/80 w-6 h-6 shrink-0" />
              </div>
              
              {/* Fake logo pill */}
              <div className="px-5 -mt-4 mb-2">
                <div className="w-24 h-8 bg-white rounded-full shadow-sm"></div>
              </div>

              {/* Body Card */}
              <div className="p-5 flex-1 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#94A3B8] mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">Alamat</span>
                    <p className="text-sm text-[#475569]">{supplier.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#94A3B8] mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">Telepon</span>
                    <p className="text-sm text-[#475569]">{supplier.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#94A3B8] mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">Email</span>
                    <p className="text-sm text-[#475569]">{supplier.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-[#94A3B8] mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">Contact Person</span>
                    <p className="text-sm text-[#475569]">{supplier.contactPerson}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#94A3B8] block mb-1">Total PO</span>
                    <span className="text-lg font-bold text-[#1E293B]">{supplier.totalPo}</span>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#94A3B8] block mb-1">Last PO</span>
                    <span className="text-sm font-bold text-[#1E293B]">{supplier.lastPo}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto pt-4">
                  <button onClick={() => handleOpenModal(supplier)} className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                    Edit Supplier
                  </button>
                  <button className="flex-1 bg-white border border-[#E2E8F0] hover:bg-gray-50 text-[#334155] font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                    Riwayat PO
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Perbandingan Supplier Section */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
          <div className="p-5 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#1E293B]">Perbandingan Supplier</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  <th className="py-4 px-6">Kriteria</th>
                  <th className="py-4 px-6">PT. PLI (Petronas)</th>
                  <th className="py-4 px-6">PT. ABM (Kixx)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#E2E8F0]">
                  <td className="py-4 px-6 font-semibold text-[#334155]">Brand</td>
                  <td className="py-4 px-6 text-[#475569]">Petronas</td>
                  <td className="py-4 px-6 text-[#475569]">Kixx</td>
                </tr>
                <tr className="border-b border-[#E2E8F0]">
                  <td className="py-4 px-6 font-semibold text-[#334155]">Total Purchase Orders</td>
                  <td className="py-4 px-6 text-[#475569]">{suppliers[0]?.totalPo} PO</td>
                  <td className="py-4 px-6 text-[#475569]">{suppliers[1]?.totalPo} PO</td>
                </tr>
                <tr className="border-b border-[#E2E8F0]">
                  <td className="py-4 px-6 font-semibold text-[#334155]">Payment Terms</td>
                  <td className="py-4 px-6 text-[#475569]">NET 30</td>
                  <td className="py-4 px-6 text-[#475569]">NET 45</td>
                </tr>
                <tr className="border-b border-[#E2E8F0]">
                  <td className="py-4 px-6 font-semibold text-[#334155]">Lead Time</td>
                  <td className="py-4 px-6 text-[#475569]">3-5 hari</td>
                  <td className="py-4 px-6 text-[#475569]">5-7 hari</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#334155]">Status</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-[#DCFCE7] text-[#16A34A] text-xs font-bold rounded-full">Active</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-[#DCFCE7] text-[#16A34A] text-xs font-bold rounded-full">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Product Lines */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border-t border-[#E2E8F0]">
            
            {/* Petronas Lines */}
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center">
                  <Package className="text-white w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#065F46] text-lg">Petronas Product Lines</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#065F46]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  <span>Syntium Series (Fully Synthetic)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#065F46]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  <span>Urania Series (Diesel Engine Oil)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#065F46]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  <span>Sprinta Series (Motorcycle Oil)</span>
                </li>
              </ul>
            </div>

            {/* Kixx Lines */}
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EF4444] rounded-lg flex items-center justify-center">
                  <Package className="text-white w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#991B1B] text-lg">Kixx Product Lines</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#991B1B]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></div>
                  <span>Kixx G Series (Gasoline Engine)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#991B1B]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></div>
                  <span>Kixx HD Series (Heavy Duty)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#991B1B]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></div>
                  <span>Kixx PAO Series (Premium Synthetic)</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Edit Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className={`flex justify-between items-center p-5 ${formData.color}`}>
              <h2 className="text-lg font-bold text-white">
                Edit Data Supplier
              </h2>
              <button onClick={handleCloseModal} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Nama Supplier</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm bg-gray-50 text-[#64748B] cursor-not-allowed focus:outline-none" 
                  value={formData.name} readOnly disabled />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Alamat Lengkap</label>
                <textarea className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5] resize-none" rows="3"
                  value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Telepon</label>
                  <input type="text" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Contact Person</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-1 focus:ring-[#4F46E5]" 
                  value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} required />
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#E2E8F0]">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 text-sm font-semibold text-[#475569] hover:bg-gray-100 rounded-lg transition-colors">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition-colors">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
