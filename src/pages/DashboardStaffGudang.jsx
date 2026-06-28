import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { Truck, CheckCircle2, Package, ClipboardList, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getOrders } from '../utils/mockDb';
import { orderService } from '../services/orderService';

export default function DashboardStaffGudang() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [shippedCount, setShippedCount] = useState(0);

  useEffect(() => {
    orderService.getAll()
      .then(res => {
        const data = Array.isArray(res) ? res : (res?.data || res?.orders || []);
        const mapped = data.map(so => ({
          id: so.id,
          customer: so.pelanggan?.nama || so.pelanggan?.name || so.customer || '-',
          sales: so.user?.nama || so.user?.name || so.sales || 'Sales System',
          status: so.status || 'Draft',
          qty: Number(so.qty) || (so.dataDetail ? so.dataDetail.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0) : 0),
        }));
        setPendingOrders(mapped.filter(o => o.status === 'Approved'));
        setShippedCount(mapped.filter(o => o.status === 'Shipped' || o.status === 'Delivered').length);
      })
      .catch(err => {
        console.error("Gagal load orders dari API di staff gudang, load lokal:", err);
        const orders = getOrders();
        setPendingOrders(orders.filter(o => o.status === 'Approved'));
        setShippedCount(orders.filter(o => o.status === 'Shipped' || o.status === 'Delivered').length);
      });
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Title Section */}
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Dashboard Staff Gudang</h2>
          <p className="text-xs text-[#64748B] mt-1">Pencatatan fisik dan pengiriman barang</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Pending Pengiriman" 
            value={String(pendingOrders.length)} 
            icon={<Truck className="w-5 h-5" />} 
            bgClass="bg-[#F97316]"
          />
          <StatCard 
            title="Dikirim Hari Ini" 
            value={String(shippedCount)} 
            icon={<CheckCircle2 className="w-5 h-5" />} 
            bgClass="bg-[#22C55E]"
          />
          <StatCard 
            title="Stok Masuk Minggu Ini" 
            value="8" 
            icon={<Package className="w-5 h-5" />} 
            bgClass="bg-[#3B82F6]"
          />
          <StatCard 
            title="Surat Jalan Bulan Ini" 
            value="87" 
            icon={<ClipboardList className="w-5 h-5" />} 
            bgClass="bg-[#A855F7]"
          />
        </div>

        {/* Large Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Link to="/pengiriman-barang" className="bg-[#FF6600] text-white p-6 rounded-xl shadow-sm hover:bg-[#E65C00] transition-colors block flex flex-col justify-center min-h-[120px]">
             <Truck className="w-6 h-6 mb-3 opacity-90" />
             <h3 className="font-bold text-lg mb-1">Proses Pengiriman</h3>
             <p className="text-sm opacity-90">Input Surat Jalan & Packing List</p>
          </Link>
          <Link to="/input-stok-masuk" className="bg-[#2563EB] text-white p-6 rounded-xl shadow-sm hover:bg-[#1D4ED8] transition-colors block flex flex-col justify-center min-h-[120px]">
             <Package className="w-6 h-6 mb-3 opacity-90" />
             <h3 className="font-bold text-lg mb-1">Input Stok Masuk</h3>
             <p className="text-sm opacity-90">Catat barang dari supplier</p>
          </Link>
        </div>

        {/* Pending Deliveries Table */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden mt-2">
          <div className="p-5 border-b border-[#E2E8F0]">
            <h3 className="font-bold text-[#1E293B]">Pemenuhan Pesanan - Pengiriman Tertunda</h3>
            <p className="text-xs text-[#64748B] mt-1">Daftar pesanan yang menunggu untuk dikirim</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">INVOICE</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">BENGKEL</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">JUMLAH ITEM</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">SURAT JALAN</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">TGL ORDER</th>
                  <th className="py-4 px-6 border-b border-[#E2E8F0]">AKSI</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {pendingOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 px-6 text-center text-xs text-[#94A3B8]">
                      Tidak ada pesanan pending pengiriman.
                    </td>
                  </tr>
                ) : (
                  pendingOrders.map(o => (
                    <tr key={o.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 font-bold text-[#1E293B]">{o.id}</td>
                      <td className="py-4 px-6 text-[#475569]">{o.customer}</td>
                      <td className="py-4 px-6 text-[#1E293B]">{o.qty} Dus</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706]">
                          Belum
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[#64748B]">{o.date}</td>
                      <td className="py-4 px-6">
                        <Link 
                          to={`/pengiriman-barang?openModal=${o.id}`} 
                          className="bg-[#4F46E5] text-white text-xs font-semibold py-1.5 px-3 rounded-lg hover:bg-[#4338CA] transition-colors inline-block text-center"
                        >
                          Input SJ
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Checklist Section */}
        <div className="bg-[#F0F5FF] rounded-xl border border-[#DCE4F5] p-6 mt-2">
          <h3 className="font-bold text-[#1E293B] flex items-center gap-2 mb-4 text-sm">
            <ClipboardList className="w-5 h-5 text-[#4F46E5]" />
            Checklist Packing & Pengiriman
          </h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <CheckCircle className="w-5 h-5 text-[#4F46E5]" />
              <span className="text-sm text-[#475569]">Cek invoice dan detail pesanan</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <CheckCircle className="w-5 h-5 text-[#4F46E5]" />
              <span className="text-sm text-[#475569]">Siapkan barang sesuai quantity</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <CheckCircle className="w-5 h-5 text-[#4F46E5]" />
              <span className="text-sm text-[#475569]">Input nomor Surat Jalan</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <CheckCircle className="w-5 h-5 text-[#4F46E5]" />
              <span className="text-sm text-[#475569]">Packing dan loading ke kendaraan</span>
            </label>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
