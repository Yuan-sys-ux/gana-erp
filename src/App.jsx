import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initDb } from './utils/mockDb';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DataProduk from './pages/DataProduk';
import DataPelanggan from './pages/DataPelanggan';
import MasterSupplier from './pages/MasterSupplier';
import UserManagement from './pages/UserManagement';
import DaftarPenjualan from './pages/DaftarPenjualan';
import ApprovalStokMasuk from './pages/ApprovalStokMasuk';
import RiwayatStok from './pages/RiwayatStok';
import PengirimanBarang from './pages/PengirimanBarang';
import InputStokMasuk from './pages/InputStokMasuk';
import AgingSchedule from './pages/AgingSchedule';
import LaporanPenjualan from './pages/LaporanPenjualan';
import MonitoringPiutang from './pages/MonitoringPiutang';
import InputPesanan from './pages/InputPesanan';
import LaporanKunjungan from './pages/LaporanKunjungan';
import TargetPenjualan from './pages/TargetPenjualan';
import PurchaseOrder from './pages/PurchaseOrder';

function App() {
  useEffect(() => {
    initDb();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-produk" element={<DataProduk />} />
        <Route path="/data-pelanggan" element={<DataPelanggan />} />
        <Route path="/master-supplier" element={<MasterSupplier />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/daftar-penjualan" element={<DaftarPenjualan />} />
        <Route path="/approval-stok" element={<ApprovalStokMasuk />} />
        <Route path="/riwayat-stok" element={<RiwayatStok />} />
        <Route path="/pengiriman-barang" element={<PengirimanBarang />} />
        <Route path="/input-stok-masuk" element={<InputStokMasuk />} />
        <Route path="/aging-schedule" element={<AgingSchedule />} />
        <Route path="/laporan-penjualan" element={<LaporanPenjualan />} />
        <Route path="/monitoring-piutang" element={<MonitoringPiutang />} />
        <Route path="/input-pesanan" element={<InputPesanan />} />
        <Route path="/laporan-kunjungan" element={<LaporanKunjungan />} />
        <Route path="/target-penjualan" element={<TargetPenjualan />} />
        <Route path="/purchase-order" element={<PurchaseOrder />} />
        {/* Default route redirects to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
